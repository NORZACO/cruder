const data = require('../data/mocking.json');
const { databaseConnection } = require('./connectsql')



const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email, password, biograph, descriptions } = request.body;

    databaseConnection.query(
        'UPDATE users SET name = $1, email = $2, password = $3, biograph = $4, descriptions = $5 WHERE id = $6',
        [name, email, password, biograph, descriptions, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User modified with ID: ${id}`);
        }
    );
};





const updateUserx = (request, response) => {
    const user = {
        id: request.params.id,
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        biograph: request.body.biograph,
        descriptions: request.body.descriptions
    };

    updateUser(request, response, user);
};






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