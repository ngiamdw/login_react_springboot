package login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import login.model.User;
import login.service.LoginService;

@RestController
public class loginController {

    @Autowired
    LoginService loginService;

    @Autowired
    HttpSession session;

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        try {
            User validatedUser = loginService.validateUserLogin(user.getUsername(), user.getPassword());
            if (validatedUser != null) {
                session.setAttribute(String.valueOf(validatedUser.getUserId()), validatedUser);
                // System.out.println("User added to session with ID: " +
                // validatedUser.getUserId());
                // System.out.println("Session ID: " + session.getId());
                return new ResponseEntity<>(validatedUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/logout")
    public ResponseEntity<Void> logoutUser(@RequestParam String userId) {
        try {
            // System.out.println(userId);
            // System.out.println("Session ID: " + session.getId());
            User userSession = (User) session.getAttribute(userId);
            // System.out.println(userSession);
            if (userSession != null) {
                if (userSession.getUserId() == Integer.parseInt(userId)) {
                    // System.out.println("Removed session for userId : " + userSession.getUserId());
                    session.invalidate();
                    return new ResponseEntity<>(HttpStatus.OK);
                }
            }
            // System.out.println("Either no session or wrong id ");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
