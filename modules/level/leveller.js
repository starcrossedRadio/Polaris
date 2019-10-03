const Module = include("src/structures/Module");
const moment = require("moment");
const { randomize } = include("src/util/Utils.js");

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
         */
        
        const members     = store.levelSystem.members;
        const target      = members.find(m => m.id === message.author.id);
        const guildMember = message.channel.guild.members.get(message.author.id);
 
        this.addExp(target, store, guildMember);

        if (!target) {
            members.push({ "id": message.author.id, "experience": 0, "level": 0 });
            await store.update({ "levelSystem.members": members });
            return store.save();
        }
    }
    async addExp(target, store, guildMember) {
        if(moment().diff(guildMember.cooldown || 0) < 0) return false;
        const Generated = randomize(1, 25);
        const newEXP = target.experience + Generated;

       // guildMember.cooldown = moment().add(60, 180, "seconds");
        

    }
    async getNeeded(level) {
        return 5 * (Math.pow(level, 2)) + 60 * level + 100;
    }
}