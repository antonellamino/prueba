const bookshelf = require('./shelfConnection');

// Defining models
const Usuario = bookshelf.model('Usuario', {
    tableName: 'usuarios'
})

const Producto = bookshelf.model('Producto', {
    tableName: 'productos'
})

const Empleado = bookshelf.model('Empleado', {
    tableName: 'empleados'
})

const Roles = bookshelf.model('Roles', {
    tableName: 'roles'
})

const Sucursal = bookshelf.model('Sucursal', {
    tableName: 'sucursales'
})

module.exports = {
    Usuario,
    Empleado,
    Producto,
    Roles,
    Sucursal
}