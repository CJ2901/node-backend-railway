const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Middlewares: Son funciones que añaden funcionalidades al web server
        // La palabra clave "use" es para indicar que es un middleware
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
        
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

