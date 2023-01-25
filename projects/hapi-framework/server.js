const Hapi = require('@hapi/hapi')
const {
    routes
} = require('./routes/index')

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*']
            }
        }
    })
    server.route(routes)
    await server.start()
    console.log(`Server running on PORT : ${server.info.uri}`)
}
init()