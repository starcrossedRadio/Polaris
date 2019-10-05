// Importing source modules
const Module = include("src/structures/Module");
const { randomize } = include("src/util/Utils.js");

// Importing NPM modules
const chalk = require("chalk");
const moment = require("moment");


module.exports = class Guild extends Module {
    constructor(...args) {
        super(...args, {
            name: "guild:leveller",
            events: {
                messageCreate: "context"
            }
        })
        this.controller = new Map();
    }
    async init() {
        this.data  = await this._client.plugins.get("db").models;
    }
    async context(message) {
        if (!message.channel.guild) return;
        const store = await this.data.guilds.cache().findByPk(message.channel.guild.id);
        /**
         * Checking if the member was in the DB. If not, create the default xp-card.
         * 
         * @store -> @PolarisStore AKA Database instance;
         * @target -> Member in the @PolarisStore context;
         * @guild -> The guild who the @message was readed;
         */
        
        const members     = store.levelSystem.members;
        const target      = members.find(m => m.id === message.author.id);
        const guild       = message.channel.guild;
        this.addExp(guild, target, store, members);

        if (!target) {
            members.push({ "id": message.author.id, "experience": 0, "level": 0 });
            return await store.cache().update({ "levelSystem.members": members });
        }
    }
    async addExp(guild, target, store, members) {

        /**
         * @guildMember -> The member in the API context;
         * @target -> The member in @PolarisStore context;
         * @Generated -> Random number between 15-25 generated;
         * @newEXP -> Member previous exp count + @Generated ;
         * @members -> @Array instance of @PolarisStore server's context;
         * @memberIndex -> Member's position at @PolarisStore server's specific @members
         */
        
        const guildMember = guild.members.get(target.id);

        if(moment().diff(guildMember.cooldown || 0) < 0) return false;

        const Generated   = randomize(15, 25);
        const newEXP      = target.experience + Generated;
        const memberIndex = members.findIndex(member => member.id === target.id);

        members[memberIndex].experience = newEXP;
        this.calculateLevel(members[memberIndex].experience);
        store.cache().update({ "levelSystem.members": members });
        store.cache().save().then((saved) => {
            const time = randomize(60, 180)
         //   guildMember.cooldown = moment().add(time, 'seconds');
            
            this._client.logger.info(chalk.yellow(`[LEVEL]: ${chalk.white(guildMember.user.tag)} earned ${Generated + "exp"} on "${chalk.green.bold(guildMember.guild.name)}" // ${chalk.red.bold("Cooldown: ") + chalk.green(time+"s")}`));
        })
    }
    async getNeeded(level) {
        return 5 * (Math.pow(level, 2)) + 60 * level + 100;
    }
    async calculateLevel(experience) {
        let level = 0;
        while(experience >= await this.getNeeded(level)) {
            experience -= await this.getNeeded(level);
            level++;
        }
        return level;
    }
}