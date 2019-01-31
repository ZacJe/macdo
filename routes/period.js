const express = require('express');
const router = express.Router();
const Period = require("../schemas").Period;
const Sandwichs = require("../schemas").Sandwichs;

router.get('/', async(req,res) => {
    try {
        const periods = await Period.find({},'id');
        res.status(200).send(periods)
    } catch (e) {
        res.send(e)
    }
});

router.post('/', async(req,res) => {
    try {
        let period = new Period()
        period.id = req.body.id
        await period.save()
        res.status(201).send("period saved")
    } catch (e) {
        res.send(e)
    }
});

router.put('/:id', async(req,res) => {
    try {
        for (let i=0; i<req.body.sandwichs.length; i++) {
            const sandwich = await Sandwichs.findOne({"id" : req.body.sandwichs[i]})
            if(sandwich == null) {
                res.send("some sandwich does not exist")
            }
        }
        await Period.findOneAndUpdate({"id" : req.params.id.replace(/([A-Z])/g, ' $1').trim()}, req.body);
        res.status(200).send("period updated")
    } catch (e) {
        res.send(e)
    }
});

module.exports = router;