require('dotenv').config();
var expressWinston = require('express-winston');
var winston = require('winston'); // for transports.Console https://github.com/winstonjs/winston

const express = require('express');
const cors = require('cors');

const app = express();
var router = express.Router()
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRoute = require('./routes/authRoutes');
const profileRoute = require('./routes/profileRoute');
const usersRoute = require('./routes/usersRoutes');
const programsRoute = require('./routes/programsRoutes');
const lessonsRoutes = require('./routes/lessonsRoutes');
const {db} = require('./database/models'); // import models
const PORT = 3000;

	// express-winston logger makes sense BEFORE the router
app.use(expressWinston.logger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
		new winston.transports.File({ filename: 'log/combined.log', maxsize: 100000000, zippedArchive: true, maxFiles: 5}),
	],
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.align(),
		winston.format.json()
	)
}));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/profile', profileRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/programs', programsRoute);
app.use('/api/v1/programs/:id/lessons',lessonsRoutes);

// express-winston errorLogger makes sense AFTER the router.
app.use(expressWinston.errorLogger({
	transports: [
		new winston.transports.Console()
	],
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.align(),
		winston.format.json()
	)
}));
// Optionally you can include your custom error handler after the logging.
// app.use(express.errorLogger({
// 	dumpExceptions: true,
// 	showStack: true
// }));


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

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await db.sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function init() {
	await assertDatabaseConnectionOk();

	app.listen(PORT, () => {
		console.log(`Sequelize + Express server started on port ${PORT}`);
	});
}

init();