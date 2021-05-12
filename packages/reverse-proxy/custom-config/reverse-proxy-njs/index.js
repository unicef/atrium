function validateCookieJwt(r) {
  try {
    if (r.uri === '/remix/') {
      var cookie = r.headersIn.Cookie.split(';');
      var SESSION_TOKEN = cookie.find((element) =>
        element.includes('SESSION_TOKEN')
      );
      SESSION_TOKEN = SESSION_TOKEN.split('=')[1];
      global.JWTverify(SESSION_TOKEN, process.env.SECRET_OR_KEY);
    }
    return 'true';
  } catch (error) {
    r.error('[error]: ' + error);
    return 'false';
  }
}
