const express = require('express');
const app = express();

const bp = require('body-parser');

const mysql = require('mysql');
const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'Tiket'
});

app.use(bp.json())

app.listen('8000', (err) => {

    if (err) {
        console.log("Err");
    } else {
        con.connect((err) => {
            if (err) {
                console.log("Koneksi database error");
            }
            else {
                console.log("Koneksi database berhasil");
            }
        });
        console.log("Server Running di Port 8000")
    }

});

app.get('/getData/:id', (req, res) => {

    let param = req.params.id;

    con.query("SELECT * FROM penumpang WHERE id_penumpang = " + param, (err, row) => {

        if (err) {
            res.send({ result: "err" });
        }
        else {
            if (row == "") {
                res.send({ result: "null" })
            }
            else {
                res.send({ result: "good", data: row })
            }
        }
    });
});

app.post('/insertData', (req, res) => {

    let data = { id_penumpang: "", username: req.body.user, password: req.body.pass, nama_penumpang: req.body.nama, alamat_penumpang: req.body.alamat, tanggal_lahir: Date.now(), jenis_kelamin: req.body.jk, telephone: req.body.telp }

    con.query("INSERT INTO penumpang SET ? ", data, (err) => {

        if (err) {
            res.send({ result: "err" })
        }
        else {
            res.send({ result: "good" })
        }
    });
});

app.put('/updateData', (req, res) => {

    let data = { username: req.body.user }
    let param = req.body.id;

    con.query("UPDATE penumpang SET ? WHERE id_penumpang = ? ", [data, param], (err) => {
        if (err) {
            res.send({ result: "err" })
        }
        else {
            res.send({ result: "good" })
        }
    })

});

app.delete('/deleteData', (req, res) => {
    let param = req.body.param;
    con.query("DELETE FROM penumpang WHERE id_penumpang = ?", param, (err) => {
        if (err) {
            res.send({ result: "err" })
        }
        else {
            res.send({ result: "good" })
        }
    });
});



