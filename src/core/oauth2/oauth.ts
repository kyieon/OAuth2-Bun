const OAuth2Server = require("oauth2-server");
const options = require("./oauth-options");
const model = require("./oauth-model");

const server = new OAuth2Server({
    model: model,
    accessTokenLifetime: options.accessTokenLifetime,
    refreshTokenLifetime: options.refreshTokenLifetime,
    allowEmptyState: true,
    allowExtendedTokenAttributes: false,
    allowBearerTokensInQueryString: true,
});

export default server;
