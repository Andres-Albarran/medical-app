const indexCtrl = {}

module.exports = indexCtrl;

indexCtrl.principal = async(req, res) => {
    const { user: { name, image, admin, id } = {} } = req;
    res.render('index', { name, image, admin, id })
}

indexCtrl.enciclopedia = async(req, res) => {
    const { user: { name, image, admin, id } = {} } = req;
    res.render('documents', { name, image, admin, id })
}

indexCtrl.renderLogin = async(req, res) => {
    if (req.user) {
        res.redirect("/")
      }
      const { user: { name, image, admin, id } = {} } = req;
      res.render('login', { name, image, admin, id })
}