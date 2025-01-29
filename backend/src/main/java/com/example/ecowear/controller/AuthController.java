package com.example.ecowear.controller;

import com.example.ecowear.model.User;
import com.example.ecowear.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            // Return a JSON object instead of raw text
            return ResponseEntity
                .badRequest()
                .body(Collections.singletonMap("error", "Email already in use!"));
        }

        userRepository.save(user);

        // Return a JSON object instead of raw text
        return ResponseEntity.ok(Collections.singletonMap("message", "User registered successfully!"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElse(null);

        if (user == null || !user.getPassword().equals(loginRequest.getPassword())) {
            // Return a JSON object to indicate error
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Invalid email or password."));
        }

        // Return a JSON object to indicate success
        return ResponseEntity.ok(Collections.singletonMap("message", "Login successful"));
    }
}
