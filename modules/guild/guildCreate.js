const Module = require("../../src/structures/Module");

module.exports = class Ready extends Module {
    constructor(...args) {
        super(...args, {
            name: "guild:create",
            events: { guildCreate: "newGuild", guildDelete: "delGuild" }
        })
    }
    async init() {
        this.data = await this._client.plugins.get("db").models;
    }
    async newGuild(guild) {
        this.data.guilds.create({ id: guild.id, name: guild.name }).then(() => {
            this._client.logger.info(`Joined "${guild.name}" (${guild.id})`);
            guild.members.forEach(m => {
                const fetched = this.data.users.findByPk(m.user.id);
                if (fetched) return;
                else {
                    this.data.users.create({
                        id: m.user.id,
                        name: m.user.name
                    })
                }
            })
        })
    }
    delGuild(guild) {
        this.data.guilds.findByPk(guild.id).then(async guild => {
            this._client.logger.info(`Left from: "${guild.name}".`);
            await guild.destroy();
        })
    }
}