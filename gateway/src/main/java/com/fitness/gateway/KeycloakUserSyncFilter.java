package com.fitness.gateway;

import com.fitness.gateway.user.RegisterRequest;
import com.fitness.gateway.user.UserService;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
@Slf4j
@RequiredArgsConstructor
public class KeycloakUserSyncFilter implements WebFilter {
        private final UserService userService;
        @Override
        public Mono<Void> filter(ServerWebExchange webExchange, WebFilterChain webFilterChain)
        {
            String userId= webExchange.getRequest().getHeaders().getFirst("X-User-ID");
            String token= webExchange.getRequest().getHeaders().getFirst("Authorization");
            RegisterRequest registerRequest = getUserDetails(token);

            if(userId == null)
            {
                userId=registerRequest.getKeycloakId();
            }
            if(userId != null && token != null)
            {
                String finalUserId = userId;
                return userService.validateUser(userId)
                        .flatMap(exist -> {
                            if (!exist)
                            {
                                //Register user
                                if(registerRequest != null){
                                    return userService.registerUser(registerRequest)
                                            .then(Mono.empty());
                                }else{
                                    return  Mono.empty();
                                }


                            }
                            else{
                                log.info("Usr already exist, skipping sync");
                                return Mono.empty();
                            }
                        })
                        .then(Mono.defer(()->{
                            ServerHttpRequest mutatedRequest = webExchange.getRequest().mutate()
                                    .header("X-User-ID", finalUserId)
                                    .build();

                            return webFilterChain.filter(webExchange.mutate().request(mutatedRequest).build());
                        }));
            }
            return  webFilterChain.filter(webExchange);

        }

    private RegisterRequest getUserDetails(String token) {
            try {
                String tokenWithoutBearer= token.replace("Bearer ","").trim();
                SignedJWT signedJWT= SignedJWT.parse(tokenWithoutBearer);
                JWTClaimsSet claimsSet= signedJWT.getJWTClaimsSet();



                RegisterRequest registerRequest= new RegisterRequest();
                registerRequest.setEmail(claimsSet.getStringClaim("email"));
                registerRequest.setKeycloakId(claimsSet.getStringClaim("sub"));
                registerRequest.setPassword("dummy@1231234");
                registerRequest.setFirstName(claimsSet.getStringClaim("given_name"));
                registerRequest.setLastName(claimsSet.getStringClaim("family_name"));

                return registerRequest;

            }catch (Exception e)
            {
                e.printStackTrace();
                return  null;
            }
    }

}
