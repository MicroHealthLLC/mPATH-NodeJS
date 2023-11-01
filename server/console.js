let repl = require('repl');
let models = require('./src/database/models');

console.log("models", models)
Object.keys(models).forEach(modelName => {
  global[modelName] = models[modelName];
});

// global['DateTime'] = require('./lib/DateTime').default;

let replServer = repl.start({
  prompt: 'app > '
});

replServer.context.db = models;