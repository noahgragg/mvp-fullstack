module.exports = {
    production:{
        connectionString: process.send.POSTGRES_CONNECTION_STRING +"?ssl=true",
        port: process.env.PORT
    }
}