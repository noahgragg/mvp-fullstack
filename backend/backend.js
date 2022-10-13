const express = require('express');
const res = require('express/lib/response');
const app = express();
const cors = require('cors')
const {Pool} = require('pg');
const config = require('./config')[process.env.NODE_ENV||"dev"]
const PORT = config.port
//const PORT = 8000; //for local testing 
//const connectionString = 'postgres://postgres:postgrespw@localhost:55002/icecrown' //local connection string
//reference config.json for connectionstring
const pool = new Pool({
    connectionString: config.connectionString,
});
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));
pool.connect();
//get all bosses from boss table
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
//get all loot marked as wishlist items
app.get('/api/wish', (req,res) =>{
    pool.query(`SELECT * FROM loot where wishlist = 1;`)
    .then(result =>{
        res.send(result.rows);
    })    
})
//set wishlist value to 1 on loot
app.patch('/api/wish/:id', (req, res) => {
    let wishLoot = req.params['id']
    console.log('wishlist test')
    pool.query(`UPDATE loot SET wishlist = 1 WHERE loot_id = ${wishLoot}`)
    .then(result =>{
        res.send(result.rows)
    })
})
//Rset wishlist value to NULL on loot
app.patch('/api/removewish/:id', (req, res) => {
    let wishLoot = req.params['id']
    pool.query(`UPDATE loot SET wishlist = NULL WHERE loot_id = ${wishLoot}`)
    .then(result =>{
        res.send(result.rows)
    })
})
//show port
app.listen(PORT, function() {
console.log(`Server is running on ${PORT}`)
});