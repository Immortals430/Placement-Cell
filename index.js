import 'dotenv/config';
import express from 'express';
import expressLayout from 'express-ejs-layouts';
import session from 'express-session';
import connectMongoDB from "./config/mongoose.js"
import passport from './config/passport-local-strategy.js';
import routes from './routes/index.js';
import path from "path"
import MongoStore from 'connect-mongo'

const app = express();
const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.set('views', path.resolve('views')); // Specify the views directory
app.use(expressLayout);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('assets')));
app.use(session({
    name: 'Placement cell',
    secret: 'xyz',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 10000000
    },


    store: MongoStore.create({ 
        mongoUrl: process.env.DB || 'mongodb://127.0.0.1/placement_cell',
        autoRemove: 'interval',
        autoRemoveInterval: 60 * 24 // In minutes. Default
    })

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/', routes);


connectMongoDB()
app.listen(PORT, (err) => {
    console.log(err || `Connected to port: ${PORT}`);
});
