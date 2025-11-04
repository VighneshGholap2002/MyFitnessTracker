package com.fitness.aiservice.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class GeminiService {
    private final WebClient webClient;
    @Value("${gemini.api.url}")
    private String geminiApiURI;
    @Value("${gemini.api.key}")
    private String getGeminiApiKEY;


    public GeminiService(WebClient.Builder webClientbuilder) {
        this.webClient = webClientbuilder.build();
    }


    public String getAnswer(String  question)
    {
        Map<String ,Object> requestBody =Map.of(
                "contents", new Object[]
                        {
                        Map.of("parts",new Object[]{
                                Map.of("text",question)
                        })
                        }
        );
        String response= webClient.post()
                .uri(geminiApiURI+getGeminiApiKEY)
                .header("Content-Type","application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        return response;
    }
}
