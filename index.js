const Client = require('./src/Navi');
const path   = require('path');
const { Database } = require("./plugins");

require("dotenv").config();

const Navi = new Client({
  token: process.env.TOKEN,
  modules: '/modules',
  admins: ['268351613771448320']
});


const resolve = (dir) => path.join(dir);

Navi.register("commands", resolve("/commands"), { groupedCommands: true })
.createPlugin("db", Database, {
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  port: process.env.PORT,
  logging: false
  
})
.register("db", path.join(__dirname, 'models'));

Navi.run();