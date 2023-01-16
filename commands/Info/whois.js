const moment = require('moment');

module.exports = {
    name: 'whois',
    category: 'Info',
    description: 'Information about the specified user!',
    userPerms: ['none'],
    basePerms: ['none'],
    options: [
        {
            name: 'user',
            description: 'The user to fetch information for!',
            type: 6,
            required: true
        }
    ],

    run: async(client, interaction) => {

        let member = interaction.options.getMember("user");

        const flags = {
            DISCORD_EMPLOYEE: "Discord Employee",
            DISCORD_PARTNER: "Discord Partner",
            BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
            BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
            HYPESQUAD_EVENTS: "HypeSquad Events",
            HOUSE_BRAVERY: "House of Bravery",
            HOUSE_BRILLIANCE: "House of Brilliance",
            HOUSE_BALANCE: "House of Balance",
            EARLY_SUPPORTER: "Early Supporter",
            TEAM_USER: "Team User",
            SYSTEM: "System",
            VERIFIED_BOT: "Verified Bot",
            VERIFIED_DEVELOPER: "Verified Bot Developer",
            EARLY_VERIFIED_BOT_DEVELOPER: "Early Verified Bot Developer"
        };
        
        const userFlags = member.user.flags.toArray();

        let clientStatus;
        let custom;

        await interaction.guild.members.fetch(member.user.id).then(async user => {
   
        let stat = '⚪ Offline'
   
        if(user.presence?.status == 'online'){
            stat = '🟢 Online'
        }else if(user.presence?.status == 'dnd'){
            stat = '🔴 Do Not Disturb'
        }else if(user.presence?.status == 'idle'){
            stat = '🟡 Idle'
        }

        
        let roles =
        member.roles.cache.filter((r) => r.id !== interaction.guild.id).size > 0
        ? member.roles.cache
        .filter((r) => r.id !== interaction.guild.id)
        .map((x) => x)
        .join(" ")
        : "None";

        if (user.presence?.clientStatus) {
            if(user.presence?.clientStatus.desktop){
                clientStatus = "\n🖥️ Desktop"
             }
         
             if(user.presence?.clientStatus.web){
                clientStatus = "\n📟 Browser"
             }
         
             if(user.presence?.clientStatus.mobile){
                clientStatus = "\n📱 Phone"
             }
        }

        if (user.presence?.activities[0]) {
            custom = user.presence?.activities[0].state == null ? "No custom status" : user.presence?.activities[0].state;
        }

        if (member.user.bot) {

            let bot_embed = new client.Gateway.MessageEmbed()
             .setAuthor({ name: `❓ ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}` })
             .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
             .setColor(client.color)
             .addFields(
                {
                    name: 'Bot Account',
                    value: `${member.user.bot ? "True" : "False"}`,
                    inline: true
                },
                {
                    name: 'Username',
                    value: `${member.user.username}`,
                    inline: true
                },
                {
                    name: 'User ID',
                    value: `${member.user.id}`,
                    inline: true
                },
                {
                    name: 'Nickname',
                    value: `${member.nickname || "None"}`,
                    inline: true
                },
                {
                    name: 'Created On',
                    value: `${moment(member.user.createdAt).format("LLLL")}`,
                    inline: true
                },
                {
                    name: 'Joined On',
                    value: `${moment(member.user.joinedAt).format("LLLL")}`,
                    inline: true
                },
                {
                    name: 'Created',
                    value: `${moment(member.user.createdTimestamp).fromNow()}`,
                    inline: true
                },
                {
                    name: 'User Presence',
                    value: `${stat}`,
                    inline: true
                }
             )
             .setTimestamp()
             .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

             return interaction.reply({ embeds: [bot_embed] })


        } else {

            let user_embed = new client.Gateway.MessageEmbed()
             .setAuthor({ name: `❓ ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}` })
             .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
             .setColor(client.color)
             .addFields(
                {
                    name: 'Bot Account',
                    value: `${member.user.bot ? "True" : "False"}`,
                    inline: true
                },
                {
                    name: 'Username',
                    value: `${member.user.username}`,
                    inline: true
                },
                {
                    name: 'User ID',
                    value: `${member.user.id}`,
                    inline: true
                },
                {
                    name: 'Nickname',
                    value: `${member.nickname || "None"}`,
                    inline: true
                },
                {
                    name: 'Created On',
                    value: `${moment(member.user.createdAt).format("LLLL")}`,
                    inline: true
                },
                {
                    name: 'Joined On',
                    value: `${moment(member.user.joinedAt).format("LLLL")}`,
                    inline: true
                },
                {
                    name: 'Created',
                    value: `${moment(member.user.createdTimestamp).fromNow()}`,
                    inline: true
                },
                {
                    name: 'User Presence',
                    value: `${stat}`,
                    inline: true
                },
                {
                    name: 'Custom Status',
                    value: `${custom}`,
                    inline: true
                },
                {
                    name: 'Client Type',
                    value: `${clientStatus}`,
                    inline: true
                },
                {
                    name: 'Badges',
                    value: `${userFlags.length ? userFlags.map((flag) => flags[flag]).join(", "): "None"}`,
                    inline: true
                },
                {
                    name: 'Roles',
                    value: `${roles}`,
                    inline: true
                }
             )
             .setTimestamp()
             .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

             return interaction.reply({ embeds: [user_embed] })

        }
    })
   }
}