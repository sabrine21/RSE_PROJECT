from flask import Flask, request, jsonify
from geopy.distance import geodesic
from geopy.geocoders import Nominatim

app = Flask(__name__)

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

# Centres de distribution (choix possible pour le dernier km)
distribution_addresses = {
    "warehouse": "15 Rue de la Gare, 76300 Sotteville-lès-Rouen",
    "local_center": "5 Avenue du Mont Riboudet, 76000 Rouen",
    "regional_center": "Boulevard Georges Pompidou, 14000 Caen",
    "national_center": "4 Rue des Cosmonautes, 31000 Toulouse",
}

def calculate_carbon_emission(transport_mode, package_weight, distance):
    """
    Calcule les émissions carbone (en grammes) pour un colis:
      - mode de transport: transport_mode (ex. "diesel_truck")
      - poids: package_weight (kg)
      - distance: distance (km)
    """
    if transport_mode not in EMISSION_FACTORS:
        raise ValueError(f"Mode de transport inconnu: {transport_mode}")
    return EMISSION_FACTORS[transport_mode] * package_weight * distance

def calculate_distance(address1, address2):
    """
    Calcule la distance (en km) entre deux adresses textuelles (address1, address2),
    grâce à Nominatim (OpenStreetMap) + geopy.
    """
    geolocator = Nominatim(user_agent="CarboneEmissionService", timeout=10)
    location1 = geolocator.geocode(address1)
    location2 = geolocator.geocode(address2)

    if not location1 or not location2:
        raise ValueError(f"Impossible de géocoder: {address1} ou {address2}")

    coords1 = (location1.latitude, location1.longitude)
    coords2 = (location2.latitude, location2.longitude)
    return geodesic(coords1, coords2).kilometers

def find_nearest_distribution_center(client_address, centers):
    """
    Trouve le centre de distribution le plus proche de l'adresse client
    par rapport à la liste 'centers' (un dict nom -> adresse).
    Retourne (nom_du_centre, distance_en_km).
    """
    nearest_center = None
    shortest_distance = float("inf")

    for center_name, center_address in centers.items():
        try:
            dist = calculate_distance(client_address, center_address)
            if dist < shortest_distance:
                shortest_distance = dist
                nearest_center = center_name
        except ValueError as e:
            print(f"Erreur géocodage pour {center_name}: {e}")

    return nearest_center, shortest_distance

def get_seller_to_center_mode(distance):
    """
    Détermine le mode de transport vendeur->centre selon la distance.
    (Ici, vendeurs lointains => container_ship ou airplane, etc.)
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
    Détermine le mode de transport centre->client selon la distance.
    (Ici, de 0 à 5 km => "electric_cargo_bike", etc.)
    """
    if distance <= 5:
        return "electric_cargo_bike"
    elif distance <= 300:
        return "electric_truck"
    else:
        return "diesel_truck"

def suggest_multi_modal_transport_plans(seller_address, client_address, package_weight):
    """
    Fait un itinéraire en deux segments:
      1) seller_address -> centre de distribution (le plus proche du client)
      2) centre -> client_address

    Retourne un tableau contenant un seul objet:
      [
        {
          "plan": [ "diesel_truck", "electric_truck" ],
          "emissions": 1234.56
        }
      ]
    """
    # 1) Trouver le centre le plus proche du client
    nearest_center, distance_center_client = find_nearest_distribution_center(
        client_address,
        distribution_addresses
    )

    if not nearest_center:
        raise ValueError("Aucun centre de distribution valide trouvé pour l'adresse du client.")

    # 2) Calculer la distance vendeur->centre
    distance_seller_center = calculate_distance(seller_address, distribution_addresses[nearest_center])

    # 3) Déterminer les modes de transport
    mode_seller_center = get_seller_to_center_mode(distance_seller_center)
    mode_center_client = get_center_to_client_mode(distance_center_client)

    # 4) Calculer les émissions sur les 2 segments
    emissions_seller_center = calculate_carbon_emission(mode_seller_center, package_weight, distance_seller_center)
    emissions_center_client = calculate_carbon_emission(mode_center_client, package_weight, distance_center_client)
    total_emissions = emissions_seller_center + emissions_center_client

    transport_plan = {
        "plan": [mode_seller_center, mode_center_client],
        "emissions": total_emissions
    }
    return [transport_plan]

@app.route("/compute_co2", methods=["POST"])
def compute_co2():
    """
    Endpoint Flask:
    Reçoit un JSON du front/back, par exemple:
      {
        "clientAddress": "4 Rue des Cosmonautes, 31000 Toulouse",
        "packageWeight": 2.5
      }
    (Le vendeur est désormais FIXE = "warehouse")

    Retourne un JSON:
      [
        {
          "plan": [ "diesel_truck", "electric_truck" ],
          "emissions": 1234.56
        }
      ]
    """
    try:
        data = request.get_json()
        client_address = data.get("clientAddress")
        package_weight = data.get("packageWeight", 1.0)

        if not client_address:
            return jsonify({"error": "clientAddress est requis"}), 400

        # Adresse du vendeur FIXE = warehouse
        seller_address = "15 Rue de la Gare, 76300 Sotteville-lès-Rouen"

        result = suggest_multi_modal_transport_plans(seller_address, client_address, package_weight)
        return jsonify(result), 200

    except ValueError as e:
        # En cas d'erreur (géocodage, etc.)
        return jsonify({"error": str(e)}), 400
    except Exception as ex:
        return jsonify({"error": f"Erreur interne: {ex}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
