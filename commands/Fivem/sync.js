const moment = require('moment');
const fivem_server = require('@Database/models/fivem')

module.exports = {
    name: 'sync',
    category: 'Info',
    description: 'Sync the FiveM Server Information',
    userPerms: ['BOT_ADMIN'],
    basePerms: ['none'],
    options: [
        {
            name: 'ip',
            description: 'FiveM Server IP',
            type: 'STRING',
            required: true
        },
        {
            name: 'name',
            description: 'FiveM Server Name',
            type: 'STRING',
            required: true
        },
        {
            name: 'password',
            description: 'FiveM Server Password',
            type: 'STRING',
            required: true
        }
    ],

    run: async(client, interaction) => {

        let server_ip = await interaction.options.getString("ip");
        let server_password = await interaction.options.getString("password")
        let server_name = await interaction.options.getString("name");

        let server = await fivem_server.findOne({ guild: interaction.guild.id });

        if (server) {

            let exist = new client.Gateway.MessageEmbed()
             .setTitle('[Sync]: Failed!')
             .setColor(client.color)
             .setThumbnail(client.logo)
             .setDescription('Failed to sync the FiveM Server Info. This means the info already exists and has not changed!')
             .setTimestamp()
             .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

             return interaction.reply({ embeds: [exist] });

        } else if (!server) {

            await fivem_server.create({
                guild: interaction.guild.id,
                ip: server_ip,
                name: server_name,
                password: server_password
            });

            let success = new client.Gateway.MessageEmbed()
             .setTitle('[Sync]: Success!')
             .setColor(client.color)
             .setThumbnail(client.logo)
             .setDescription('Updated/Added the FiveM Server Info.')
             .addFields(
                {
                    name: 'Name',
                    value: `${server_name}`,
                    inline: true
                },
             )
             .setTimestamp()
             .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

             return interaction.reply({ embed: [success] })

        }
    }
}