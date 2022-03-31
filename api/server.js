require('dotenv').config()

// Dependancies
const Enforcer = require('openapi-enforcer')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const express = require('express')
const { Pool } = require('pg')
const path = require('path')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const ConnectPgSimple = require('connect-pg-simple')(session)

// Local Files
const Accounts = require('./controllers/account')
const Tools = require('./controllers/tool')
const FinalPage = require('./controllers/finalpage')
const Authentication = require('./controllers/authentication')
const DatabaseAccounts = require('./database/account')


// set up database connection
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: +process.env.POSTGRES_PORT
})


// test that we can connect to the database
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  else {
    console.log('Database connected')
  }
})


// set up passport local strategy
passport.use(new LocalStrategy((username, password, done) => {
  DatabaseAccounts.getAccountByUsername(pool, username)
    .then(async account => {
      // if no account with the username was found then authentication failed
      if (account === undefined) {
        done(null, false)
      } else {
        // compare encrypted password
        const match = await bcrypt.compare(password, account.password)
        if (match) {
          // passwords matched, so create the user object
          done(null, { id: account.userid, username: account.username, name: account.email })
        } else {
          const hash = await bcrypt.hash(password, 10)
          const m2 = await bcrypt.compare(password, hash)

          // passwords did not match
          done(null, false)
        }
      }
    })
    .catch(e => done(e, null))
}))


passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user))
})


passport.deserializeUser((id, done) => {
  done(null, JSON.parse(id))
})


const app = express()


// Any paths defined in your openapi.yml will validate and parse the request
// before it calls your route code.
const openapiPath = path.resolve(__dirname, '../openapi.yml')
const enforcerPromise = Enforcer(openapiPath, { hideWarnings: true })
const enforcerMiddleware = EnforcerMiddleware(enforcerPromise)


app.use(express.json())


app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path, req.headers, req.body)
  next()
})


app.use(enforcerMiddleware.init({ baseUrl: '/api' }))


// Catch errors
enforcerMiddleware.on('error', err => {
  console.error(err)
  process.exit(1)
})


app.use(session({
	store: new ConnectPgSimple({
		pool
	}),
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 2592000000 // 2592000000 30 days, written in milliseconds
	}
}))


app.use(passport.initialize())
app.use(passport.session())


app.use((req, res, next) => {
	const { operation } = req.enforcer
	if (operation.security !== undefined) {
		const sessionIsRequired = operation.security.find(obj => obj.cookieAuth !== undefined)
		if (sessionIsRequired && !req.user) {
			res.sendStatus(401)
			return
		}
	}
	next()
})


app.use(enforcerMiddleware.route({
  accounts: Accounts(pool),
  authentication: Authentication(passport),
  tools: Tools(pool),
  finalPage: FinalPage(pool)
}))


// add fallback mocking middleware here
app.use(enforcerMiddleware.mock())


module.exports = app