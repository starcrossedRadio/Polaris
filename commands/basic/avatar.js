const Command = include("src/structures/Command");

module.exports = class Avatar extends Command {
    constructor(...args) {
        super(...args, {
            name: 'avatar',
            aliases: ['pfp'],
            group: 'basic',
            usage: [{
                name: 'member',
                displayName: 'id/mention/username',
                type: 'member',
                optional: true
            }],
            options: { guildOnly: true, localeKey: 'commands' },
            cooldown: 5
        })
    }
    async handle({ msg, args, client }, responder) {

        let user = args.member ?
            msg.channel.guild.members.get(args.member[0].id).user :
            msg.channel.guild.members.get(msg.member.user.id).user;

        const embed = new client.embed
        embed
            .title(`${user.username}'s Avatar!`)
            .description(responder.t("{{download_avatar}}", { url: user.dynamicAvatarURL(null, 512) }))
            .color(11220318)
            .image(user.dynamicAvatarURL(null, 512))
            .footer(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
            .timestamp()

        responder.embed(embed).send()
    }
}