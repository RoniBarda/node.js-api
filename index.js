const express = require('express');
const app = express();

app.use(express.json());

const users = [
        {id: 1, name: 'Alice'},
        {id: 2, name: 'Roni'},
        {id: 3, name: 'Bob'},
];

app.get('/users', (req,res)=>{
    return res.json(users);
});

app.post('/add-user', (req, res) => {
    const {name} = req.body;

    if(!name){
        return res.status(400).json({error:'Name is required'});
    }

    const existingUser =  users.find ((user) => user.name.includes(name));

    if(existingUser){
        return res.status(400).json({error: 'User already exists'});
    }

    const newUser = {
        id: users.length + 1,
        name,
    }

    users.push(newUser);

    return res.status(201).json(users);
});

app.listen(3000, () =>{
    console.log('Server is running on http://localhost:3000');
});