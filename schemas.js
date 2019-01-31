const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.connect('mongodb://localhost:27017/macdo?authSource=admin', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', function () {
    console.log('connected to db');
});

const sandwichsSchema = mongoose.Schema({
    id: { type : String , required : true , unique : true },
    link: String,
    constitution : [String]
});

const periodSchema = mongoose.Schema({
    id: { type : String , required : true , unique : true },
    sandwichs: [String]
});

sandwichsSchema.plugin(uniqueValidator, { message: 'This {PATH} is already used by another sandwich' });
periodSchema.plugin(uniqueValidator, { message: 'This {PATH} is already used by another period' });

const Sandwichs = mongoose.model('Sandwichs', sandwichsSchema);
const Period = mongoose.model('Period', periodSchema);

module.exports = {
    Sandwichs: Sandwichs,
    Period: Period
};