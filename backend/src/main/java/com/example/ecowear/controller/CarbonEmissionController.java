package com.example.ecowear.controller;

import com.example.ecowear.service.CarbonEmissionService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/emissions")
@CrossOrigin(origins = {"*", "http://localhost:5173"})
public class CarbonEmissionController {

    private final CarbonEmissionService carbonEmissionService;

    public CarbonEmissionController(CarbonEmissionService carbonEmissionService) {
        this.carbonEmissionService = carbonEmissionService;
    }

    @PostMapping("/calculate")
public ResponseEntity<?> calculateEmissions(@RequestBody Map<String, String> request) {
    try {
        String sellerAddress = request.get("sellerAddress");
        String clientAddress = request.get("clientAddress");
        double packageWeight = Double.parseDouble(request.get("packageWeight"));

        if (sellerAddress == null || clientAddress == null || packageWeight <= 0) {
            return ResponseEntity.badRequest().body("Invalid input data");
        }

        Map<String, Object> result = carbonEmissionService.calculateCarbonFootprint(sellerAddress, clientAddress, packageWeight);
        return ResponseEntity.ok(result);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error calculating emissions: " + e.getMessage());
    }
}
}

