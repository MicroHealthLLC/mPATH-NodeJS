const dotenv = require('dotenv');
dotenv.config();
const fastify = require('fastify')({
  logger: true
})
const qs = require('qs');

const cors = require('@fastify/cors');
const authRoute = require('./routes/authRoutes');
const profileRoute = require('./routes/profileRoute');
const usersRoute = require('./routes/usersRoutes');
const programsRoute = require('./routes/programsRoutes');
const lessonsRoutes = require('./routes/lessonsRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const issuesRoutes = require('./routes/issuesRoutes');
const effortsRoutes = require('./routes/effortsRoutes');
const risksRoutes = require('./routes/risksRoutes');
const notesRoutes = require('./routes/notesRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const filterDataRoutes = require('./routes/filterDataRoutes');
const queryRouters = require('./routes/queryRouters');

const programSettingContractDataRoutes = require('./routes/programSettingContractDataRoutes');
const programSettingContractsRoutes = require('./routes/programSettingContractsRoutes');
const programSettingContractVehiclesRoutes = require('./routes/programSettingContractVehiclesRoutes');
const programSettingFacilitiesRoutes = require('./routes/programSettingFacilitiesRoutes');
const programSettingFacilityGroupsRoutes = require('./routes/programSettingFacilityGroupsRoutes');
const programSettingProjectsRoutes = require('./routes/programSettingProjectsRoutes');
const programSettingRolesRoutes = require('./routes/programSettingRolesRoutes');
const programSettingUsersRoutes = require('./routes/programSettingUsersRoutes');

const portfolioContractDataRoutes = require('./routes/portfolioContractDataRoutes');
const portfolioContractVehicleRoutes = require('./routes/portfolioContractVehicleRoutes');

// fastify.addHook('onRequest', function(request, reply, done) {
// 	let body = qs.parse(request.body)
// 	let query = qs.parse(request.query)
// 	let params = qs.parse(request.params)

//   console.log('*****body', body);
//   console.log('****query', query);
//   console.log('****params', params);

//   done();
// })
const formDataParser =  require("formzilla");

const {db} = require('./database/models'); // import models
const PORT = 3000;

fastify.register(cors, { 
  // put your options here
})

// fastify.register(require('@fastify/multipart'), {addToBody: true})
// fastify.register(require('@fastify/formbody'))
fastify.register(formDataParser);
fastify.register(authRoute)
fastify.register(profileRoute)
fastify.register(usersRoute)
fastify.register(programsRoute)
fastify.register(lessonsRoutes)
fastify.register(tasksRoutes)
fastify.register(issuesRoutes)
fastify.register(effortsRoutes)
fastify.register(risksRoutes)
fastify.register(rolesRoutes)
fastify.register(notesRoutes)
fastify.register(filterDataRoutes)
fastify.register(queryRouters)

// fastify.register(programSettingContractDataRoutes)
fastify.register(programSettingContractsRoutes)
fastify.register(programSettingContractVehiclesRoutes)
fastify.register(programSettingFacilitiesRoutes)
fastify.register(programSettingFacilityGroupsRoutes)
fastify.register(programSettingProjectsRoutes)
fastify.register(programSettingUsersRoutes)
fastify.register(programSettingRolesRoutes)

fastify.register(portfolioContractDataRoutes)
fastify.register(portfolioContractVehicleRoutes)

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
  // Run the server!
  fastify.listen({ port: PORT }, (err, address) => {
    if (err) throw err
    console.log(`Sequelize + Express server started on port ${PORT}`);
  })

}

init();