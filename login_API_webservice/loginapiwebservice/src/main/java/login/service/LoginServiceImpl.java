package login.service;

import org.springframework.transaction.annotation.Transactional;

import login.model.User;
import login.repository.UserRepository;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class LoginServiceImpl implements LoginService {

    @Autowired
    UserRepository uRepo;

    @Override
    public User validateUserLogin(String username, String password) {
        User validUser = uRepo.findAll()
                .stream()
                .filter(x -> x.getUsername().equals(username)
                        && BCrypt.checkpw(password, x.getPassword()))
                .findFirst()
                .orElse(null);
        return validUser;
    }

}
