package login;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

import login.model.User;
import login.repository.UserRepository;

import org.mindrot.jbcrypt.BCrypt;

//exclude spring security
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRun(UserRepository uRepo) {
        return args -> {
            User user1 = new User();
            user1.setName("John");
            user1.setUsername("j123");
            user1.setPassword(hashPassword("S9445972A"));
            user1.setRole("manager");

            User user2 = new User();
            user2.setName("May");
            user2.setUsername("m123");
            user2.setPassword(hashPassword("S9159972"));
            user2.setRole("user");

            uRepo.saveAndFlush(user1);
            uRepo.saveAndFlush(user2);
        };
    }

    private String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }
}