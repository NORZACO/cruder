const data = require('../data/mocking.json');
const { databaseConnection  } = require('./connectsql')



databaseConnection.connect()



const createRouter = (request, response) => {
    const { name, email } = request.body
  
    databaseConnection.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }












module.exports = {
    'QcreateRouter' : createRouter
  }