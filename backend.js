const express = require('express');
const res = require('express/lib/response');
const app = express();
const cors = require('cors')
const PORT = 8000;
const {Pool} = require('pg');
const connectionString = 'postgres://postgres:postgrespw@localhost:55002/icecrown'

const pool = new Pool({
    connectionString: connectionString,
});
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));
pool.connect();
//get all bosses
app.get('/api/boss', (req,res) =>{
    pool.query(`SELECT * FROM bosses;`)
    .then(result =>{
        res.send(result.rows);
    })    
})
//Get all loot based on boss id
app.get('/api/boss/:boss', (req,res) =>{
    let boss = req.params['boss']
    console.log(boss)
    pool.query(`SELECT * FROM loot WHERE boss_id=${boss};`)
    .then(result =>{
        res.send(result.rows);
    })    
})

app.get('/api/wish', (req,res) =>{
    pool.query(`SELECT * FROM loot where wishlist = 1;`)
    .then(result =>{
        res.send(result.rows);
    })    
})
//ADD TO WISHLIST
app.patch('/api/wish/:id', (req, res) => {
    let wishLoot = req.params['id']
    console.log('wishlist test')
    pool.query(`UPDATE loot SET wishlist = 1 WHERE loot_id = ${wishLoot}`)
    .then(result =>{
        res.send(result.rows)
    })
})
//REMOVE FROM WISHLIST
app.patch('/api/removewish/:id', (req, res) => {
    let wishLoot = req.params['id']
    pool.query(`UPDATE loot SET wishlist = NULL WHERE loot_id = ${wishLoot}`)
    .then(result =>{
        res.send(result.rows)
    })
})
// app.post('/api/weapons', (req, res) =>{
//     let newWep = req.body;
//     console.log(newWep)
//     pool.query(`INSERT INTO weapons (wepType, wepDmg, wepSpd, name) VALUES ('${newWep.type}', ${newWep.damage}, '${newWep.speed}','${newWep.name}');`)
//     //res.send('Nice');
// })

// app.delete()

app.listen(PORT, function() {
console.log(`Server is running ${PORT}`)
});