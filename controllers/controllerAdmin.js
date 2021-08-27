const { Product, User } = require('../models')
const { Op } = require('sequelize')
const { checkPass } = require('../helpers/bcryptjs')

class Controller {
    static loginAdmin(req, res) {
        res.render("./admin/admin-login")
    }

    static postLoginAdmin(req, res) {
        let { email, password } = req.body
        console.log(req.body)
        User.findOne({
            where: { email: email }
        })
            .then(data => {
                if (data) {
                    let checkPassword = checkPass(password, data.password)
                    if (email === "admin@hacktiv8.com" && checkPassword) {
                        req.session.IsLogin = true
                        req.session.userId = data.id
                        req.session.tag = data.tag
                        req.session.name = data.fullName()
                        res.redirect('/admin/home')
                    } else if (email !== "admin@hacktiv8.com") {
                        res.send(`Email is wrong. You can't to access this page!`)
                    }
                } else {
                    res.send(`Email is wrong. You can't to access this page!`)
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static adminPage(req, res) {
        res.render("./admin/admin-home")
    }

    static productList(req, res) {
        Product.findAll({
            where: {
                stock: {
                    [Op.gt]: 0
                }
            }
        })
            .then(data => {
                data.forEach(el => {
                    el.price = Product.formatedPrice(el.price)
                });
                res.render('./admin/admin-products', { data })
            })
            .catch(err => res.send(err))
    }

    static emptyProductlist(req, res) {
        Product.findAll({
            where: {
                stock: {
                    [Op.eq]: 0
                }
            }
        })
            .then(data => {
                data.forEach(el => {
                    el.price = Product.formatedPrice(el.price)
                });
                res.render('outofstock', { data })
            })
            .catch(err => res.send(err))
    }

    static getAddProduct(req, res) {
        res.render('./admin/admin-add-product')
    }

    static postAddProduct(req, res) {
        let input = {
            img: req.body.img,
            name: req.body.name,
            size: req.body.size,
            type: req.body.type,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(input)
            .then(data => res.redirect('/admin/products'))
            .catch(err => res.send(err))
    }

    static getRestockProduct(req, res) {
        let id = req.params.id
        Product.findByPk(id)
            .then(data => {
                console.log(data.stock)
                res.render('restock', { data })
            })
            .catch(err => res.send(err))
    }

    static postRestockProduct(req, res) {
        let id = req.params.id
        Product.findByPk(id)
            .then(data => {
                return data.update({ stock: req.body.stock })
            })
            .then(data => res.redirect('/admin/products'))
    }

    static deleteProducts(req, res) {
        let id = req.params.id
        Product.destroy({
            where: { id }
        })
            .then(data => res.redirect('/admin/products/outofstock'))
            .catch(err => {
                // console.log(err);
                res.send(err)
            })
    }

}

module.exports = Controller