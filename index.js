const Client = require('./src/Navi');
const { Database } = require("./plugins");
const path   = require('path');

global.base_dir = __dirname;
global.abs_path = function(path) {
  return base_dir + path;
}

global.include = function(file) {
  return require(abs_path('/' + file));
}

require("dotenv").config();

const Navi = new Client({
  token: process.env.TOKEN,
  modules: '/modules',
  admins: ['268351613771448320', '616059349957345280']
});

const resolve = (dir) => path.join(dir);
Navi.register("commands", resolve("/commands"), { groupedCommands: true })
.createPlugin("db", Database, {
  username: process.env.USERNAMES,
  password: process.env.PASSWORDS,
  database: process.env.DBNAME,
  dialect: "postgres",
  logging: false
})
.register("db", path.join(__dirname, 'models'));

Navi.run();
