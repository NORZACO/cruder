const data = require('../data/mocking.json');
const { databaseConnection } = require('./connectsql')



const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    databaseConnection.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}



const getuserRouter = (request, response) => {
    databaseConnection.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}




module.exports = {
    'QgetuserRouter': getuserRouter,
    'QgetUserById': getUserById

}