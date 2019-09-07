const Command = require("../../src/structures/Command");

module.exports = class Avatar extends Command {
    constructor(...args) {
        super(...args, {
            name: "prefix",
            aliases: ["setprefix"],
            options: { localeKey: "commands" },
            usage: [{ name: 'prefix', type: 'string', max: 3, min: 1, optional: false }]
        })
    }
    async handle({ msg, args, store, client }, responder) {

        if (args.prefix === store.settings.prefix) return responder.error(responder.t("{{same_prefix}}", store.settings.lang, { user: msg.author.mention }));
        store.update({ "settings.prefix": args.prefix });
        await store.save().then(() => {
            return responder.send(responder.t("{{set_prefix}}", store.settings.locale, { prefix: args.prefix }));
        })
    }
}