module.exports = {
  name: 'parseMessage',
  priority: 10,
  process: async container => {
      const { msg, client, commands } = container;

      const db = client.plugins.get("db").models;
      const store = await db.guilds.findByPk(msg.channel.guild.id);
      const prefix = store.settings.prefix;

      const rawArgs = msg.content.substring(prefix.length).split(' ');
      container.trigger = rawArgs[0].toLowerCase();
      container.isCommand = commands.has(container.trigger);
      container.rawArgs = rawArgs.slice(1).filter(v => v);
      container.store = store;
      return Promise.resolve(container);
  }
}