// 
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// require and set express
const express = require('express')
const session = require('express-session')
const app = express()

// Controllers
const sessionsController = require('./controllers/session_controller')
const usersController = require('./controllers/users_controller')
const quizController = require('./controllers/quiz_controller')


// Middlewares:
const errorHandler = require("./middlewares/error_handler")

// Sets Cookie and encrypts
const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    cookie: {}
}


if (process.env.NODE_ENV === 'production') {
    sessionConfig.cookie.secure = true;
    app.set('trust proxy', 1);
}

// Logger for Terminal
const logger = require("./middlewares/logger.js")
app.use(logger)

// App settings
app.use(express.json())
app.use(express.static("client"))
app.use(session(sessionConfig));

// Initial routes and controllers
app.get("/flashcards", (req, res) => res.render("flashcards"))
app.use('/api/users', usersController)
app.use('/api/sessions', sessionsController)
app.use('/api/quiz', quizController)

// For heroku deployment
const port = process.env.PORT || 3001;

// TESTING - not needed once deployed
app.listen(port, () => {
    console.log(`*** Listening on port ${port} ***`)
})

// Error Handler
app.use(errorHandler)