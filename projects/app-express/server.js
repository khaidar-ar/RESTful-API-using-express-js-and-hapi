const server = require('express')()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const knex = require('./db/knex')
const adminRoutes = require('./routes/adminRoutes')
const vehicleRoutes = require('./routes/vehiclesRoutes')
const memberRoutes = require('./routes/memberRoutes')
const ownerRoutes = require('./routes/ownerRoutes')
const PORT = 5000



server.listen(PORT, () => {
    knex.raw(`select 1=1 as test`)
        .then(result => {
            console.log('DB CONNECTION: ', result.rows[0].test)
        })
        .catch(err => {
            console.log('ERROR DB:', err)
        });
    console.log("Server started listening on PORT : " + PORT);
})
server.use(bodyParser.json())
server.use(morgan('tiny'))
server.use(bodyParser.urlencoded({
    limit: '50MB',
    extended: true
}))
server.use('/', adminRoutes)
server.use('/', vehicleRoutes)
server.use('/', memberRoutes)
server.use('/', ownerRoutes)


const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
server.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))