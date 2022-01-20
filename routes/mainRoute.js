const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();

router.get('/', mainController.getHomePage);
router.get('/register', mainController.getRegisterPage);
router.post('/register', mainController.postRegisterUser);
router.get('/login', mainController.getLoginPage);
router.post('/login', mainController.postLoginUser);
router.get('/logs', mainController.getLogsPage);
router.get('/logout', mainController.getLogoutUser);

module.exports = router;