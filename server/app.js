const express = require('express');
// const db = require('./db/conn') 
const mysql = require('mysql');
const app = express();
const cors = require('cors')

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crud_in_mern',
})


app.use(express.json())
app.use(cors())


app.get('/', (req,res) => {
    res.send("hello")
})

///*******************GET ALL TTEAM ************************** */


app.get('/getteam', (req,res) => {
    const q = 'select * from crud'
    db.query(q,(err, data) => {
        if(err)return res.json(err)
        return res.json(data)
    })
})


///*******************GET SELECTED TTEAM ************************** */


app.get('/team/:id', (req,res) => {
    const id = req.params.id
    const q = 'select * from crud where id = ?'
    db.query(q, [id], (err, data) => {
        if(err)return res.json(err)
        return res.json(data)
    })
})





///*******************ADD NEW TTEAM ************************** */

app.post('/addteam', (req, res) =>{

    const q = "insert into crud (`Team_Name`, `Team_Leader`, `Total_Team_Member`) values (?)";
    
    const values = [
        req.body.teamname, 
        req.body.teamleader,
        req.body.totalmember    
    ]
    
    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Team Ragistred Successfully")
    })
})


///*******************UPDATE TTEAM ************************** */



app.patch('/updateteam/:id', (req, res) =>{
    const id = req.params.id
    console.log(id);
    const q = "update crud set `Team_Name` = ?, `Team_Leader` = ?, `Total_Team_Member` = ? where id = ?";
    
    const values = [
        req.body.teamname, 
        req.body.teamleader,
        req.body.totalmember    
    ]
    
    db.query(q, [...values, id], (err, data) => {
        if(err)
        {
            console.log(err);
            return res.json(err)
        } 
        
        return res.json("Team Ragistred Successfully")
    })
})


///*******************DELETE TTEAM ************************** */
app.delete('/teamdelete/:id', (req,res) => {
    const id = req.params.id
    const q = "delete from crud where id = ?"
    
    db.query(q, [id], (err, data) => {
        if(err)return res.json(err);
        return res.json("Team Has Been Deleted Successfully")
    })
})


app.listen(8000, () => {
    console.log('server created');
})