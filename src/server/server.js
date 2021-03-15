const express = require("express");
const app = express();
const port = 3002;
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용

var connection = mysql.createConnection({
    host: "localhost",
    user: "root", //mysql의 id
    password: "root1234", //mysql의 password
    database: "j_s_board", //사용할 데이터베이스
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.get('/ReadCountList', (req, res) => {
    connection.query("SELECT Board_No, Board_Title, Read_Count FROM Board ORDER BY Read_Count DESC",
        function (err, rows) {
            if (err) {
                console.log("ReadCountList Error");
            } else {
                res.send(rows);
            }
        })
})

app.get('/WriteDateList', (req, res) => {
    connection.query("SELECT Board_No, Board_Title, Read_Count FROM Board ORDER BY Board_WriteDate DESC",
        function (err, rows) {
            if (err) {
                console.log("WriteDateList Error");
            } else {
                res.send(rows);
            }
        })
})

app.get('/BoardList', (req, res) => {
    const Board_Theme = req.query.Board_Theme;
    connection.query("SELECT Board_No, Board_Title, User_Name, Read_Count FROM Board WHERE Board_Theme = ?", [Board_Theme],
        function (err, rows) {
            if (err) {
                console.log("BoardList Error");
            } else {
                res.send(rows);
            }
        })
})

app.get('/BoardRead', (req, res) => {
    const Board_No = req.query.Board_No;
    connection.query(
        "SELECT Board_Title, Board_Content, Board_Theme, date_format(Board_WriteDate, '%Y-%m-%d') as Board_WriteDate, User_Id, User_Name, Image_Name FROM Board WHERE Board_No = ?"
        , [Board_No],
        function (err, rows) {
            if (err) {
                console.log("BoardRead Error");
            } else {
                res.send(rows[0]);
            }
        })
})

app.delete("/BoardDelete", (req, res) => {
    const Board_No = req.body.Board_No;
    console.log("test", Board_No);
    connection.query("DELETE FROM Board WHERE Board_NO = ?", [Board_No],
        function (err, rows, fields) {
            if (err) {
                console.log("BoardDelete Error");
            } else {
                console.log("성공");
            };
        });
});

app.patch('/BoardUpdate', (req, res) => {
    const query = 'UPDATE Board SET Board_Title = ?, Board_Content = ?, User_Name = ? WHERE Board_No = ?';
    const params = [req.body.Board_Title, req.body.Board_Content, req.body.User_Name, req.query.Board_No];
    connection.query(query, params, (err, result) => {
        if (err) {
            console.log("BoardUpdate Error");
        } else {
            res.send({
                ok: true,
            });
        }
    });
});

app.post("/BoardInsert", (req, res) => {
    const query = 'INSERT INTO Board (Board_Theme, Board_Title, Board_Content, Board_WriteDate, User_Id, User_Name) values (?,?,?,?,?,?)';
    const params = [req.body.Board_Theme, req.body.Board_Title, req.body.Board_Content, req.body.Board_WriteDate, req.body.User_Id, req.body.User_Name];
    console.log("params", params);
    connection.query(query, params, (err, rows, result) => {
        if (err) {
            console.log("BoardInsert Error", err);
        } else {
            console.log(rows);
        };
    });
});

app.listen(port, () => {
    console.log(`Connect at http://localhost:${port}`);
})