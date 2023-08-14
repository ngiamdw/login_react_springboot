package login.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import login.model.User;
import login.service.LoginService;
import login.service.TokenBlackListService;
import login.util.JwtUtil;

@RestController
public class loginController {

    @Autowired
    LoginService loginService;

    @Autowired
    TokenBlackListService tokenBlackListService;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    HttpSession session;

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody User user) {
        try {
            User validatedUser = loginService.validateUserLogin(user.getUsername(), user.getPassword());
            if (validatedUser != null) {
                String token = jwtUtil.generateToken(validatedUser);
                System.out.println("Login endpoint hit , token : " + token);
                Map<String, String> map = new HashMap<>();
                map.put("token", token);
                map.put("name", validatedUser.getName());
                map.put("username", validatedUser.getUsername());
                map.put("userId", String.valueOf(validatedUser.getUserId()));
                map.put("role", validatedUser.getRole());

                return new ResponseEntity<>(map, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/managerpage")
    public ResponseEntity<Void> validateManagerPg(@RequestHeader("Authorization") String token) {
        try {
            token = token.replace("Bearer ", "");

            // no token or invalid token return 401 (user not authenticated)
            if (token.isEmpty() || token == null || !jwtUtil.validateToken(token)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            // blacklisted token return 403 (user is authenticated due valid token)
            if (tokenBlackListService.isTokenBlacklisted(token)) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/logout")
    public ResponseEntity<Void> logoutUser(@RequestHeader("Authorization") String token) {
        try {
            // remove "Bearer" prefix,
            token = token.replace("Bearer ", "");

            // no token or invalid token return 401 (user not authenticated)
            if (token.isEmpty() || token == null || !jwtUtil.validateToken(token)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            // blacklisted token return 403 (user is authenticated due valid token)
            if (tokenBlackListService.isTokenBlacklisted(token)) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
            tokenBlackListService.blacklistToken(token);
            System.out.println("Logout endpoint hit" + token);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
