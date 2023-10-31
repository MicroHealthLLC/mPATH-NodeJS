const { Sequelize } = require('sequelize');
const { setupModelAssociation } = require('./associations');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  logging: console.log,
  logQueryParameters: true,
  benchmark: true
});

const modelDefiners = [
	require('./models/user'),
	require('./models/program'),
	// Add more models here...
	// require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
setupModelAssociation(sequelize);

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

// We export the sequelize connection instance to be used around our app.
module.exports = { 
  sequelize, 
  assertDatabaseConnectionOk 
};