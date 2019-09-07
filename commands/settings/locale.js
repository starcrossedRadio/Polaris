const Command = require("../../src/structures/Command");

module.exports = class Avatar extends Command {
    constructor(...args) {
        super(...args, {
            name: "locale",
            aliases: ["language"],
            options: { localeKey: "commands" },
            usage: [{ name: 'prefix', type: 'string', max: 3, min: 1, optional: false }],
            subcommands: {
                list: { aliases: ["choices"]}
            }
        })
    }
    async handle({ msg, args, store, client }, responder) {
        
    }
    async list({msg, args, store, client}, responder) {
        console.log(1)
    }
}