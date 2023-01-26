const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");
const { Session } = require("inspector");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: "Supper secret secret",
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false
    },
    resave: false,
    saveUninitialized: true,
    stare: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine("handlebars",hbs.engine);
app.set("view engin","handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));

app.use(routes);

app.listen(PORT,() => {
    console.log(`App listening on port ${PORT}!`);
    sequelize.sync({ force: false });
});