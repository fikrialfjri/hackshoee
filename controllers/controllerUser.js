const { User } = require('../models')
const { checkPass } = require('../helpers/bcryptjs')

class UserController {

    static getRegister(req, res) {
        console.log(req.query.errors);
        res.render('./users/register')
    }

    static postRegister(req, res) {
        let input = {
            email: req.body.email,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age: req.body.age,
            gender: req.body.gender,
            address: req.body.address
        }
        User.create(input)
            .then(data => res.redirect('/login'))
            .catch(err => res.redirect(`/register?errors=${err}`))
    }

    static getLogin(req, res) {
        res.render('./users/login')
    }

    static postLogin(req, res) {
        let { email, password } = req.body
        console.log(req.body)
        User.findOne({
            where: { email: email }
        })
            .then(data => {
                if (data) {
                    let checkPassword = checkPass(password, data.password)
                    if (checkPassword) {
                        req.session.IsLogin = true
                        req.session.userId = data.id
                        req.session.tag = data.tag
                        // req.session.name = data.fullName()
                        res.redirect('/')
                    } else {
                        res.send(`password salah`)
                    }
                } else {
                    res.send('email salah')
                }
            })
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }

}
module.exports = UserController