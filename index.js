const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    database: 'week6',
});

const express = require('express')
const app = express()
const port = 3001

app.use(express.json())

//get method 1.1
app.get('/', (req,res) => {
    connection.query(
        'SELECT * FROM `tbl_user` where status = 1',
        function (err, results, fields) {
            res.json(results)
        }
    );
})

//get Method 1.2
app.get('/:id', (req,res) => {
    connection.query(
        'SELECT * FROM `tbl_user` where id =' + req.params.id,
        function (err, results, fields) {
            console.log(err)
            res.json(results)
        }
    )
})

//post Method
app.post('/', (req, res) => {
    const data = req.body
    connection.query(
        `INSERT INTO tbl_user (fname,lname,status)
            VALUES ('${data.fname}', '${data.lname}', '1')`,
        function (err, results, fields){
            res.json(results)
        }
    )
})

app.put('/:id', (req, res) => {
    connection.query(
        `UPDATE tbl_user SET fname = ? , lname = ? WHERE id = ?`,
        [req.body.fname, req.body.lname, req.params.id],
        (err, result, fields) => {
            res.json(result)
        }
    )
})


//delete Method
app.delete('/:id', (req,res) => {
    connection.query(
        `UPDATE tbl_user SET status = '1' WHERE id =  ${req.params.id}`,
        function (err, results, fields) {
            res.json(results)
        }
    )
})

app.listen(port, () => {
    console.log('server is running on port : ', port)
})
