require('dotenv').config();
const PORT = 3000;

const express = require('express');
const { sequelize, assertDatabaseConnectionOk } = require('./database');
const authRoute = require('./routes/authRoutes');
const profileRoute = require('./routes/profileRoute');
const usersRoute = require('./routes/usersRoutes');
const programsRoute = require('./routes/programsRoutes');
const cors = require('cors');

const app = express();
var router = express.Router()
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/v1/auth', authRoute);
app.use('/api/v1/profile', profileRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/programs', programsRoute);
app.use

//Longwinded way to check if the routes exist.  Delete when done.

// function print (path, layer) {
//   if (layer.route) {
//     layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
//   } else if (layer.name === 'router' && layer.handle.stack) {
//     layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
//   } else if (layer.method) {
//     console.log('%s /%s',
//       layer.method.toUpperCase(),
//       path.concat(split(layer.regexp)).filter(Boolean).join('/'))
//   }
// }

// function split (thing) {
//   if (typeof thing === 'string') {
//     return thing.split('/')
//   } else if (thing.fast_slash) {
//     return ''
//   } else {
//     var match = thing.toString()
//       .replace('\\/?', '')
//       .replace('(?=\\/|$)', '$')
//       .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
//     return match
//       ? match[1].replace(/\\(.)/g, '$1').split('/')
//       : '<complex:' + thing.toString() + '>'
//   }
// }

// app._router.stack.forEach(print.bind(null, []))

async function init() {
	await assertDatabaseConnectionOk();

	app.listen(PORT, () => {
		console.log(`Sequelize + Express server started on port ${PORT}`);
	});
}

init();