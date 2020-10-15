const fs = require('fs');
let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'todoapp'
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');

});


const express = require('express');
const app = express();

var cors = require('cors')
app.use(cors({origin:true}))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

let itemlist = [];
itemlist = JSON.parse(fs.readFileSync("itemlist.json"))


app.get('/todo',(req,res)=>{
   res.send(itemlist);
})

app.post('/todo/add', (req, res) => {
    console.log("newTodo",req);
    var newTodo = req.body.todo;
    itemlist.push(newTodo);
    res.send(itemlist);
    console.log(itemlist);
    fs.writeFileSync("itemlist.json",JSON.stringify(itemlist));

      
      connection.query("INSERT INTO `Items` (Itemname) VALUES (?)",newTodo.toString(), 
      function (err, result) {
        if (err) throw err;
        console.log("Item",newTodo.toString());
      });
    });

app.delete('/todo/remove',(req,res) => {
 
  var removeTodo = req.body;
  console.log(removeTodo);
  var itemtoremove = removeTodo.name;
  console.log(itemtoremove);
  let removedlist = itemlist.filter((x) => x !== itemtoremove)
  res.send(removedlist);
  console.log(removedlist);
  fs.writeFileSync("itemlist.json",JSON.stringify(removedlist));
  
  connection.query(" DELETE FROM `Items` WHERE Itemname = ?",[itemtoremove], 
      function (err, result) {
        if (err) throw err;
        console.log(itemtoremove," is removedd");
      });
    });




app.put('/todo/update',(req,res) => {

    var itemstoupdate = req.body;
    console.log(itemstoupdate);
    var updateitem = itemstoupdate.updateitemwith;
    console.log(updateitem);
    let index = itemlist.findIndex( (x) => x === itemstoupdate.item);
    console.log(index);
    itemlist[index] = updateitem;
    res.send(itemlist);
    fs.writeFileSync("itemlist.json",JSON.stringify(itemlist));
    connection.query(`UPDATE Items SET Itemname = "${updateitem}" WHERE Itemname = "${itemstoupdate.item}"`, 
    function (err, result) {
      if (err) throw err;
      console.log(itemstoupdate.item," is updated");
    });
  });

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})
