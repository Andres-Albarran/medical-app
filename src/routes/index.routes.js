const { Router } = require('express');
const router = Router();
const {principal, enciclopedia, renderLogin} = require("../controllers/index.controller")

router.get('/', principal);
router.get('/enciclopedia', enciclopedia);
router.get('/login', renderLogin);

module.exports = router;