const Command = require("../../src/structures/Command");

module.exports = class Avatar extends Command {
    constructor(...args) {
        super(...args, {
            name: "role",
            aliases: [],
            options: { localeKey: "basic" },
        })
    }
    async handle({ msg, args, store, client }, responder) {
        
    }
}