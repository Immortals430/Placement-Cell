const User = require('../../../models/userModel')
const bcrypt = require('bcrypt')


// signup page
module.exports.signinPage = (req, res) => {
    if(req.isAuthenticated()) res.redirect('/api/v1/dashboard') 
    else res.render('signinPage', { url: req.originalUrl}) 
}

// signin page
module.exports.signupPage = (req, res) => {
    if(req.isAuthenticated()) res.redirect('/api/v1/dashboard') 
    else res.render('signupPage', { url: req.originalUrl})
}

// signup
module.exports.createAccount = async (req, res) => {
    const { username, email, password} = req.body
    let hashedPass = await bcrypt.hash(password, 10)
    try{
        await User.create({
            username,
            email,
            password: hashedPass
        })
        res.redirect('/')
    }
    catch(err) { console.log(err) }
}

// signin
module.exports.createSession = (req, res) => {
    res.redirect('/api/v1/dashboard')
}

// logout
module.exports.logout = (req, res) => {
    req.logout(() => res.redirect('/api/v1/user/signin'))
}
