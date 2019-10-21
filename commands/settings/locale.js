const Command = include("src/structures/Command");

module.exports = class Avatar extends Command {
    constructor(...args) {
        super(...args, {
            name: "locale",
            aliases: ["language"],
            options: { localeKey: "commands" },
        })
        this.listIdiom = ['pt-BR', 'en-US']
    }
    async handle({ msg, args, store, client }, responder) {
        const lang = await responder.selection(this.listIdiom, { mapFunc: c => c });
        if (!lang.length) return 0
       store.update({ "settings.locale": lang[0] });
        store.save()
            .then(r => {
                responder.settings.lang = lang[0];
                responder.send(responder.t("{{locale.set_lang}}", {
                    user: msg.author.id
                }))
            })
    }
}
