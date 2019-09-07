const Command = require("../../src/structures/Command");

module.exports = class Avatar extends Command {
    constructor(...args) {
        super(...args, {
            name: "avatar",
            aliases: ["pfp"],
            options: { localeKey: "commands" },
            usage: [{ name: 'userID', type: 'string', optional: true }]
        })
    }
    async handle({ msg, args, store, client }, responder) {

        let user;

        if(msg.mentions.length) user = msg.mentions[0];
        else user = client.users.get(args.userID) || msg.author;

        responder.embed({
            title: `${user.username}'s Avatar!`,
            description: `**[${responder.t("{{download_avatar}}", store.settings.locale, { url: user.dynamicAvatarURL(null, 512) })}](${user.dynamicAvatarURL(null, 512)})**`,
            color: 11220318,
            image: { url: user.dynamicAvatarURL(null, 512) },
            footer: { icon_url: msg.author.avatarURL, text: msg.author.username + `#` + msg.author.discriminator }
        }).send()
    }
}