const Client = require('./src/Navi');
const path   = require('path');
const { Database } = require("./plugins");

require("dotenv").config();

const Navi = new Client({
  token: process.env.TOKEN,
  modules: '/modules'
});


const resolve = (dir) => path.join(dir);

Navi.register("commands", resolve("/commands"), { groupedCommands: true })
.createPlugin("db", Database, {
  username: "postgres",
  passowrd: 123321,
  database: "kirby",
  dialect: "postgres",
  logging: false

})
.register("db", path.join(__dirname, 'models'));

Navi.run();