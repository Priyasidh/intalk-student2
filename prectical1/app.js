const express = require('express')

const http = require('http');
const { Server } = require("socket.io");

const app = express()
app.use(express.json());
require("./config/db/mySqlConfig.js")

const cors = require('cors');
app.use(cors({
  origin: "http://localhost:3000", 
  methods: ["GET", "POST", "PUT", "DELETE"],  
  allowedHeaders: ["Content-Type", "Authorization"],  
  credentials: true
}));



const server = http.createServer(app);

const io =  new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend domain
    methods: ["GET", "POST","DELETE","PUT"], 
    allowedHeaders: ["Content-Type"],
    credentials: true
  }
});

global.io = io;

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const controllersStud = require("./controllers/userController.js") 

const controllersLogin = require("./controllers/loginController.js")

// const controllersRefreshToken=require("./controllers/userRefreshToken.js")

const bodyParser = require("body-parser")

const port = require('dotenv')

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const registerModel = require("./models/registerModel.js")
const userModel = require("./models/userModel.js")
const markModel = require("./models/markModel.js")
const userTokenModel = require("./models/userTokenModel.js")

// i18 language
const i18Next = require("i18next");
const Backend = require("i18next-fs-backend")
const middleware = require("i18next-http-middleware")

// auth 2.0
const passport = require('passport')
const session = require('express-session')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// config port
port.config({})



i18Next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    preload: ["en", "fr", "es"], // Load supported languages
    backend: {
      loadPath: "./config/locales/{{lng}}/translation.json",
    },
  });

app.use(middleware.handle(i18Next));


// Access json data


app.use('/', controllersStud)

app.use('/', controllersLogin)


//  app.use('/',controllersRefreshToken)

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(session({
  secret: 'keyboard',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session())

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Login with google</a>')
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ["profile", "email"] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/profile');
  });

app.get('/profile', (req, res) => {
  res.send('welcome')
})

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/')
})


  
registerModel.sync()


userModel.sync()

markModel.sync()


userTokenModel.sync()




io.on("connection", (socket) => {
  console.log("User connected with socket ID:", socket.id);

  socket.on("message", (msg) => {
      console.log("Message received:", msg);
  });

  socket.on("newStudentAdded", (student) => {
      console.log("New student added:", student);
      io.emit("newStudentAdded", student);
  });


  socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
  });
});


const PORTS = process.env.PORT || 8000

module.exports = {app,server,io};

server.listen(PORTS, (req, res) => {
  console.log("Server is Running")
})

