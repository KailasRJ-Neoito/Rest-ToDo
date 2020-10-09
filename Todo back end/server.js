const fs = require('fs');
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
})

app.put('/todo/update',(req,res) => {

    var itemstoupdate = req.body;
    console.log(itemstoupdate);
    var updateitem = itemstoupdate.updateitemwith;
    console.log(updateitem);
    // var updateprice = itemstoupdate.updatepricewith; 
    // console.log(updateprice);
    // var item = itemstoupdate.item;
    let index = itemlist.findIndex( (x) => x === itemstoupdate.item);
    console.log(index);
    itemlist[index] = updateitem;
    // itemlist[index].price = updateprice;
    res.send(itemlist);
    fs.writeFileSync("itemlist.json",JSON.stringify(itemlist));
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})