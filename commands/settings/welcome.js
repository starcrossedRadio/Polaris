const Command = include("src/structures/Command");

module.exports = class Avatar extends Command {
    constructor(...args) {
        super(...args, {
            name: "welcome",
            aliases: [],
            options: { localeKey: "commands" },
        })
    }
    async handle(container, responder) {
        responder.selection(['set', 'get', 'enable', 'disable'], {
            title: "{{welcome.configTitle}}",
            mapFunc: ch => responder.t(`{{welcome.${ch}}}`)
        }).then(arg => arg.length ? this[arg[0]](container, responder) : false)
    }
    async get({msg, store}, responder) {
      if (!store.inframodules.welcome) {
        responder.error(responder.t("{{welcome.rejectMessageRequest}}"));
        return 0;
      } else {
        responder.format("emoji:info").send(store.inframodules.welcome.message);
      }
    }
    async set ({ msg, args, store, client }, responder) {
        responder.selection(["edit", "delete"], {
            title: "{{welcome.configure.title}}",
            mapFunc: ch => responder.t(`{{welcome.configure.${ch}}}`)
        }).then(arg => arg.length ? this[arg[0]]({ msg, args, store, client}, responder) : false);
      }
    async edit ({ msg, args, store, client }, responder) {
      responder.format("emoji:info").dialog([{ prompt:responder.t("{{welcome.configure.edit_prompt.typerequest}}", { user: msg.author.id }), input: {type: "string", name: "message"}}]).then(args => {
       const message = args.message;
        if(message.length < 15) {
          responder.error(responder.t("{{welcome.configure.edit_prompt.lessThan}}"));
          return 0;
        }
        if(message.length > 1500) {
          responder.error(responder.t("{{welcome.configure.edit_prompt.higherThan}}"));
          return 0;
        }
       if(!store.inframodules.welcome) {
         store.cache().update({ "inframodules.welcome": { "channel": msg.channel.id, "message": message  }  });
         store.cache().save().then(() => {
           responder.success(responder.t("{{welcome.configure.edit_prompt.success}}"));
           return 1;
         })
       } else {
         store.cache().update({ "inframodules.welcome": { "message": message  }  });
         store.cache().save().then(() => {
           responder.success(responder.t("{{welcome.configure.edit_prompt.success}}"));
           return 1;
         })
       }
      })
    }
    async delete({store}, responder) {
      const inframodules = store.inframodules;
      if (!inframodules.welcome) {
        responder.error(responder.t("{{welcome.delete.reject}}"));
        return 0;
      }
      delete inframodules.welcome;
      store.update({ "inframodules": inframodules });
      store.cache().save().then(() => {
        store.save();
        responder.success(responder.t("{{welcome.delete.success}}"));
        return 1;
      })
    }
}
