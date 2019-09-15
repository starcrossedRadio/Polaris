const Command = include("src/structures/Command");
const moment = require('moment');

class ServerInfo extends Command {
  constructor(...args) {
    super(...args, {
      name: 'serverinfo',
      group: 'basic',
      aliases: ['server'],
      cooldown: 5,
      options: { guildOnly: true }
    });
  }

  handle({ client, msg }, responder) {
    const embed = new client.embed
    const guild = msg.channel.guild;
    const qtdPeople = msg.guild.members.filter(m => !m.bot).length
    const qtdBots = msg.guild.members.filter(m => m.bot).length
    return responder.embed(
      embed
      .author(guild.name, guild.iconURL)
      .field("Chefe do Servidor", `<@${guild.ownerID}>`, true)
      .field("ID do Dono", `\`\`\`${guild.ownerID}\`\`\``, true)
      //.addField(":date: Servidor criado em", `**${moment(guild.createdAt).format("LL")}**`, true)
      .field("🎤 Canais de Voz:", `\`\`\`${guild.channels.filter(c => c.type === "voice").size} canais de voz\`\`\``, true)
      .field("📋 Canais de texto:", ` \`\`\`${guild.channels.filter(c => c.type === "text").size} canais de texto\`\`\``, true)
      .field("⏰ Servidor criado há", `**\`\`\`${moment().diff(guild.createdAt, "days")} Dias\`\`\`**`, true)
      .field("🔰 ID do servidor", `\`\`\`${guild.id}\`\`\``, true)
      .field(`⚽ Região`, `\`\`\`${guild.region}\`\`\``, true)
      //.field("📥 Bot adicionado em", `**${moment(guild.me.joinedAt).format("LL")}**`, true)
      .field("📥 Bot adicionado há", `**\`\`\`${moment().diff(guild.joinedAt, "days")} Dias\`\`\`**`, true)
      .field(`🎎 Total de Membros`, `\`\`\`${guild.memberCount} membros no servidor\`\`\``, true)
      .field("📌 Total de Cargos:", `\`\`\`${guild.roles.size} roles\`\`\``, true)
      .field("🏣 Total de Pessoas:", `\`\`\`👥 ${qtdPeople} usuários\`\`\``, true)
      .field("👾 Total de Bots:", `\`\`\`${qtdBots} bots\`\`\``, true)
      .thumbnail(`${guild.iconURL}?size=2048`)
      .color(0x00ff00)
    ).send().catch(this.logger.error);
  }
}

module.exports = ServerInfo;