const express = require('express')
require('rootpath')();
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

//Build the express app
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
const errorHandler = require('../middleware/error-handler')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.get('/status', (req, res) => {
//     res.send({
//         message: 'hello world!'
//     })
// })
// app.post('/register', (req, res) => {   
//     res.send({
//         message: `Hello ${req.body.email}! Your user was registered! Have fun!`
//     })
// })

app.use('/users', require('../models/users/controller'));

// global error handler
app.use(errorHandler);

// app.listen(process.env.PORT || 8081)
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));