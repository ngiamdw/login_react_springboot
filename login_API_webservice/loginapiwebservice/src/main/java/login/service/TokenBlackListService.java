package login.service;

public interface TokenBlackListService {
    public void blacklistToken(String token);

    public boolean isTokenBlacklisted(String token);
}
