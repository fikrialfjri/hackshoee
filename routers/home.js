const Controller = require('../controllers/controllerAdmin')
const UserController = require('../controllers/controllerUser')
const router = require('express').Router()
const routerAdmin = require('./adminRouter')
const routerUser = require('./products/products-router')

router.get('/', (req, res) => res.render("./users/home"))

router.get('/register', UserController.getRegister)

router.post('/register', UserController.postRegister)

router.get('/login', UserController.getLogin)

router.post('/login', UserController.postLogin)

router.get('/logout', UserController.logout)

router.use('/admin', routerAdmin)

router.use('/products', routerUser)

module.exports = router