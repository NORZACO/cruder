const data = require('../data/mocking.json');
const { databaseConnection } = require('./connectsql')



const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    databaseConnection.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}










module.exports = {
    'QupdateUser': updateUser
}


// module.exports = {
//     getUsers,
//     getUserById,
//     createUser,
//     updateUser,
//     deleteUser,
//   }