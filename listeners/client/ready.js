const { DatabaseClient } = require('@Database/client');
const config = require('@Settings/config');

module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {

        await DatabaseClient({ connectionURL: config.mongo });

        await client.utils.setClientPresence(client);

        let embed = new client.Gateway.MessageEmbed()
         .setTitle('Startup Logs')
         .setColor(client.color)
         .setThumbnail(client.logo)
         .setDescription('Startup successful')
         .addFields( 
            {
                name: 'Channels',
                value: `${client.channels.cache.size}`,
                inline: true
            },
            {
                name: 'Users',
                value: `${client.users.cache.size}`,
                inline: true
            }

         )
         .setTimestamp()
         .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

        await client.channels.cache.get(client.config.logs).send({ embeds: [embed] });

        return client.logger.info(`${client.user.username} is online and ready!`);         
    }
}