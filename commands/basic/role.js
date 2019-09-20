const Command = include("src/structures/Command");

module.exports = class Avatar extends Command {
    constructor(...args) {
        super(...args, {
            name: 'roleAll',
            aliases: ['ra'],
            group: 'basic',
            usage: [{
                name: 'member',
                displayName: 'id/menção/username',
                type: 'member',
                optional: true
            },
            {
                name: 'roles',
                displayName: 'id/menção',
                type: 'role',
                optional: false
            }],
            options: { guildOnly: true, localeKey: 'commands', botPerms: ['manageRoles'] },
            cooldown: 5
        })
    }
    async handle({ msg, rawArgs, args, store, client }, responder) {
        let user = args.member ? args.member[0].id : msg.member.user.id
        user = msg.channel.guild.members.get(user)
        let addRoles = []
        let haveRoles = []
        for (let role of rawArgs.slice(1, 30)) {
            const roleCheck = /^<@&(\d{17,18})>$/.test(role) || /^(\d{17,18})$/.test(role)
            if (!roleCheck) continue
            let roleID = role.replace(/<@&+|[\D]+|>/g, '')
            console.log(user.hasRole(roleID))
            if (!user.hasRole(roleID)) {
                msg.guild.addMemberRole(user.id, roleID, "Role All").catch(() => { })
                addRoles.push(`<@&${roleID}>`)
            } else haveRoles.push(`<@&${roleID}>`)
        }
        addRoles.length != 0 ? responder.send(responder.t("{{role.acceptAll}}", {
            rolers: addRoles
        })) : null
        haveRoles.length != 0 ? responder.send(responder.t("{{role.haveRole}}", {
            rolers: haveRoles
        })) : null
    }
}