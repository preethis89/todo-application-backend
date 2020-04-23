const serverlessHttp = require('serverless-http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'preethis89.cn467llviddc.eu-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Mangalam1',
  database: 'todo',
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/tasks', (request, res) => {
  connection.query('Select * from task', (err, data) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Error in Mysql', err);
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.post('/tasks', (req, res) => {
  const data = req.body;

  const query = 'INSERT INTO task (status, date, text, priority,userId) values (?,?,?,?,?)';
  // eslint-disable-next-line no-sequences
  connection.query(query, [0, data.date, data.text, data.priority, data.userid], (err, results) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Error in Mysql', err);
      res.status(500).send(err);
    } else {
      // eslint-disable-next-line no-shadow
      connection.query(`SELECT * FROM task WHERE taskId = ${results.insertId}`, (err, results) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log('Error in Mysql', err);
          res.status(500).send(err);
        // eslint-disable-next-line brace-style
        }
        // eslint-disable-next-line no-empty
        else {
          res.status(201).send(results[0]);
        }
      });
    }
  });
});


app.put('/tasks/:id', (req, res) => {

});
module.exports.app = serverlessHttp(app);
