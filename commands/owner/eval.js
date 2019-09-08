const Command = require("../../src/structures/Command");

module.exports = class Avatar extends Command {
  constructor(...args) {
    super(...args, {
      name: "eval",
      aliases: ["ev"],
      options: { localeKey: "commands", adminOnly: true },
    })
  }
  async handle({ msg, rawArgs, client }, responder) {
    let codeEval = rawArgs.join(' ')
    if (/token/gm.test(codeEval)) return responder.error('Vai tentar pegar o token da sua mãe')
    const m = await msg.channel.createMessage('Executando...')
    try {
      const beforeRunning = Date.now()
      let result = eval(codeEval)  //eslint-disable-line

      if (result instanceof Promise) {
        await result
      }

      if (typeof result !== 'string') result = require('util').inspect(result)
      result = result.replace(/token:([a-zA-Z0-9])/gm, "")
      const end = (Date.now() - beforeRunning)
      msg.channel.createMessage({
        embed: {
          title: 'Sucesso!', // Title of the embed
          description: `\`\`\`${result.slice(0, 2000)}\`\`\``,
          author: { // Author property
            name: msg.author.username,
            icon_url: msg.author.avatarURL
          },
          color: 0x0000ff, // Color, either in hex (show), or a base-10 integer
          fields: [ // Array of field objects
            {
              name: 'Tempo de execução', // Field title
              value: `${(end / 60).toFixed(5)}s`, // Field
              inline: true // Whether you want multiple fields in same line
            },
          ],
        }
      });
    } catch (e) {
      msg.channel.createMessage({
        embed: {
          title: 'Erro!', // Title of the embed
          description: `\`\`\`${e.stack}\`\`\``,
          author: { // Author property
            name: msg.author.username,
            icon_url: msg.author.avatarURL
          },
          color: 0x008000, // Color, either in hex (show), or a base-10 integer
        }
      });
    }
  }
}