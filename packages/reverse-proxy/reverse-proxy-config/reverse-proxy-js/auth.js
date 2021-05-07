const jwt = require('jsonwebtoken');

const verify = (r) => {
  console.log('🚀 ~ file: auth.js ~ line 6 ~ verify ~ r', r);
  r.return(200, 'Hello world!');
};

export default { verify };
