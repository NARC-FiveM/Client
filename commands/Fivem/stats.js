const moment = require('moment');
const FiveMData = require('@Database/models/fivem')
const FiveMAPI = require('@Handlers/fivem');

module.exports = {
    name: 'stats',
    category: 'Info',
    description: 'View our FiveM Server Stats',
    userPerms: ['none'],
    basePerms: ['none'],

    run: async(client, interaction) => {

        let players;

        let fivem_server = await FiveMData.findOne({ guild: interaction.guild.id });

        if (!fivem_server) return interaction.reply('Woah chief, please run the sync command first!');

        FiveMAPI.getServerInfo(fivem_server.ip).then(server => {

            let result = [];
            let index = 1;

            for (let player of server.players) {

                result.push(`${index++}. Username: ${player.name} | ID: ${player.id} | Ping: ${player.ping}ms\n`);
            }

            if (result < 1) result = 'No players online!';

            if (result === 'undefined') result = '0';

            let embed = new client.Gateway.MessageEmbed()
             .setAuthor({ name: `${server.infos.vars.sv_projectName}`, iconURL: `${client.logo}`})
             .setColor(client.color)
             .setThumbnail(client.logo)
             .setDescription(`${server.infos.vars.sv_projectDesc}`)
             .addFields(
                {
                    name: 'One Sync',
                    value: `${server.infos.vars.onesync_enabled}`,
                    inline: true
                },
                {
                    name: 'Game Build',
                    value: `${server.infos.vars.sv_enforceGameBuild}`,
                    inline: true
                },
                {
                    name: 'Scipthook Support',
                    value: `${server.infos.vars.sv_scriptHookAllowed}`,
                    inline: true
                },
                {
                    name: 'Primary Language',
                    value: `${server.infos.vars.locale}`,
                    inline: true
                },
                {
                    name: 'Server Tags',
                    value: `${server.infos.vars.tags}`,
                    inline: true
                },
                {
                    name: 'Player Count',
                    value: `${server.players.length}/${server.infos.vars.sv_maxClients}`,
                    inline: true
                },
                {
                    name: 'Player List',
                    value: `${result}`,
                    inline: true
                }
             )
             .setTimestamp()
             .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

             return interaction.reply({ embeds: [embed] });

        }).catch(error => {

            if (error.message === "players is not defined") {

                let players;

                players = '0'; 

                let embed2 = new client.Gateway.MessageEmbed()
                 .setAuthor({ name: `${server.infos.vars.sv_projectName}`, iconURL: `${client.logo}`})
                 .setColor(client.color)
                 .setThumbnail(client.logo)
                 .setDescription(`${server.infos.vars.sv_projectDesc}`)
                 .addFields(
                    {
                        name: 'One Sync',
                        value: `${server.infos.onesync_enabled}`,
                        inline: true
                    },
                    {
                        name: 'Game Build',
                        value: `${server.infos.vars.enforceGameBuild}`,
                        inline: true
                    },
                    {
                        name: 'Scipthook Support',
                        value: `${server.infos.vars.sv_scriptHookAllowed}`,
                        inline: true
                    },
                    {
                        name: 'Primary Language',
                        value: `${server.infos.vars.locale}`,
                        inline: true
                    },
                    {
                        name: 'Server Tags',
                        value: `${server.infos.vars.tags}`,
                        inline: true
                    },
                    {
                        name: 'Player Count',
                        value: `${server.players.length}/${server.infos.vars.sv_maxClients}`,
                        inline: true
                    },
                    {
                        name: 'Player List',
                        value: `No players online!`,
                        inline: true
                    }
                )
                .setTimestamp()
                .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

                return interaction.reply({ embeds: [embed2]})

            } else {

                let embed3 = new client.Gateway.MessageEmbed()
                 .setAuthor({ name: `Error: Invalid response`, iconURL: `${client.logo}`})
                 .setColor(client.color)
                 .setThumbnail(client.logo)
                 .setDescription('Whoops, seems like an error has occurred!')
                 .addFields(
                    {
                        name: 'Response',
                        value: `\`\`\`${error.message}\`\`\``,
                        inline: true
                    }
                 )
                 .setTimestamp()
                 .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

                 return interaction.reply({ embeds: [embed3]})

            }
        });
    }
}