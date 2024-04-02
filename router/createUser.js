const data = require('../data/mocking.json');
const { databaseConnection } = require('./connectsql')






const createRouterx = (request, response) => {
  const { name, email, password, biograph, descriptions } = request.body;
  databaseConnection.query(
    'INSERT INTO users (username, email, password, biograph, descriptions) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, email, password, biograph, descriptions],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};



const createRouter = (request, response) => {
  const { username, email, password, biograph, descriptions } = request.body;

  // validate inputs
  if (!username || !email || !password) {
    response.status(400).send("Username, email and password are required fields");
    return;
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    response.status(400).send("Invalid email address");
    return;
  }
  if (password.length < 8) {
    response.status(400).send("Password must be at least 8 characters long");
    return;
  }

  const query = `INSERT INTO users (username, email, password, biograph, descriptions) VALUES ($1, $2, $3, $4, $5)`;
  const user_info_values = [username, email, password, biograph, descriptions];

  databaseConnection.query(query, user_info_values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`User ${username} created with email: ${email}`);
  });
};






module.exports = {
  'QcreateRouter': createRouter
}