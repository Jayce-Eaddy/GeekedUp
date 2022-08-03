var express = require('express');
var router = express.Router();
var models = require("../models");
var mysql = require('mysql2');

//hiya//
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1!',
  database: 'todo'
});

connection.connect((err)=>{
  if(err) throw err
  console.log("Yay! we are connected to the database!!!");
})

const query =`SELECT * FROM todo.tasks`;
connection.query(query, (err, results) => {
  if (err) throw err;

});


/* GET users listing. */

router.get("/", function(req, res, next) {
  models.Task.findAll().then(tasks => res.json(tasks));
});

/* POST users listing. */
router.post('/', function(req, res, next) {
 let newTask = new models.Task();
 newTask.name = req.body.name;
 newTask.save().then(task => res.json(task));
});

router.delete("/:id", function(req, res, next) {
  let taskId = parseInt(req.params.id);
  models.Task.findByPk(taskId)
    .then(task => task.destroy())
    .then(() => res.send({ taskId }))
    .catch(err => res.status(400).send(err));
});

router.put("/:id", function(req, res, next) {
  models.Task.update(
    {
      name: req.body.name,
      complete: req.body.complete
    },
    {
      where: { id: parseInt(req.params.id) }
    }
  ).then(task => res.json(task));
});

module.exports = router;
