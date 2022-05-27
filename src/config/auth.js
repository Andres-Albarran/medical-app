const helpers = {};

function isAuthenticated (req, res, next) {
  if(req.user == null) {
    res.status(403)
    return res.redirect('/')
  }
  next()
}

function authRole (req, res, next) {
    if (req.user.admin) {
      next()
    }
    else{
    req.flash('error_msg', 'No autorizado.');
    res.status(403);
    res.redirect('/')
  }
}

module.exports = {isAuthenticated, authRole, }
