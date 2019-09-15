const Command = include("src/structures/Command");

module.exports = class Avatar extends Command {
    constructor(...args) {
        super(...args, {
            name: "ping",
            aliases: [],
            options: { localeKey: "commands" },
        })
    }
    async handle({ msg, args, store, client }, responder) {
        return responder.reply(`${msg.channel.guild.shard.latency} ms`)
    }
}