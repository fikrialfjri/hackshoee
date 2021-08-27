const express = require("express")
const router = express.Router()
const ProductsController = require("../../controllers/products-controller")
const { checkIsLoginUser, checkIsLoginAdmin } = require('../../middleware/session')

router.get("/", ProductsController.listProducts)

router.get("/shop/:id", checkIsLoginUser, ProductsController.showProduct)

router.get("/shop/:id/buy", ProductsController.buyProduct)

router.get("/carts", checkIsLoginUser, ProductsController.showCarts)

router.get("/pay-all", ProductsController.payAll)


module.exports = router