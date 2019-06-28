const route = require('express').Router();

const authorization = require('../auth/auth');
const users = require('../controllers/userController.js');

route.post("/register", users.register);
route.post("/login", users.login);
route.get("/:id", users.getUser);
route.put("/update/:id", users.updateUser); 


module.exports = route;