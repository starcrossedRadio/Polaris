const Module = require("../../src/structures/Module");

module.exports = class Ready extends Module {
    constructor(...args) {
        super(...args, {
            name: "system:ready",
            events: { ready: "connected" }
        })
    }
    connected() {
        this.logger.debug("I'm ready, sir!");

        /**
         * @GuildSetup
         * const db = this._client.plugins.get("db");
         * this._client.guilds.forEach(g => { 
         *   db.models.guilds.cache().create({ id: g.id, name: g.name });
         * })
            */
    }
}