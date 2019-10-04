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
        const guild       = message.channel.guild;
        this.addExp(guild, target, store, members);

        if (!target) {
            members.push({ "id": message.author.id, "experience": 0, "level": 0 });
            return await store.cache().update({ "levelSystem.members": members });
        }
    }
    async addExp(guild, target, store, members) {
        const guildMember = guild.members.get(target.id);

        if(moment().diff(guildMember.cooldown || 0) < 0) return false;

        const Generated   = randomize(15, 25);
        const newEXP      = target.experience + Generated;
        const memberIndex = members.findIndex(member => member.id === target.id);

        members[memberIndex].experience = newEXP;
        
        store.cache().update({ "levelSystem.members": members });
        store.cache().save().then(() => {
            guildMember.cooldown = moment().add(randomize(60, 180), 'seconds');
        })

        console.log(members[memberIndex].experience)
    }   
    async getNeeded(level) {
        return 5 * (Math.pow(level, 2)) + 60 * level + 100;
    }
    async getLevel(exp) {
        let level = 0;
        while (exp >= this.getNeeded(level)) {
            exp -= this.getNeeded(level);
            level++;
        }
        return level;
    }
}