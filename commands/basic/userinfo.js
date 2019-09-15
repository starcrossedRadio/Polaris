const Command = include("src/structures/Command");
const moment = require('moment');

class UserInfo extends Command {
  constructor(...args) {
    super(...args, {
      name: 'userinfo',
      group: 'basic',
      aliases: ['user'],
      cooldown: 5,
      options: { guildOnly: true },
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
        .title('User Information')
        .description(`${user.username}#${user.discriminator}`)
        .color(0x00ff00)
        .thumbnail(user.user.dynamicAvatarURL())
        .field('Nickname', `${user.nick !== null ? user.nick : 'None'}`, true)
        .field('ID', `${user.id}`, true)
        .field('Status', `${user.status}`, true)
        .field('Game Playing', `${user.game !== null ? user.game.name : 'None'}`, true)
        .field('Joined Server At', `${moment(user.joinedAt).format('MMMM Do YYYY')} at ${moment(user.joinedAt).format('h:mm a')}`, true)
        .field('Created Discord Account', `${moment(user.createdAt).format('MMMM Do YYYY')} at ${moment(user.createdAt).format('h:mm a')}`, true)
        .field(`Roles [${user.roles.length}]`, `${user.roles.map(roleid => msg.channel.guild.roles.get(roleid).name).join(', ') || 'None'}`, false)
        .timestamp()
    ).send().catch(this.logger.error);
  }
}

module.exports = UserInfo;