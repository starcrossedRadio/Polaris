const Command = require("../../src/structures/Command");

module.exports = class Avatar extends Command {
  constructor(...args) {
    super(...args, {
      name: "teste",
      aliases: ["tt"],
      options: { localeKey: "commands", adminOnly: true },
    })
  }
  async handle({ msg, rawArgs, client }, responder) {
    let embed = new client.embed

    responder.embed(
      embed
        .author(msg.author.username, msg.author.dynamicAvatarURL(null, 512))
        .title('teste')
        .timestamp()
        .color(0x00ff00)
    ).send()
  }
}