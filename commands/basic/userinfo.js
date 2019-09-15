const Command = include("src/structures/Command");
const moment = require('moment');

class UserInfo extends Command {
  constructor(...args) {
    super(...args, {
      name: 'userinfo',
      aliases: ['user'],
      cooldown: 5,
      options: { guildOnly: true, localeKey: 'commands' },
      usage: [
        { name: 'member', displayName: 'member', type: 'string', optional: true, last: true }
      ]
    });
  }

  handle({ args, client, msg }, responder) {
    const member = args.member;

    let user;
    if (msg.mentions.length > 0) {
      user = msg.channel.guild.members.get(msg.mentions[0].id);
    } else if (member.length >= 17) {
      user = msg.channel.guild.members.get(member);
    } else {
      user = msg.channel.guild.members.get(msg.member.id);
    }
    const embed = new client.embed
    return responder.embed(
      embed
        .title(responder.t('{{whois.title}}'))
        .description(`${user.username}#${user.discriminator}`)
        .color(0x00ff00)
        .thumbnail(user.user.dynamicAvatarURL())
        .field('Nickname', `${user.nick !== null ? user.nick : 'None'}`, true)
        .field('ID', `${user.id}`, true)
        .field('Status', `${user.status}`, true)
        .field(responder.t('{{whois.gamming}}'), `${user.game !== null ? user.game.name : 'None'}`, true)
        .field(responder.t('{{whois.entry_server}}'), responder.t('{{whois.day_entry}}', {
          days: moment().diff(user.joinedAt, "days")
        }), true)
        .field(responder.t('{{whois.create_account}}'), responder.t('{{whois.day_entry}}', {
          days: moment().diff(user.createdAt, "days")
        }), true)
        .field(responder.t('{{whois.roles}}', { length: user.roles.length }),
          `${user.roles.map(roleid => `<@&${msg.channel.guild.roles.get(roleid).id}>`).join(', ') || 'None'}`, false)
        .timestamp()
    ).send().catch(this.logger.error)
  }
}


module.exports = UserInfo;