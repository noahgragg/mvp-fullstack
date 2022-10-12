module.exports = {
    production:{
        connectionString: process.send.POSTGRES_CONNECTION_STRING +"?ssl=true",
        port: process.env.PORT
    },
    dev: {
        connectionString: 'postgres:postgrespw@localhost:55002/icecrown',
        port: 8000
    }
}
