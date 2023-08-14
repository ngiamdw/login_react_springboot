package login.util;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.*;
import com.nimbusds.jwt.*;

import login.model.User;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    public String generateToken(User userDetails) throws JOSEException {
        JWSSigner signer = new MACSigner(SECRET_KEY);
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(userDetails.getUsername())
                .expirationTime(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours token validity
                .build();

        SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);
        signedJWT.sign(signer);

        return signedJWT.serialize();
    }

    public boolean validateToken(String token) throws JOSEException, ParseException {
        SignedJWT signedJWT = SignedJWT.parse(token);
        JWSVerifier verifier = new MACVerifier(SECRET_KEY);
        // Check if the token is verified and not expired
        return signedJWT.verify(verifier) && new Date().before(signedJWT.getJWTClaimsSet().getExpirationTime());
    }

    public String extractUsername(String token) throws ParseException {
        SignedJWT signedJWT = SignedJWT.parse(token);
        return signedJWT.getJWTClaimsSet().getSubject();
    }
}
