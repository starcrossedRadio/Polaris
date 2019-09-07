const Command = require("../../src/structures/Command");

module.exports = class Avatar extends Command {
  constructor(...args) {
    super(...args, {
      name: "eval",
      aliases: ["ev"],
      options: { localeKey: "commands" },
    })
  }
  async handle({ msg, args, store, client }, responder) {

    const embed = new MessageEmbed();
    const clean = text => typeof text == string ? text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)) : text;

    message.channel.send("Digite o código a ser evaluado.").then(async () => {
      const filter = m => m.author.id === message.author.id;
      message.channel.awaitMessages(filter, { max: 1, time: 120000, errors: ["time"] })
        .then(m => {

          const toEval = m.map(mess => mess.content)[0];
          let evaled = eval(toEval);

          embed
            .setTitle("Success! :D")
            .setColor("GREEN")
            .setDescription(`\`\`\`js ${evaled} \`\`\``)

          return message.channel.send(embed);

        })
        .catch(err => {

          embed
            .setTitle("Error! :C")
            .setColor("RED")
            .setDescription(`\`\`\`js
           ${err}\`\`\``)

          return message.channel.send(embed);

        })
    })
  }
}