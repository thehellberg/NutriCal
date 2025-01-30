import compression from 'compression'
import dotenv from 'dotenv'
import express from 'express'
import bearerToken from 'express-bearer-token'
import { router } from 'express-file-routing'
import { rateLimit } from 'express-rate-limit'
import morgan from 'morgan'

dotenv.config()
const app = express()


app.use(compression())
// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by')

process.env.NODE_ENV = 'production'

app.use(morgan('tiny'))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)
app.use(bearerToken())
app.use(express.json())

const routing = async () => {
  app.use('/', await router())
}
routing()

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})
