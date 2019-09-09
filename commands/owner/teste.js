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
    const reactionListener = new client.reaction.continuousReactionStream(
      msg,
      (userID) => userID === msg.author.id,
      false,
      { maxMatches: 100, time: 900000 }
    );

    reactionListener.on('reacted', (event) => {
      msg.channel.createMessage('You reacted with: ' + event.emoji.name);
    });
  }
}