const Command = include("src/structures/Command");
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const watsonApiKey = include('credentials/watson-lt.json').apikey
const languageTranslator = new LanguageTranslatorV3({
  iam_apikey: watsonApiKey,
  url: 'https://gateway.watsonplatform.net/language-translator/api',
  version: '2018-05-01',
});
module.exports = class UserInfo extends Command {
  constructor(...args) {
    super(...args, {
      name: 'translator',
      aliases: ['tl'],
      group: 'search',
      usage: [{ name: 'tl', displayName: 'text', type: 'string', optional: false, last: true},
              { name: "source", displayName: ' '}],
      options: { guildOnly: true, localeKey: 'commands' },
      cooldown: 5
    });
  }

  handle({ args, client, msg }, responder) {
    msg.delete()
    languageTranslator.translate(
      {
        text: args.tl,
        source: 'pt',
        target: 'en'
      })
      .then(translation => {
        const translator = translation.translations[0].translation
        responder.send(translator)
      })
      .catch(err => {
        client.logger.error(err);
      });
  }
}

