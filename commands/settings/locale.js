const Command = include("src/structures/Command");

module.exports = class Avatar extends Command {
    constructor(...args) {
        super(...args, {
            name: "locale",
            aliases: ["language"],
            options: { localeKey: "commands" },
            subcommands: {
                list: { aliases: ["choices"] }
            }
        })
        this.listIdiom = ['pt-BR', 'en-US']
    }
    async handle({ msg, args, store, client }, responder) {
        const lang = await responder.selection(this.listIdiom, { mapFunc: c => c })
        console.log(lang.length)
        if (!lang.length) return 0
        store.update({ "settings.locale": lang[0] });
        await store.save()
        return responder.send(responder.t("{{set_lang}}", { user: msg.author.id }));
    }
    async list({ msg, args, store, client }, responder) {
        return responder.send(responder.t('{{language_list}}', {
            locales: this.listIdiom.map(r => `\n${r}`).join(""),
            user: msg.author.id
        }))
    }
}