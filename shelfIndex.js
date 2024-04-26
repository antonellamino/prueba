const express = require('express');
const bodyParser = require('body-parser');
const { Usuario, Sucursal } = require('./shelfModels');
const bookshelf = require('./bookshelf')

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hola desde el back2");
})


// Endpoint para registrar un nuevo usuario
app.post('/registro', async (req, res) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { nombre, apellido, correo, fecha_nacimiento, sucursal_preferencia } = req.body;

        // Crear un nuevo usuario utilizando el modelo Usuario
        const nuevoUsuario = await Usuario.forge({
            nombre,
            apellido,
            correo,
            fecha_nacimiento,
            sucursal_preferencia
        });

        // guardar el nuevo usuario en la base de datos
        await nuevoUsuario.save();

        // Devolver una respuesta de éxito
        res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
        // respuesta si hay error
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'No se pudo registrar el usuario' });
    }
});




//AGREGAR SUCURSAL
app.post('/agregarSucursal', async (req, res) => {
    try {
        // extraer los datos del cuerpo de la solicitud
        const { nombre, direccion, telefono } = req.body;

        const nuevaSucursal = await Sucursal.forge({
            nombre,
            direccion,
            telefono
        })
        // guardar la sucursal en la bd
        await nuevaSucursal.save();

        // Devolver una respuesta de éxito
        res.status(201).json({ mensaje: 'Sucursal creada exitosamente', sucursal: nuevaSucursal });
    } catch (error) {
        // respuesta si hay error
        console.error('Error al registrar sucursal:', error);
        res.status(500).json({ error: 'No se pudo registrar la sucursal' });
    }
});



//OBTENER SUCURSALES
app.get('/sucursales', async (req, res) => {
    try {
        const sucursales = await Sucursal.fetchAll();
        res.json({ sucursales });
    } catch (error) {
        console.error('error al obtener las sucursales:', error);
        res.status(500).json({ error: 'ocurrio un error al obtener las sucursales' });
    }
});


//OBTENER USUARIOS
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.fetchAll();
        res.json({ usuarios });
    } catch (error) {
        console.error('error al obtener los usuarios:', error);
        res.status(500).json({ error: 'ocurrio un error al obtener las sucursales' });
    }
});


//OBTENER PRODUCTOS
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.fetchAll();
        res.json({ usuarios });
    } catch (error) {
        console.error('error al obtener los usuarios:', error);
        res.status(500).json({ error: 'ocurrio un error al obtener las sucursales' });
    }
});


// inicio el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
