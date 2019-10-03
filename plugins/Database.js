const fs = require('fs');
const path = require('path');
const {Sequelize} = require(`sequelize`);
const chalk = require('chalk');

const Redis = require('ioredis')
const redis = new Redis()

const RedisAdaptor = require('sequelize-transparent-cache-ioredis')
const redisAdaptor = new RedisAdaptor({
  client: redis,
  namespace: 'model',
  lifetime: 60 * 60
})

const sequelizeCache = require('sequelize-transparent-cache')
const { withCache } = sequelizeCache(redisAdaptor)


class Mind {
    constructor(client, options = {}){  
        this._client = client;
        this.mind1 = new Sequelize(options.database, options.username, options.password, {
            host: options.host,
            dialect: options.dialect,
            logging: options.logging
        });
        this.models = {};
        this.start();
        this.loadCache();
    }

    start(){
        return new Promise((resolve, reject) => {
            this.mind1.authenticate().then(() => {
                this._client.logger.info(chalk.cyan`Conectado ao Postgres!`)
            })
                .catch(err => {
                    this._client.logger.error(chalk.red.bold(`Erro ao tentar conectar-se a database.` + err))
                    return reject
                })

        this._client.logger.info(`Carregando módulos e comandos...`)
        
        fs.readdirSync(__dirname + '/models/').forEach((filename) => {
        this._client.logger.debug(`Tabela ${filename.replace('.js', '').toLowerCase()} carregada.`);
        var model = {};
        model.path = path.join(__dirname, '/models/', filename)
        model.name = filename.replace(/\.[^/.]+$/, "");
        model.resource = this.mind1.import(model.path);
        this.models[model.name] = model;
            });
                this.mind1.sync();
                return resolve(this);
            });
    }
  async loadCache() {
        this.models.users = withCache(this.mind1.import(__dirname + '/models/User.js'));
        this.models.guilds = withCache(this.mind1.import(__dirname + '/models/Guild.js'));
    }
}

module.exports = Mind;
