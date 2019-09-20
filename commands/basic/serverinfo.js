const Command = include("src/structures/Command");
const moment = require('moment');

class ServerInfo extends Command {
  constructor(...args) {
    super(...args, {
      name: 'serverinfo',
      group: 'basic',
      aliases: ['server', 'sv'],
      options: { guildOnly: true, localeKey: 'commands' },
      cooldown: 5
    });
  }

  handle({ client, msg }, responder) {
    const embed = new client.embed
    const guild = msg.channel.guild;
    return responder.embed(
      embed
        .author(guild.name, guild.iconURL)
        .field(responder.t('{{server.owner}}'), `<@${guild.ownerID}>`, true)
        .field(responder.t('{{server.ownerID}}'), `\`\`\`${guild.ownerID}\`\`\``, true)
        .field(responder.t('{{server.createDate}}'), `\`\`\`${moment(guild.createdAt).format("LL")}\`\`\``, true)
        .field(responder.t('{{server.channelVoice}}'), responder.t("{{server.channelVoiceSize}}", {
          channels: guild.channels.filter((c) => c.type === 2).length
        }), true)
        .field(responder.t('{{server.channelText}}'), responder.t("{{server.channelTextSize}}", {
          channels: guild.channels.filter((c) => c.type === 0).length
        }), true)
        .field(responder.t('{{server.createTime}}'), responder.t("{{server.days}}", { days: moment().diff(guild.createdAt, "days") }), true)
        .field(responder.t('{{server.id}}'), `\`\`\`${guild.id}\`\`\``, true)
        .field(responder.t('{{server.locale}}'), `\`\`\`${guild.region}\`\`\``, true)
        .field(responder.t('{{server.botAddDate}}'), `\`\`\`${moment(guild.joinedAt).format("LL")}\`\`\``, true)
        .field(responder.t('{{server.botAddTime}}'), responder.t("{{server.days}}", { days: moment().diff(guild.joinedAt, "days") }), true)
        .field(responder.t('{{server.members}}'), responder.t("{{server.membersSize}}", { members: guild.memberCount }), true)
        .field(responder.t('{{server.roles}}'), responder.t('{{server.rolesSize}}', { roles: guild.roles.size }), true)
        .field(responder.t('{{server.peoples}}'), responder.t('{{server.peoplesSize}}', { peoples: msg.guild.members.filter((m) => !m.bot).length }), true)
        .field(responder.t('{{server.bots}}'), `\`\`\`${msg.guild.members.filter((m) => m.bot).length} bots\`\`\``, true)
        .thumbnail(`${guild.iconURL}?size=2048`)
        .color(0x00ff00)
    ).send().catch(this.logger.error);
  }
}

module.exports = ServerInfo;