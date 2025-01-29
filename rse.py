from geopy.distance import geodesic
from geopy.geocoders import Nominatim

EMISSION_FACTORS = {
    "airplane": 1.9,
    "diesel_truck": 0.35,
    "hybrid_truck": 0.308,
    "diesel_car": 0.25,
    "electric_truck": 0.144,
    "electric_car": 0.1,
    "water_transport": 0.096,
    "diesel_train": 0.031,
    "container_ship": 0.00554,
    "electric_cargo_bike": 0.0
}

distribution_addresses = {
    "warehouse": "15 Rue de la Gare, 76300 Sotteville-lès-Rouen",
    "local_center": "5 Avenue du Mont Riboudet, 76000 Rouen",
    "regional_center": "Boulevard Georges Pompidou, 14000 Caen",
    "national_center": "4 Rue des Cosmonautes, 31000 Toulouse",
}

def calculate_carbon_emission(transport_mode, package_weight, distance):
    """
    Calculate the carbon emission for transporting a package.
    
    Parameters:
        transport_mode (str): The mode of transport (e.g., "electric_truck").
        package_weight (float): The weight of the package in kg.
        distance (float): The distance traveled in km.

    Returns:
        float: Carbon emissions in grams.
    """
    if transport_mode not in EMISSION_FACTORS:
        raise ValueError(f"Unknown transport mode: {transport_mode}")
    return EMISSION_FACTORS[transport_mode] * package_weight * distance

def calculate_distance(address1, address2):
    """
    Calculate the distance between two addresses using geopy.

    Parameters:
        address1 (str): The starting address.
        address2 (str): The destination address.

    Returns:
        float: Distance in kilometers.
    """
    geolocator = Nominatim(user_agent="geo_calculator", timeout=10)
    location1 = geolocator.geocode(address1)
    location2 = geolocator.geocode(address2)

    if not location1 or not location2:
        raise ValueError(f"Could not locate one of the addresses: {address1}, {address2}")

    coords1 = (location1.latitude, location1.longitude)
    coords2 = (location2.latitude, location2.longitude)

    return geodesic(coords1, coords2).kilometers

def find_nearest_distribution_center(client_address, centers):
    """
    Find the nearest distribution center to a client address.

    Parameters:
        client_address (str): The client's address.
        centers (dict): A dictionary of distribution centers and their addresses.

    Returns:
        tuple: The name and distance of the nearest center.
    """
    nearest_center = None
    shortest_distance = float("inf")

    for center_name, center_address in centers.items():
        try:
            distance = calculate_distance(client_address, center_address)
            if distance < shortest_distance:
                shortest_distance = distance
                nearest_center = center_name
        except ValueError as e:
            print(f"Error calculating distance for {center_name}: {e}")

    return nearest_center, shortest_distance

def get_seller_to_center_mode(distance):
    """
    Determine transport mode for seller to distribution center based on distance.

    Parameters:
        distance (float): Distance in kilometers.

    Returns:
        str: Suggested transport mode.
    """
    if distance > 5000:
        return "container_ship"
    elif distance > 2000:
        return "airplane"
    elif distance > 300:
        return "diesel_train"
    else:
        return "diesel_truck"

def get_center_to_client_mode(distance):
    """
    Determine transport mode for distribution center to client based on distance.

    Parameters:
        distance (float): Distance in kilometers.

    Returns:
        str: Suggested transport mode.
    """
    if distance <= 5:
        return "electric_cargo_bike"
    elif distance <= 300:
        return "electric_truck"
    else:
        return "diesel_truck"

def suggest_multi_modal_transport_plans(seller_address, client_address, package_weight):
    """
    Suggest multi-modal transport plans sorted by carbon emissions.

    Parameters:
        seller_address (str): The address of the seller.
        client_address (str): The address of the client.
        package_weight (float): Weight of the package in kilograms.

    Returns:
        list: A list of transport plans sorted by emissions (from lowest to highest).
    """
    nearest_center, distance_to_center = find_nearest_distribution_center(client_address, distribution_addresses)
    distance_to_seller = calculate_distance(seller_address, distribution_addresses[nearest_center])

    seller_to_center_mode = get_seller_to_center_mode(distance_to_seller)
    center_to_client_mode = get_center_to_client_mode(distance_to_center)

    seller_to_center_emissions = calculate_carbon_emission(seller_to_center_mode, package_weight, distance_to_seller)
    center_to_client_emissions = calculate_carbon_emission(center_to_client_mode, package_weight, distance_to_center)

    total_emissions = seller_to_center_emissions + center_to_client_emissions
    transport_plan = {
        "plan": [seller_to_center_mode, center_to_client_mode],
        "emissions": total_emissions
    }

    return [transport_plan]


