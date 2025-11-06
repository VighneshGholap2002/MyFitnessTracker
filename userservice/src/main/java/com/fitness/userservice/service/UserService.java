package com.fitness.userservice.service;

import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;
import com.fitness.userservice.model.User;
import com.fitness.userservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserService {
@Autowired
private UserRepository userRepository;
    public UserResponse getUserProfile(String userId) {
        User user= userRepository.findById(userId).orElseThrow(()->
                new RuntimeException("User Not Found"));

        UserResponse userResponse=new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setEmail(user.getEmail());
        userResponse.setPassword(user.getPassword());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());

        return  userResponse;
    }

    public UserResponse register(RegisterRequest registerRequest) {

        if(userRepository.existsByEmail(registerRequest.getEmail()))
        {
            User existingUser=userRepository.findByEmail(registerRequest.getEmail());

            UserResponse userResponse=new UserResponse();
            userResponse.setId(existingUser.getId());
            userResponse.setKeycloakId(existingUser.getKeycloakId());
            userResponse.setEmail(existingUser.getEmail());
            userResponse.setPassword(existingUser.getPassword());
            userResponse.setFirstName(existingUser.getFirstName());
            userResponse.setLastName(existingUser.getLastName());
            userResponse.setCreatedAt(existingUser.getCreatedAt());
            userResponse.setUpdatedAt(existingUser.getUpdatedAt());

            return userResponse;

        }
        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(registerRequest.getPassword());
        user.setKeycloakId(registerRequest.getKeycloakId());
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());

        User saveUser=userRepository.save(user);

        UserResponse userResponse=new UserResponse();
        userResponse.setId(saveUser.getId());
        userResponse.setKeycloakId(saveUser.getKeycloakId());
        userResponse.setEmail(saveUser.getEmail());
        userResponse.setPassword(saveUser.getPassword());
        userResponse.setFirstName(saveUser.getFirstName());
        userResponse.setLastName(saveUser.getLastName());
        userResponse.setCreatedAt(saveUser.getCreatedAt());
        userResponse.setUpdatedAt(saveUser.getUpdatedAt());

        return  userResponse;

    }

    public Boolean existByUserId(String userId) {
        log.info("Calling user Validation for user id: {}",userId);
        return userRepository.existsByKeycloakId(userId);
    }
}
