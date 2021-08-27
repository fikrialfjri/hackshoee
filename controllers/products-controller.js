const { render } = require("ejs")
const { Product, User, UserProduct } = require("../models")
const { send } = require("../mvp/server")
const SendMail = require("../mvp/server")

class ProductsController {
    static listProducts(req, res) {
        let id = req.session.tag
        Product
            .findAll()
            .then(data => {
                console.log(req.session)
                data.forEach(el => {
                    el.price = Product.formatedPrice(el.price)
                })
                return res.render("./users/products/products.ejs", { data })

            })
            .catch(err => res.send(err))
    }

    static showProduct(req, res) {
        let id = req.params.id

        Product.findByPk(id)
            .then(data => {
                data.price = Product.formatedPrice(data.price)
                return res.render("./users/products/products-shop.ejs", { data })
            })
            .catch(err => res.send(err))
    }


    static buyProduct(req, res) {
        let input = {
            UserId: req.session.userId,
            ProductId: req.params.id
        }
        let id = req.params.id
        UserProduct.create(input)
            .then(data => {
                return Product.findByPk(id)
            })
            .then(data => {
                return data.update({ stock: data.stock - 1 })
            })
            .then(data => {
                res.redirect(`/products/shop/${id}`)
            })
            .catch(err => res.send(err))
    }

    static showCarts(req, res) {
        let id = req.session.userId
        User.findByPk(id, {
            include: [Product]
        })
            .then(data => {
                res.render('./users/products/carts', { data })
            })
            .catch(err => res.send(err))
    }

    static payAll(req, res) {
        SendMail.send()
        res.redirect("/products")
    }
}

module.exports = ProductsController