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
    let msgs = responder.send('eae')
    console.log(responder.messageCollectionReaction('620426866955649034'))
  }
}