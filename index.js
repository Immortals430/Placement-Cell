require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./config/mongoose')
const PORT = process.env.PORT || 3000
const expressLayout = require('express-ejs-layouts')
const passport = require('./config/passport-local-strategy')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)


app.set('view engine', 'ejs')
app.set('views')
app.use(expressLayout)
app.use(express.urlencoded({ extended: true }))
app.use(express.static('assets'))
app.use(session({
    name: 'Placement cell',
    secret: 'xyz',
    saveUninitialized: false,  // will not save uninitialized session (will not save if authorization fail)
    resave: false,             // will not resave session if already log in 
    cookie: {
      maxAge: (10000000)
  },
  store: new MongoStore(
      {
          mongooseConnection: db,
          autoRemove: 'disabled'
      
      }, (err)=>{
          console.log(err ||  'connect-mongodb setup ok');
      }
  )
}))
  
  
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)
app.use('/',  require('./routes'))


app.listen(PORT, (err) => {
    console.log(err || `connected to port : ${PORT}`)
  
})