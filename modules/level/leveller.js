const Module = include("src/structures/Module");

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
        
        const members = store.levelSystem.members;
        const member  = members.find(m => m.id === message.author.id);

        

        if (!member) {
            members.push({ "id": message.author.id, "experience": 0, "level": 0, "" });
            await store.update({ "levelSystem.members": members });
            return store.save();
        }
    }
    async addExp(target, store) {
        
    }
    async getNeeded(level) {
        return 3.5 * (Math.pow(level, 2)) + 60 * level + 100;
    }
}