const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send({ error: 'Email already exists.' });
        }
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;