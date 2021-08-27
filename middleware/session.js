function checkIsLoginUser(req, res, next) {
    if (req.session.IsLogin) {
        next()
    } else {
        res.redirect('/login')
    }
}

function checkIsLoginAdmin(req, res, next) {
    console.log(req.session.tag);
    if (req.session.tag == 'admin') {
        next()
    } else {
        res.send(`you can't access this page`)
    }
}
module.exports = { checkIsLoginUser, checkIsLoginAdmin }