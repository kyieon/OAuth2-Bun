module.exports = {
    secretKey: Bun.env.JWT_TOKEN_KEY,
    accessTokenLifetime: 60 * 60 * 1, // 1 hour
    refreshTokenLifetime: 60 * 60 * 24 * 7, // 7 day
};
