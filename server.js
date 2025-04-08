const express = require('express');
const app = express();

app.use(express.json());

const jwt = require('jsonwebtoken');
const PORT = 3000

const secretKey = 'Vaibhav'

const users = [
    {
        id:'E12345',
        password: 'securePass',
    }
];

app.post('/login', (req, res) => {
    const {id, password} = req.body;
    let user = null;
    for(let i=0; i<users.length; i++){
        if(users[i].id == id && users[i].password == password){
            user = users[i];
            break;
        }
    }
    const token = jsonWebToken.sign({id: user.id}, secretKey,{expriresIn:'10m'});
    res.json({token});
})

app.get('/dashboard', (req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.json({message: 'Please enter vaild token'});
    }
    console.log(token);
    try{
        const verifyDash = jsonWebToken.verify(token,secretKey);
        if(!verifyDash){
            return res.send({message: 'Wrong token, please try again'});
        }
    } catch(error) {
        return res.status(401).send({error: 'Unauthorized'})
    }
    res.json({message: 'Welcome to employee Dashboard'})
})  

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})