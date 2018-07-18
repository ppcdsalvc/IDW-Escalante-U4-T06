const router = require('express').Router();

module.exports = (wagner) => {

    const clienteCtrl = wagner.invoke((Cliente) =>
        require('../controllers/cliente.controller')(Cliente));

    router.get('/:token', (req, res) =>
        clienteCtrl.getAll(req, res));

        router.get('/:id/:token', (req, res) =>
        clienteCtrl.getById(req, res));

        router.get('/login/:password/:email/:token', (req, res) =>
        clienteCtrl.getCorreoPs(req, res));

        router.delete('/:id/:token', (req, res) =>
        clienteCtrl.deleteById(req, res));

        router.post('/:token', (req, res) =>
        clienteCtrl.createUser(req, res));

        router.put('/:id/:token', (req, res) =>
        clienteCtrl.updateById(req, res));
        
    
    return router;
}