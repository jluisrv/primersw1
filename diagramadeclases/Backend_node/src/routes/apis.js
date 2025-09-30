const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/user/:tokenU', async (req, res) => {
    const { tokenU } = req.params;
    const users = await pool.query('SELECT * FROM users WHERE tokenU = ?', [tokenU]);
    if (users.length <= 0) {
        return res.status(404).json({ status: 'Not Found' });
    }
    const user = users[0];
    const respuesta = {
        name: user.username,
        email: user.correo,
        token: user.tokenU
    }
    res.json(respuesta);
});

router.put('/guardar-diagrama/:tokenS', async (req, res) => {
    const { tokenS } = req.params;
    const { content } = req.body;
    const salas = await pool.query('SELECT * FROM salas WHERE tokenS = ?', [tokenS]);
    if (salas.length <= 0) {
        return res.json({ status: 'Token Not Valid' });
    }
    const salaId = salas[0].id;
    await pool.query('UPDATE salas SET xml = ? WHERE id= ?', [content, salaId], (err, rows, filds) => {
        if (!err) {
            res.json({ status: 'Project Updated Successfully' });
        } else {
            res.json({ status: 'ERROR! Could not Update Project' });
        }
    });
});


router.get('/cargar-salas/:tokenS', async (req, res) => {
    const { tokenS } = req.params;
    const salas = await pool.query('SELECT * FROM salas WHERE tokenS= ?', [tokenS]);
    if (salas.length <= 0) {
        return res.status(404).json({ status: 'Token Not Valid' });
    }
    const sala = salas[0];
    const resultado = {
        id: sala.id,
        nombre: sala.title,
        descripcion: sala.description,
        user_id: sala.user_id,
        content: sala.xml,
        codigo: sala.tokenS
    }
    res.json(resultado);
});



module.exports = router;