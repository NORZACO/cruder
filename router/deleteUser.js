const data = require('../data/mocking.json');
const { databaseConnection } = require('./connectsql')



// databaseConnection.connect()


const deleteRouter = (request, response) => {
    const id = parseInt(request.params.id);
    const { email } = request.body;
    const deleting_query = `DELETE FROM users WHERE id = ${id} AND email = '${email}'`;

    databaseConnection.query(deleting_query, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User deleted with ID: ${id} and email: ${email}`);
    });
};


// be able to avoid SQL injection attacks.
const deleteRouterx = (request, response) => {
    const user_id = parseInt(request.params.id);
    const { user_email } = request.body;
    const deleting_query = 'DELETE FROM users WHERE id = $1 AND email = $2';
    const values = [user_id, user_email ];

    databaseConnection.query(deleting_query, values, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User deleted with ID: ${user_id} and email: ${user_email}`);
    });
};


const deleteRouterv1 = (request, response) => {
    const id = parseInt(request.params.id);
    const { email } = request.body;
    const selectQuery = 'SELECT * FROM users WHERE id = $1 AND email = $2';
    const deleteQuery = 'DELETE FROM users WHERE id = $1 AND email = $2';
    const id_email_values = [id, email];

    databaseConnection.query(selectQuery, id_email_values, (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount === 0) {
            response.status(404).send(`User with ID: ${id} and email: ${email} not found`);
        } else {
            databaseConnection.query(deleteQuery, id_email_values, (error, results) => {
                if (error) {
                    throw error;
                }
                response.status(200).send(`User deleted with ID: ${id} and email: ${email}`);
            });
        }
    });
};






module.exports = {
    'QdeleteRouter': deleteRouter,
    'QdeleteRouterv1' : deleteRouterv1
}