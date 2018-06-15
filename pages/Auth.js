import auth0 from 'auth0-js';
import AUTH_CONFIG from '../config/config';

export default class Auth {
  auth0 = new auth0.WebAuth(
    {
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: AUTH_CONFIG.redirectUri,
      audience: `https://${AUTH_CONFIG.domain}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid profile email'
    }
  );

  login() {
    this.auth0.authorize();
  }
}
