package com.example.ecowear.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.*;

@RestController
@RequestMapping("/api/shipping")
@CrossOrigin(origins = "http://localhost:5173")
public class ShippingController {

    private static final String WAREHOUSE_ADDRESS = "15 Rue de la Gare, 76300 Sotteville-lès-Rouen";
    private static final String API_KEY = "5b3ce3597851110001cf624806de86246ed0494ba6eee3335e4b7130";

    private static final Map<String, Double[]> centers = Map.of(
        "5 Avenue du Mont Riboudet, 76000 Rouen", new Double[]{49.4432, 1.0999},
        "Boulevard Georges Pompidou, 14000 Caen", new Double[]{49.1829, -0.3707},
        "4 Rue des Cosmonautes, 31000 Toulouse", new Double[]{43.6047, 1.4442}
    );

    @PostMapping("/calculate")
    public ResponseEntity<?> calculateShipping(@RequestBody Map<String, Object> request) {
        try {
            String address = (String) request.get("address");
            double weight = (double) request.get("weight");
            String deliveryMethod = (String) request.get("deliveryMethod");

            if (deliveryMethod.equals("home")) {
                return handleHomeDelivery(address, weight);
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", "Méthode de livraison inconnue."));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Erreur interne du serveur: " + e.getMessage()));
        }
    }

    private ResponseEntity<?> handleHomeDelivery(String address, double weight) {
        double[] addressCoords = getCoordinates(address);
        if (addressCoords == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Impossible d'obtenir les coordonnées de l'adresse fournie."));
        }

        String nearestCenter = findNearestCenter(addressCoords);
        double distanceWarehouseToCenter = calculateDistance(getCoordinates(WAREHOUSE_ADDRESS), centers.get(nearestCenter));
        double distanceCenterToAddress = calculateDistance(centers.get(nearestCenter), addressCoords);
        double totalDistance = distanceWarehouseToCenter + distanceCenterToAddress;

        return ResponseEntity.ok(Map.of(
            "center", nearestCenter,
            "totalDistance", totalDistance,
            "mapCoords", centers.get(nearestCenter),
            "weight", weight
        ));
    }

    private String findNearestCenter(double[] addressCoords) {
        return centers.entrySet().stream()
            .min(Comparator.comparingDouble(entry -> calculateDistance(addressCoords, entry.getValue())))
            .map(Map.Entry::getKey)
            .orElse("5 Avenue du Mont Riboudet, 76000 Rouen"); // Valeur par défaut
    }

    private double calculateDistance(double[] fromCoords, double[] toCoords) {
        if (fromCoords == null || toCoords == null) {
            return 100.0; // Valeur par défaut en cas d'erreur
        }

        String url = String.format(
            "https://api.openrouteservice.org/v2/directions/driving-car?api_key=%s&start=%.6f,%.6f&end=%.6f,%.6f",
            API_KEY, fromCoords[1], fromCoords[0], toCoords[1], toCoords[0]
        );

        try {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            JSONObject json = new JSONObject(response.getBody());
            return json.getJSONArray("features").getJSONObject(0)
                    .getJSONObject("properties")
                    .getJSONArray("segments").getJSONObject(0)
                    .getDouble("distance") / 1000;
        } catch (Exception e) {
            return 100.0;
        }
    }

    private double[] getCoordinates(String address) {
    String url = "https://nominatim.openstreetmap.org/search?format=jsonv2&q=" + address.replace(" ", "+");

        try {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            
            // Log pour voir la réponse API
            System.out.println("Réponse de Nominatim : " + response.getBody());

            JSONArray jsonArray = new JSONArray(response.getBody());

            if (jsonArray.length() == 0) {
                System.out.println("❌ Aucun résultat trouvé pour l'adresse : " + address);
                return null;  // Pas de coordonnées trouvées
            }

            JSONObject firstResult = jsonArray.getJSONObject(0);
            
            // Vérification et conversion sécurisée des valeurs
            double lat = Double.parseDouble(firstResult.getString("lat"));
            double lon = Double.parseDouble(firstResult.getString("lon"));

            System.out.println("✅ Coordonnées trouvées : " + lat + ", " + lon);
            return new double[]{lat, lon};

        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la récupération des coordonnées : " + e.getMessage());
            return null;  // En cas d'erreur, renvoyer null
        }
    }
