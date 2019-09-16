const Command = include("src/structures/Command");
const moment = require('moment');

class UserInfo extends Command {
  constructor(...args) {
    super(...args, {
      name: 'userinfo',
      aliases: ['user'],
      group: 'basic',
      usage: [{
        name: 'member',
        displayName: 'id/menção/username',
        type: 'member',
        optional: true
      }],
      options: { guildOnly: true, localeKey: 'commands' },
      cooldown: 5
    });
  }

  handle({ args, client, msg }, responder) {
    let user = args.member ? args.member[0].id : msg.member.user.id
    user = msg.channel.guild.members.get(user)
    const permission = Object.entries(user.permission.json).filter(r => r[1] === true)
    let clientStatus = user.clientStatus ? Object.entries(user.clientStatus).filter(s => s[1] !== "offline") : null

    const embed = new client.embed
    embed
      .title(responder.t('{{whois.title}}'))
      .description(`<@${user.id}>`)
      .color(user.color)
      .thumbnail(user.user.dynamicAvatarURL())
      .field('ID', `${user.id}`, true)
      .field('Status', responder.t(`{{whois.status.${user.status}}}`), true)
      .field(responder.t('{{whois.clientStatus}}'), `\`\`\`Markdown\n# ${clientStatus ? clientStatus.map(r => r[0]).join(" ") : "None"}\`\`\``, true)
      .field(responder.t('{{whois.gamming}}'), `\`\`\`Markdown\n# ${user.game ? user.game.name : 'none'}\`\`\``, true)
      .field(responder.t('{{whois.entry_server}}'), responder.t('{{whois.day_entry}}', {
        days: moment().diff(user.joinedAt, "days")
      }), true)
      .field(responder.t('{{whois.create_account}}'), responder.t('{{whois.day_entry}}', {
        days: moment().diff(user.createdAt, "days")
      }), true)
      .field(responder.t('{{whois.roles}}', { length: user.roles.length }),
        user.roles.map(roleid => `<@&${msg.channel.guild.roles.get(roleid).id}>`).join(', ') || 'None', true)
      .field('Bot', user.bot ? "``true``" : "``false``", true)
      .timestamp()

    if (user.nick) embed.field(responder.t('{{whois.nickname}}'), user.nick, true)

    embed.field(responder.t('{{whois.permissions}}', { length: permission.length }),
      `\`\`\`CSS\n${permission.map(r => r[0]).join(" | ")}\`\`\``, true)

    return responder.embed(embed).send().catch(this.logger.error)
  }
}


module.exports = UserInfo;