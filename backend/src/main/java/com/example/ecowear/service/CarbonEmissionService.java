package com.example.ecowear.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

@Service
public class CarbonEmissionService {

    private static final Map<String, Double> EMISSION_FACTORS = new HashMap<>();
    private static final Map<String, String> DISTRIBUTION_ADDRESSES = new HashMap<>();

    static {
        EMISSION_FACTORS.put("airplane", 1.9);
        EMISSION_FACTORS.put("diesel_truck", 0.35);
        EMISSION_FACTORS.put("hybrid_truck", 0.308);
        EMISSION_FACTORS.put("diesel_car", 0.25);
        EMISSION_FACTORS.put("electric_truck", 0.144);
        EMISSION_FACTORS.put("electric_car", 0.1);
        EMISSION_FACTORS.put("water_transport", 0.096);
        EMISSION_FACTORS.put("diesel_train", 0.031);
        EMISSION_FACTORS.put("container_ship", 0.00554);
        EMISSION_FACTORS.put("electric_cargo_bike", 0.0);

        DISTRIBUTION_ADDRESSES.put("warehouse", "15 Rue de la Gare, 76300 Sotteville-lès-Rouen");
        DISTRIBUTION_ADDRESSES.put("local_center", "5 Avenue du Mont Riboudet, 76000 Rouen");
        DISTRIBUTION_ADDRESSES.put("regional_center", "Boulevard Georges Pompidou, 14000 Caen");
        DISTRIBUTION_ADDRESSES.put("national_center", "4 Rue des Cosmonautes, 31000 Toulouse");
    }

    private double calculateCarbonEmission(String transportMode, double packageWeight, double distance) {
        if (!EMISSION_FACTORS.containsKey(transportMode)) {
            throw new IllegalArgumentException("Unknown transport mode: " + transportMode);
        }
        return EMISSION_FACTORS.get(transportMode) * packageWeight * distance;
    } 

    private double calculateDistance(String address1, String address2) {
        String url = "https://nominatim.openstreetmap.org/search?format=json&q=";
        RestTemplate restTemplate = new RestTemplate();

        double[] coords1 = getCoordinates(restTemplate, url + address1.replace(" ", "+"));
        double[] coords2 = getCoordinates(restTemplate, url + address2.replace(" ", "+"));

        if (coords1 == null || coords2 == null) {
            throw new IllegalArgumentException("Could not geocode one of the addresses.");
        }

        return haversineDistance(coords1[0], coords1[1], coords2[0], coords2[1]);
    }

    private double[] getCoordinates(RestTemplate restTemplate, String url) {
        try {
            Map[] response = restTemplate.getForObject(url, Map[].class);
            if (response != null && response.length > 0) {
                double lat = Double.parseDouble(response[0].get("lat").toString());
                double lon = Double.parseDouble(response[0].get("lon").toString());
                return new double[]{lat, lon};
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to geocode address: " + url, e);
        }
        throw new IllegalArgumentException("Could not geocode address: " + url);
    }

    private double haversineDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                   Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                   Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    public Map<String, Object> calculateCarbonFootprint(String sellerAddress, String clientAddress, double packageWeight) {
        String nearestCenter = null;
        double shortestDistance = Double.MAX_VALUE;

        for (Map.Entry<String, String> entry : DISTRIBUTION_ADDRESSES.entrySet()) {
            double distance = calculateDistance(clientAddress, entry.getValue());
            if (distance < shortestDistance) {
                shortestDistance = distance;
                nearestCenter = entry.getKey();
            }
        }

        double sellerToCenterDistance = calculateDistance(sellerAddress, DISTRIBUTION_ADDRESSES.get(nearestCenter));
        String sellerToCenterMode = getSellerToCenterMode(sellerToCenterDistance);
        String centerToClientMode = getCenterToClientMode(shortestDistance);

        double sellerToCenterEmissions = calculateCarbonEmission(sellerToCenterMode, packageWeight, sellerToCenterDistance);
        double centerToClientEmissions = calculateCarbonEmission(centerToClientMode, packageWeight, shortestDistance);

        Map<String, Object> response = new HashMap<>();
        response.put("transportPlan", new String[]{sellerToCenterMode, centerToClientMode});
        response.put("totalEmissions", sellerToCenterEmissions + centerToClientEmissions);
        return response;
    }

    private String getSellerToCenterMode(double distance) {
        if (distance > 5000) return "container_ship";
        if (distance > 2000) return "airplane";
        if (distance > 300) return "diesel_train";
        return "diesel_truck";
    }

    private String getCenterToClientMode(double distance) {
        if (distance <= 5) return "electric_cargo_bike";
        if (distance <= 300) return "electric_truck";
        return "diesel_truck";
    }
}
