var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var db = mysql.createConnection({
    host: "localhost",
    user: "test1",
    password: "test1",
    database: "test",
    dateStrings: "date"
});

db.connect(function(err) {
  if (err) {
      console.log('connecting error');
      return;
  }
  console.log('connecting success');
});

router.get('/', function(req, res) {
  var sql = 'SELECT * FROM todo';
  db.query(sql, function(err, rows) {
    if (err) {
        console.log(err);
    }
    //res.json(rows);
    res.render('index', { title: 'To-do List', data: rows});
  });
});

router.post('/add', function(req, res) {
  var data = {user: 'test1', fin: 0, thing:  req.body.thing, due: req.body.due};
  var sql = "INSERT INTO todo SET ?";

  db.query(sql, data,function(err, rows) {
    if (err) {
      console.log(err);
    }
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/');
  });
});

router.put('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  var thing = req.body.thing;
  var due = req.body.due;
  var sql = "UPDATE todo SET thing = ?, due = ? WHERE id = ?";

  db.query(sql, [thing, due, id], function(err, rows) {
    if (err) {
      console.log(err);
    }

    res.redirect(303, '/');
  });
});

router.delete('/delete/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = "DELETE FROM todo WHERE id = ?";

  db.query(sql, id, function(err, rows) {
    if (err) {
      console.log(err);
    }

    res.redirect(303, '/');
  });
});

module.exports = router;
