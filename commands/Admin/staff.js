const UserStorage = require("@Database/models/users");

module.exports = {
    name: 'staff',
    category: 'Admin',
    description: 'Add or Remove a member of the staff team',
    usage: '/add-staff',
    userPerms: ['BOT_ADMIN'],
    basePerms: ['none'],
    options: [
        {
            name: 'options',
            description: 'Should be one of [add] or [rem]',
            type: 'STRING',
            required: true
        },
        {
            name: 'user',
            description: 'Discord ID of the User to Add',
            type: 'STRING',
            required: true
        }
    ],

    run: async(client, interaction) => {

        const opts_err = new client.Gateway.MessageEmbed()
             .setTitle('Error: Invalid Options')
             .setColor(client.color)
             .setThumbnail(client.logo)
             .setDescription('Options should be one of the following!')
             .addFields(
                {
                    name: "add",
                    value: `Add a user as staff`,
                    inline: true
                },
                {
                    name: "rem",
                    value: `Remove a user from staff`,
                    inline: true
                }
             )
             .setTimestamp()
             .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

        let user = await interaction.options.getString("user");
        let dis_user = await client.users.cache.get(user);
        let db_user = await UserStorage.findOne({ userID: user });

        if (interaction.options.getString('options') === 'add') {

        if (db_user) {

            const act_staff = new client.Gateway.MessageEmbed()
             .setTitle('Error: Member Exists')
             .setColor(client.color)
             .setThumbnail(client.logo)
             .setDescription('The user provided is already a staff member in our system!')
             .setTimestamp()
             .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

            if (db_user.staff) return interaction.reply({ embeds: [act_staff] });

            await UserStorage.updateOne({ userID: user, staff: true })

            const success = new client.Gateway.MessageEmbed()
             .setTitle('Staff Member - Added')
             .setColor(client.color)
             .setThumbnail(client.logo)
             .addFields(
                {
                    name: "User Name",
                    value: `${dis_user.username}`,
                    inline: true
                },
                {
                    name: "User ID",
                    value: `${dis_user.id}`,
                    inline: true
                }
             )
             .setTimestamp()
             .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

            return interaction.reply({ embeds: [success] })
        
        } else if (!db_user) {
            
          await UserStorage.create({
            userID: user,
            premium: false,
            banned: false,
            staff: true
        });

        const success2 = new client.Gateway.MessageEmbed()
             .setTitle('Staff Member - Added')
             .setColor(client.color)
             .setThumbnail(client.logo)
             .addFields(
                {
                    name: "User Name",
                    value: `${dis_user.username}`,
                    inline: true
                },
                {
                    name: "User ID",
                    value: `${dis_user.id}`,
                    inline: true
                }
             )
             .setTimestamp()
             .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

            return interaction.reply({ embeds: [success2] })
        }
     
    } else if (interaction.options.getString('options') === 'rem') {

        if (db_user) {

            const no_user = new client.Gateway.MessageEmbed()
             .setTitle('Error: No User')
             .setColor(client.color)
             .setThumbnail(client.logo)
             .setDescription('The user provided does not exist in our system!')
             .setTimestamp()
             .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

            if (!db_user) return interaction.reply({ embeds: [no_user]});

            const user_not_staff = new client.Gateway.MessageEmbed()
             .setTitle('Error: Not Staff')
             .setColor(client.color)
             .setThumbnail(client.logo)
             .setDescription('The user provided is not a staff member in our system!')
             .setTimestamp()
             .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

            if (!db_user.staff) return interaction.reply({ embeds: [user_not_staff] });

            await UserStorage.updateOne({ userID: user, staff: false })

            const success = new client.Gateway.MessageEmbed()
             .setTitle('Staff Member - Removed')
             .setColor(client.color)
             .setThumbnail(client.logo)
             .addFields(
                {
                    name: "User Name",
                    value: `${dis_user.username}`,
                    inline: true
                },
                {
                    name: "User ID",
                    value: `${dis_user.id}`,
                    inline: true
                }
             )
             .setTimestamp()
             .setFooter({ text: `${client.credits}`, iconURL: `${client.logo}`})

            return interaction.reply({ embeds: [success] })
        }
     }
   }
}