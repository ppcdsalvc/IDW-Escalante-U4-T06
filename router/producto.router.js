const router = require('express').Router();

module.exports = (wagner) => {

    const productoCtrl = wagner.invoke((Producto) =>
        require('../controllers/producto.controller')(Producto));

    router.get('/:token', (req, res) =>
        productoCtrl.getAll(req, res));

        router.get('/:id/:token', (req, res) =>
        productoCtrl.getById(req, res));

        router.get('/login/:password/:email/:token', (req, res) =>
        productoCtrl.getCorreoPs(req, res));

        router.delete('/:id/:token', (req, res) =>
        productoCtrl.deleteById(req, res));

        router.post('/:token', (req, res) =>
        productoCtrl.createUser(req, res));

        router.put('/:id/:token', (req, res) =>
        productoCtrl.updateById(req, res));
        
    
    return router;
}