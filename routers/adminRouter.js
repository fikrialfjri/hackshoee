const Controller = require('../controllers/controllerAdmin')
const router = require('express').Router()
const { checkIsLoginAdmin } = require('../middleware/session')

router.get("/", Controller.loginAdmin)

router.post("/", Controller.postLoginAdmin)

router.get("/home", Controller.adminPage)

router.get('/products', checkIsLoginAdmin, Controller.productList)

router.get('/products/outofstock', checkIsLoginAdmin, Controller.emptyProductlist)

router.get('/products/outofstock/restock/:id', Controller.getRestockProduct)

router.post('/products/outofstock/restock/:id', Controller.postRestockProduct)

router.get('/products/delete/:id', Controller.deleteProducts)

router.get('/products/add', checkIsLoginAdmin, Controller.getAddProduct)

router.post('/products/add', Controller.postAddProduct)

module.exports = router