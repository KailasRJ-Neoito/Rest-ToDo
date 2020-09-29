const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

let itemlist = [];
itemlist = JSON.parse(fs.readFileSync("itemlist.json"))


app.get('/',(req,res)=>{
   res.send(itemlist);
})

app.post('/add', (req, res) => {
    console.log("newTodo",req.body);

    var newTodo = req.body;
    itemlist.push(newTodo);
    res.send(itemlist);
    console.log(itemlist);
    fs.writeFileSync("itemlist.json",JSON.stringify(itemlist));
});

app.post('/remove',(req,res) => {
 
  var removeTodo = req.body;
  console.log(removeTodo);
  var itemtoremove = removeTodo.item;
  console.log(itemtoremove);
  let removedlist = itemlist.filter((x) => x.item !== itemtoremove)
  res.send(removedlist);
  console.log(removedlist);
  fs.writeFileSync("itemlist.json",JSON.stringify(removedlist));
})

app.post('/update',(req,res) => {

    var itemstoupdate = req.body;
    console.log(itemstoupdate);
    var updateitem = itemstoupdate.updateitemwith;
    console.log(updateitem);
    var updateprice = itemstoupdate.updatepricewith; 
    console.log(updateprice);
    // var item = itemstoupdate.item;
    let index = itemlist.findIndex( (x) => x.item === itemstoupdate.item);
    console.log(index);
    itemlist[index].item = updateitem;
    itemlist[index].price = updateprice;
    res.send(itemlist);
    fs.writeFileSync("itemlist.json",JSON.stringify(itemlist));
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})