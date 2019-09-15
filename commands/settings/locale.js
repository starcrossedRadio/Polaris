const Command = include("src/structures/Command");

module.exports = class Avatar extends Command {
    constructor(...args) {
        super(...args, {
            name: "locale",
            aliases: ["language"],
            options: { localeKey: "commands" },
            subcommands: {
                list: { aliases: ["choices"]}
            }
        })
    }
    async handle({ msg, args, store, client }, responder) {
        responder.dialog(["abobora","ameixa"])

    }
    async list({msg, args, store, client}, responder) {
        console.log("sub comando")
    }
}