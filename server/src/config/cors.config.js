const whitelist = ['http://localhost:3000']; // domains that are whitelisted, like frontend server or production hosting service

module.exports = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === 'development' || whitelist.indexOf(origin) !== -1) {
      callback(null, true); // if ok go on
    } else {
      callback(new Error('Not allowed by CORS')); // else throw an error
    }
  }
}
