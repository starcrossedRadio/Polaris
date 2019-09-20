const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const Command = include("src/structures/Command");
const watsonApi = include('credentials/watson-vr.json')
const fs = require('fs')
var visualRecognition = new VisualRecognitionV3({
  url: watsonApi.url,
  version: '2018-03-19',
  iam_apikey: watsonApi.apikey,
});

module.exports = class Image extends Command {
  constructor(...args) {
    super(...args, {
      name: "image",
      aliases: ["im"],
      options: { localeKey: "commands", adminOnly: true },
    })
  }
  async handle({ msg, rawArgs, client }, responder) {
    // const attachments = msg.attachments[0]
    const params = {
      images_file: fs.createReadStream('res/wendy.png')
    };

    visualRecognition.classify(params)
      .then(result => {
        console.log(JSON.stringify(result, null, 2));
      })
      .catch(err => {
        console.log(err);
      });
  }
}