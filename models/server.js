const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares: Son funciones que añaden funcionalidades al web server
        // La palabra clave "use" es para indicar que es un middleware
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
        
    }

    async conectarDB() {
        await dbConnection();
    }
    
    middlewares() {
        
        // CORS: Sirve para que el servidor pueda recibir peticiones de cualquier lugar
        this.app.use( cors() );

        // Lectura y parseo del body, necesario para que el servidor pueda recibir peticiones POST
        this.app.use( express.json() );


        // Directorio público
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.usersPath, require('../routes/user') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto: http://localhost:${this.port}`)
        });
    }
    
}

module.exports=Server;

