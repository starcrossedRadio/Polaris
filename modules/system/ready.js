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
    }
}