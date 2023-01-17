const moment = require('moment');

module.exports = {
    name: 'help',
    category: 'Info',
    description: 'Display some helpful information',
    userPerms: ['none'],
    basePerms: ['none'],

    run: async(client, message, interaction) => {

         const base = new client.Gateway.MessageEmbed()
          .setTitle('NARC - Help/Commands')
          .setColor(client.color)
          .setThumbnail(client.logo)
          .setDescription(`**Please select a Command Category**`)
          .setTimestamp()
          .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

         const nope = new client.Gateway.MessageEmbed()
          .setTitle('NARC - Access Denied')
          .setColor(client.color)
          .setThumbnail(client.logo)
          .setDescription(`**You do not have permission to view this Category**`)
          .setTimestamp()
          .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

         const admin = new client.Gateway.MessageEmbed()
          .setTitle('NARC - Admin Commands')
          .setColor(client.color)
          .setThumbnail(client.logo)
          .addFields(
            {
                name: 'eval',
                value: 'Evaluate some javascript code!',
                inline: true
            },
            {
                name: 'staff',
                value: 'Add or Remove a Staff Member from the Database',
                inline: true
            }
          )
          .setTimestamp()
          .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

          const info = new client.Gateway.MessageEmbed()
          .setTitle('NARC - Info Commands')
          .setColor(client.color)
          .setThumbnail(client.logo)
          .addFields(
            {
                name: 'about',
                value: 'Display some information about the bot',
                inline: true
            },
            {
                name: 'help',
                value: 'Display this help message',
                inline: true
            },
            {
                name: 'whois',
                value: 'Detailed information about a specified user',
                inline: true
            }
          )
          .setTimestamp()
          .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

         const fivem = new client.Gateway.MessageEmbed()
          .setTitle('NARC - FiveM Commands')
          .setColor(client.color)
          .setThumbnail(client.logo)
          .addFields(
            {
                name: 'sync',
                value: 'Sync or Set the FiveM Server Info',
                inline: true
            },
            {
                name: 'stats',
                value: 'View our FiveM Server Statistics',
                inline: true
            }
          )
          .setTimestamp()
          .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})


          const components = (state) => [
            new client.Gateway.MessageActionRow().addComponents(
                new client.Gateway.MessageSelectMenu()
                 .setCustomId('help-menu')
                 .setPlaceholder('Please Select a Category')
                 .setDisabled(state)
                 .addOptions([
                    {
                        label: 'Admin',
                        value: 'admin',
                        description: 'View all the Admin Commands!',
                        emoji: '🛡️'
                    },
                    {
                        label: 'FiveM',
                        value: 'fivem',
                        description: 'View all the FiveM Commands',
                        emoji: '⚙'
                    },
                    {
                        label: 'Info',
                        value: 'info',
                        description: 'View all the Info Commands',
                        emoji: 'ℹ️'
                    }
                 ])
            ),
          ];

          const initialMessage = await message.reply({ embeds: [base], components: components(false) });

          const collector = message.channel.createMessageComponentCollector(
            {
                componentType: "SELECT_MENU",
                idle: 300000,
                dispose: true
            });


        collector.on('collect', (interaction) =>  {

            if (interaction.values[0] === 'admin') {

                if (client.config.Admins.includes(interaction.user.id || message.author.id)) {

                    interaction.update({ embeds: [admin], ephemeral: true, components: components(false) }).catch((e) => {});
                } else {

                    interaction.update({ embeds: [nope], components: components(false) }).catch((e) => {});
                }
            
            } else if (interaction.values[0] === 'info') {

                interaction.update({ embeds: [info], components: components(false) }).catch((e) => {});
            
            } else if (interaction.values[0] === 'fivem') {

                interaction.update({ embeds: [fivem], components: components(false) }).catch((e) => {});
            }
        });

        collector.on('end', (collected, reason) => {

            if (reason == 'time') {

                initialMessage.edit({
                    content: 'Collector Destroyed, Try again!',
                    components: []
                });
            }
        });
    }
}