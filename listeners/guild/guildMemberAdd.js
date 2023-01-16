const Logger = require('artie-logger');

module.exports = {
    name: 'guildMemberAdd',

    async execute(member, client) {

        const guild = member.guild;

        let count = guild.memberCount.toString();
        let end = count[count.length - 1];
        let suffixed = end == 1 ? count : end == 2 ? count : end == 3 ? count : count;

        let system = await guild.channels.cache.find(c => c.id === '1064369957930012753');
        let rules = await guild.channels.cache.find(c => c.id === '1064369957930012754')

        let mem_role = await guild.roles.cache.get('1064369955077898282')
        let user_role = await guild.roles.cache.get('1064369955077898281')
        let bots_role = await guild.roles.cache.get('1064432916370833418')

        if (member.user.bot) {

            const botjoin = new client.Gateway.MessageEmbed()
              .setTitle(`System - Bot Joined`)
              .setDescription('A new bot has been added to the server!')
              .setColor(client.color)
              .setThumbnail(member.displayAvatarURL({ dynamic: true }))
              .addFields(
                {
                    name: 'Username',
                    value: `${member.user.username}`,
                    inline: true
                },
                {
                    name: 'User ID',
                    value: `${member.user.id}`,
                    inline: true
                }
             )
              .setTimestamp()
              .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

             await member.roles.add(bots_role);

             return system?.send({ embeds: [botjoin] });

        } else {

            const userjoin = new client.Gateway.MessageEmbed()
             .setTitle('System - User Joined')
             .setDescription('Welcome to the server. Please make sure you check out the channels listed below!')
             .setColor(client.color)
             .setThumbnail(member.displayAvatarURL({ dynamic: true }))
             .addFields(
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
                    name: 'Member Count',
                    value: `${suffixed}`,
                    inline: true
                },
                {
                    name: 'Our Rules',
                    value: `${rules}`,
                    inline: true
                }
             )
             .setTimestamp()
             .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

             await member.roles.add(mem_role)
             await member.roles.add(user_role)

             return system?.send({ embeds: [userjoin] })
        }
    }
}