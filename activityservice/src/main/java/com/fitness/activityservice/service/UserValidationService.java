package com.fitness.activityservice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserValidationService {
        private final WebClient userServiceWebClient;

  public boolean validateUser(String userId)
  {
      log.info("Calling user Validation for user id: {}",userId);

      try {
          return userServiceWebClient.get()
                  .uri("api/users/{userId}/validate",userId)
                  .retrieve()
                  .bodyToMono(Boolean.class).block();
      }
      catch (WebClientResponseException e)
      {
        if(e.getStatusCode()== HttpStatus.NOT_FOUND)
            throw new RuntimeException("User Not Found" +userId);

          else if(e.getStatusCode()== HttpStatus.BAD_REQUEST)
              throw new RuntimeException("Invalid Request" +userId);
      }

      return false;
  }

}
