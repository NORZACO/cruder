const data = require('../data/mocking.json');
const { databaseConnection } = require('./connectsql')



// databaseConnection.connect()


const deleteRouter = (request, response) => {
    const id = parseInt(request.params.id)

    databaseConnection.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}





module.exports = {
    'QdeleteRouter': deleteRouter
}