const moment = require('moment');

module.exports = {
    name: 'about',
    category: 'Info',
    description: 'About NARC',
    userPerms: ['none'],
    basePerms: ['none'],

    run: async(client, interaction) => {

        const row = new client.Gateway.MessageActionRow()
         .addComponents(
            new client.Gateway.MessageButton()
             .setLabel('Website')
             .setStyle('LINK')
             .setURL('https://narc.live'),
            new client.Gateway.MessageButton()
             .setLabel('Support')
             .setStyle('LINK')
             .setURL('https://narc.live/join'),
            new client.Gateway.MessageButton()
             .setLabel('Twitter')
             .setStyle('LINK')
             .setURL('https://narc.live/twitter'),
            new client.Gateway.MessageButton()
             .setLabel('GitHub')
             .setStyle('LINK')
             .setURL('https://narc.live/github')
         )

         const embed = new client.Gateway.MessageEmbed()
          .setTitle('About NARC')
          .setColor(client.color)
          .setThumbnail(client.logo)
          .setDescription(`The Number One North America Based FiveM Community with a variety of features to keep you and all your friends entertained for days.`)
          .addFields(
            {
                name: 'Creator',
                value: '[Toxic Dev#5936](https://github.com/TheRealToxicDev)',
                inline: true
            },
            {
                name: 'Created',
                value: `${moment(client.user.createdAt).format("MM/DD/YYYY HH:mm:ss A")}`,
                inline: true
            },
            {
                name: 'Ping',
                value: `${client.ws.ping}ms`,
                inline: true
            },
            {
                name: 'Guilds',
                value: `${client.guilds.cache.size}`,
                inline: true
            },
            {
                name: 'Users',
                value: `${client.users.cache.size}`,
                inline: true
            },
            {
                name: 'Channels',
                value: `${client.channels.cache.size}`,
                inline: true
            }
          )
          .setTimestamp()
          .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

          return interaction.reply({ embeds: [embed], components: [row] });
    }
}