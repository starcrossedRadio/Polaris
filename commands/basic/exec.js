const { exec } = require('child_process')
const Command = include("src/structures/Command");

module.exports = class Exec extends Command {
  constructor (...args) {
    super(...args, {
      name: 'exec',
      description: 'Executes a shell command',
      options: { adminOnly: true },
      group: 'admin',
      usage: [
        { name: 'exec', type: 'string', optional: false, last: true }
      ]
    })
  }

  exec (command) {
    return new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        if (err) return reject(err)
        return resolve(stdout || stderr)
      })
    })
  }

  async handle ({ args }, responder) {
    const cmd = args.exec
    let result
    try {
      result = await this.exec(cmd)
    } catch (err) {
      result = err
    }
    responder.format('code:js').send(result || 'No result')
  }
}