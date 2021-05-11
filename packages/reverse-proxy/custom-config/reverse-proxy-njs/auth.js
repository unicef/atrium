var { verify } = require('jsonwebtoken');
function validateCookieJwt(r) {
  r.error('🚀 ~ file: auth.js ~ line 6 ~ verify ~ r.uri=' + r.uri);
  if (r.uri === '/') {
    r.error('🚀 ~ file: auth.js ~ line 6 ~ verify ~ Entrou IF!!!!');
    var cookie = r.headersIn.Cookie.split(';');
    r.error('🚀 ~ file: auth.js ~ line 6 ~ verify ~ cookie= ' + String(cookie));
    var SESSION_TOKEN = cookie.find((element) =>
      element.includes('SESSION_TOKEN')
    );
    SESSION_TOKEN = SESSION_TOKEN.split('=')[1];
    r.error(
      '🚀 ~ file: auth.js ~ line 6 ~ verify ~ SESSION_TOKEN= ' + SESSION_TOKEN
    );
    var test = verify(SESSION_TOKEN, process.env.SECRET_OR_KEY);
    r.error(
      '🚀 ~ file: auth.js ~ line 6 ~ verify ~ SECRET_OR_KEY= ' +
        process.env.SECRET_OR_KEY
    );
    r.error('🚀 ~ file: auth.js ~ line 6 ~ verify ~ test= ' + test);
  }
  // r.return(200, 'Hello world!');
  return 'http://remix-service';
}
