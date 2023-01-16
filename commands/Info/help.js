const moment = require('moment');

module.exports = {
    name: 'help',
    category: 'Info',
    description: 'Display some helpful information',
    userPerms: ['none'],
    basePerms: ['none'],

    run: async(client, interaction) => {

         const base = new client.Gateway.MessageEmbed()
          .setTitle('NARC - Help')
          .setColor(client.color)
          .setThumbnail(client.logo)
          .setDescription(`Here is a list of available slash commands!`)
          .addFields(
            {
                name: 'help',
                value: 'Display this help message',
                inline: true
            },
            {
                name: 'about',
                value: 'Display some information about the bot!',
                inline: true
            }
          )
          .setTimestamp()
          .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

         const admins = new client.Gateway.MessageEmbed()
          .setTitle('NARC - Admin Help')
          .setColor(client.color)
          .setThumbnail(client.logo)
          .setDescription(`Here is a list of available slash commands including those for admins only!`)
          .addFields(
            {
                name: 'help',
                value: 'Display this help message',
                inline: true
            },
            {
                name: 'about',
                value: 'Display some information about the bot!',
                inline: true
            },
            {
                name: 'eval',
                value: 'Evaluate some javascript code',
                inline: true
            },
            {
                name: 'staff',
                value: 'Add or remove a staff member',
                inline: true
            }
          )
          .setTimestamp()
          .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

        if (client.config.Admins.includes(interaction.user.id)) {

            return interaction.reply({ embeds: [admins], ephemeral: true })

        } else {

          return interaction.reply({ embeds: [base] });

        }
    }
}