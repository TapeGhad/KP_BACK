module.exports = (jwt, wrap, errors) =>
  wrap(async (req, res, next) => {
    if (req._parsedUrl.pathname.indexOf("auth") !== -1) {
      next();
    } else if (req.header("Authorization")) {
      let auth = req.header("Authorization").split(" ")[1];
      jwt.verify(auth, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          res.status(errors.forbidden.status).send(errors.forbidden);
        } else {
          req.info = decoded;
          next();
        }
      });
    } else {
      res.status(errors.unauthorized.status).send(errors.unauthorized);
    }
  });
