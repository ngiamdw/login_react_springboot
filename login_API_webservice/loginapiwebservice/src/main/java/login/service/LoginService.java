package login.service;

import login.model.User;

public interface LoginService {
    User validateUserLogin(String username, String password);
}