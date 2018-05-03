const next = require('next')
const express = require('express')
const { handle } = require('../dist/express')

const routes = require('./routes')

const server = express()
const app = next({ dev: true, dir: __dirname })

app.prepare().then(() => {
    server.get('*', handle(routes, app))
    server.listen(3000, () => {
        console.log('Running on http://localhost:3000')
    })
})
