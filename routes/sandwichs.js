const express = require('express');
const router = express.Router();
const Sandwichs = require("../schemas").Sandwichs;
const Period = require("../schemas").Period;

function toMaj(p) {
    let tab = p.split(" ");
    for (let m in tab) {
        tab[m] = tab[m].substr(0, 1).toUpperCase()+tab[m].substr(1, tab[m].length);
    }
    p = tab.join(" ");
    return p;
}

router.get('/', async(req,res) => {
    try {
        const period = await Period.findOne({ id : req.query.id }, 'sandwichs');
        let sandwichsList = [];
        for (let i=0; i<period.sandwichs.length; i++) {
            sandwichsList.push(await Sandwichs.find({ id : period.sandwichs[i] }));
        }
        res.status(200).send(sandwichsList)
    } catch (e) {
        res.send(e)
    }
});

router.post('/', async(req,res) => {
    try {
        let idMaj = toMaj(req.body.id)
        if(req.body.period === "All") {
            const periods = await Period.find();
            for(let i=0; i<periods.length; i++) {
                let sandwichIn = false
                for(let j=0; j<periods[i].sandwichs.length; j++) {
                    if(periods[i].sandwichs[j] === idMaj) {
                        sandwichIn = true
                    }
                }
                if(!sandwichIn) {
                    await Period.findOneAndUpdate({ "id" : periods[i].id }, {$addToSet: {sandwichs: idMaj}})
                }
            }
        }
        else {
            let sandwichIn = false
            const period = await Period.findOne({"id" : req.body.period})
            for(let j=0; j<period.sandwichs.length; j++) {
                if(period.sandwichs[j] === idMaj) {
                    sandwichIn = true
                }
            }
            if(!sandwichIn) {
                await period.update({$addToSet: {sandwichs: idMaj}})
            }
        }
        let sandwich = new Sandwichs()
        sandwich.id = idMaj
        sandwich.link = req.body.link
        sandwich.constitution = req.body.constitution
        await sandwich.save()
        res.status(201).send("sandwich saved")
    } catch (e) {
        res.send(e)
    }
});

router.put('/:id', async(req,res) => {
    try {
        await Sandwichs.findOneAndUpdate({"id" : req.params.id.replace(/([A-Z])/g, ' $1').trim()}, req.body);
        res.status(200).send("sandwich updated")
    } catch (e) {
        res.send(e)
    }
});

module.exports = router;