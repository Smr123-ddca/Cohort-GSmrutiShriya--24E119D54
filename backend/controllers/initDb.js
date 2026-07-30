const {query} = require('../models/connection.js');
const initDatabase = async() => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            reg_id CHAR(10) UNIQUE NOT NULL,
            fullname VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(300) CHECK(LENGTH(password) > 8) NOT NULL,
            age INTEGER CHECK (age>=16 AND age<=65) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        `
    try{
        await query(createTableQuery);
        console.log("Table is created sucessfully");
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = {
    initDatabase
}