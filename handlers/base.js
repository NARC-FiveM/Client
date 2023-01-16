module.exports.setClientPresence = (client, presence) => {

    const twitch_url = "https://twitch.tv/monstercat"

    let presences = [
        {
            name: "https://narc.live",
            type: "STREAMING",
            url: twitch_url
        },
        {
            name: "Server Members",
            type: "WATCHING",
            url: twitch_url
        }
    ]

    client.user.setStatus("idle")

    setInterval(function () {

        let set_presence = presences[Math.floor(Math.random() * presences.length)];

        client.user.setActivity(set_presence.name, {
            type: set_presence.type,
            url: set_presence.url
        });
    }, 10000)
}