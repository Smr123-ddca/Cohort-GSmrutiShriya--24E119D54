const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors())
require('dotenv').config()
const {initDatabase} = require('./controllers/initDb.js');
const db = require('./models/connection.js');
initDatabase();

PORT = process.env.PORT;

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json({
        status:"Success",
        message: "Welcome to the User Management API"
    })
})

app.get('/users', async (req,res) => {
    const getUsersQuery = `
    SELECT * FROM users;
    `
    try{
        const result = await db.query(getUsersQuery);
        res.status(200).json({
            status:"Success",
            message: "All users Fetched",
            data: result.rows
        })
    }catch(error){
        return res.status(500).json({
            status:"Failed",
            message: "Something went wrong",
            error: error
        })
    }
    
})

app.post('/users' , async (req,res) => {
    const {fullname , reg_id , email , password , age} = req.body ;

    if (!fullname || !reg_id || !email || !password || !age) {
        return res.status(400).json({
            status: "Failed",
            message: "All fields are required"
        })
    }

    try{
        const createUserQuery = `
        INSERT INTO users (fullname , reg_id , email , password , age) VALUES ($1 , $2 , $3 , $4 , $5)
        RETURNING id,fullname,reg_id,email,password,age;
        `
        const result = await db.query(createUserQuery , [fullname , reg_id , email , password , age]);

        res.status(201).json({
            status : "Success" ,
            message : "Created user successfully",
            data : result.rows[0]
        })
    }catch(error){
        return res.status(500).json({
            status: "Failed",
            message: "Something went wrong",
            error: error
    })
    }
})

app.post('/login' , async (req,res) => {
    const {email , password} = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            status: "Failed",
            message: "Email and password are required"
        });
    }

    try{
        const getUserDetails = `
        SELECT *
        FROM users
        WHERE email = $1 AND password = $2 ;`

        const result = await db.query(getUserDetails, [email , password])

        if (result.rows.length === 0) {
            return res.status(401).json({
            status: "Failed",
            message: "Invalid email or password"
            });
        }

        res.status(202).json({
            status: "Success",
            message: "Information retrieved successfully",
            data: result.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: "Something went wrong",
            error: error
        })
    }
})

app.patch('/profile' , async (req , res) => {
    const {reg_id , email , password , age } = req.body;

    if (!reg_id) {
        return res.status(400).json({
            status: "Failed",
            message: "Registration ID is required"
        });
    }

    try{
        const updateUserDetails = `
        UPDATE users
        SET email =$2 , password = $3 , age = $4
        WHERE reg_id = $1 
        RETURNING id, fullname, reg_id, email, age;`

        const result = await db.query(updateUserDetails, [reg_id , email , password , age])

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found"
            });
        }

        res.status(202).json({
            status: "Success",
            message: "Information retrieved successfully",
            data: result.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: "Something went wrong",
            error: error
        })
    }
})

app.delete('/profile', async (req, res) => {
    const { reg_id  } = req.body;
    try {
        const deleteUserQuery = `
        DELETE FROM users WHERE reg_id = $1
        RETURNING fullname , reg_id , email , password , age;
        `
        const result = await db.query(deleteUserQuery, [reg_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "Success",
            message: "User deleted successfully",
            data: result.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: "Something went wrong",
            error: error
        })
    }
})



app.listen(PORT , (err)=>{
    if(err) console.log(err);
    console.log(`Successfully connected to server at port ${PORT}`);
})