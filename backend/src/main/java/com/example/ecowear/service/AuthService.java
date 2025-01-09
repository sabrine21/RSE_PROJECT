package com.example.ecowear.service;

import com.example.ecowear.model.User;
import com.example.ecowear.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public boolean isEmailTaken(String email) {
        return userRepository.existsByEmail(email);
    }

    public User registerUser(User user) {
        // TODO: Hash the password before saving (BCrypt)
        return userRepository.save(user);
    }

    public User authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);

        if (user != null && user.getPassword().equals(password)) {
            return user;
        }

        return null; // Invalid credentials
    }
}
