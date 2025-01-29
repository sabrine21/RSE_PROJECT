package com.example.ecowear.controller;

import com.example.ecowear.dto.ShippingRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/shipping")
public class ShippingController {

    @PostMapping("/compute")
    public ResponseEntity<?> computeShippingCo2(@RequestBody ShippingRequest request) {
        // 1) Préparer l’appel au microservice Python
        String pythonMicroserviceUrl = "http://localhost:5000/compute_co2";

        // 2) Appeler le microservice via RestTemplate (ou WebClient)
        RestTemplate restTemplate = new RestTemplate();

        // On peut envoyer un Map<String, Object> ou directement request
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("sellerAddress", request.getSellerAddress());
        requestBody.put("clientAddress", request.getClientAddress());
        requestBody.put("packageWeight", request.getPackageWeight());

        // 3) Récupérer la réponse JSON
        Map<?, ?> co2Response = restTemplate.postForObject(
            pythonMicroserviceUrl,
            requestBody,
            Map.class
        );

        // 4) Retourner cette réponse à notre front
        return ResponseEntity.ok(co2Response);
    }
}
