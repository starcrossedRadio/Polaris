const Command = require("../../src/structures/Command");

module.exports = class Avatar extends Command {
    constructor(...args) {
        super(...args, {
            name: "ping",
            aliases: [],
            options: { localeKey: "commands" },
        })
    }
    async handle({ msg, args, store, client }, responder) {
        return responder.send(responder.t("{{setPrefix}}", store.settings.locale))
    }
}