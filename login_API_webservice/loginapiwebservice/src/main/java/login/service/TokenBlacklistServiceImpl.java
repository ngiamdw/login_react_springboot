package login.service;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class TokenBlacklistServiceImpl implements TokenBlackListService {

    private final Set<String> blacklistedTokens = new HashSet<>();

    public void blacklistToken(String token) {
        blacklistedTokens.add(token);
    }

    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }
}
