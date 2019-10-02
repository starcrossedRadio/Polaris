const Module = include("src/structures/Module");

module.exports = class Guild extends Module {
    constructor(...args) {
        super(...args, {
            name: "guild",
            events: {
                messageCreate: "context"
            }
        })
    }
    async init() {
        this.data  = await this._client.plugins.get("db").models;
    }
    async context(message) {
        const store = await this.data.guilds.cache().findByPk(message.channel.guild.id);
        /**
         * Checking if the member was in the DB. If not, create the default xp-card.
         */
        
        const members = store.levelSystem.members;
        const member  = members.find(m => m.id === message.author.id);

        if (!member) {
            members.push({ "id": message.author.id, "experience": 0, "level": 0, "needed": 163 });
            await store.update({ "levelSystem.members": members });
            return store.save();
        }

        console.log(member);

    }
    async addExp(target, store) {
        
    }
}