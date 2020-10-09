const textBox = document.getElementById('todoText');
const list = document.getElementById('todoList');
const btn = document.getElementById('addBtn');

const sampleObj = {
    name: 'Milk',
    id: Date.now()
}

let todoList = [sampleObj];

function listRender() {
    list.childNodes.forEach(c => c.remove());
    list.innerHTML = '';
    const tempList = todoList.map(item => {
        const li = document.createElement('li');
        li.innerText = item.name;
        li.id = item.id;
        const newBtn = document.createElement('button')
        newBtn.innerHTML=("Remove");
        li.append(newBtn);


        //Event Listener to remove button
        newBtn.addEventListener('click',async()=>{
            const response = await fetch('http://localhost:8080/todo/remove',{
                method:'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(item)
            });
        })

        newBtn.onclick = () =>{deleteItem(item.id)}

        const newBtn2 = document.createElement('button')
        newBtn2.innerHTML = ("Edit");
        li.append(newBtn2);
        
        
        newBtn2.onclick = () => {
            var test = createtextbox(item.name);
            li.append(test)
            li.append(createbtn(test,item))    
        }

        return li;
    });
    
    list.append(...tempList);
    
}
listRender();

    function deleteItem(id){
        todoList = todoList.filter(t=>t.id!==id)
        listRender() 
    }


    function createbtn(replacement,changethis){
        const submitbtn = document.createElement('button');
        submitbtn.innerHTML = "change";


        //Event Listener to update button
        submitbtn.addEventListener('click',async()=>{
            const newvalue1 = {
                updateitemwith:replacement.value,
                item:changethis.name,
                id:Date.now()
            }
            const response = await fetch('http://localhost:8080/todo/update',{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(newvalue1)
            });
        })
        
        submitbtn.onclick = () =>{

            const newvalue2 = {
                name:replacement.value,
                id:Date.now()
            }
            
            var foundIndex = todoList.findIndex(x => x.name == changethis.name);
            todoList[foundIndex] = newvalue2;


            listRender();

        }
        return submitbtn;
        }
        
    function createtextbox(id){
        const editbar = document.createElement('input');
        return editbar;
    }


btn.onclick = () => {
    var value = textBox.value;
    if (!value.length) {
        return;
    }
    const tempObj = {
        name: value,
        id: Date.now()
    };
    todoList.push(tempObj);
    listRender();
}


//Event Listener to add button
btn.addEventListener('click',async()=>{
    const data = {
        todo: textBox.value
    }
    const response = await fetch('http://localhost:8080/todo/add',{
    method:'post',
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify(data)
});
})


