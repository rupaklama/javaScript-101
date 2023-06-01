module.exports = {
  requireAuth(req, res, next) {
    if (!req.session.userId) {
      res.redirect('/users/signin');
    }

    next();
  },
};
