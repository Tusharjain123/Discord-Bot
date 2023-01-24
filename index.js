require("dotenv").config()
const { Client, IntentsBitField } = require("discord.js")
const fetch = require("node-fetch")
const client = new Client({
    intents: [IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
    ]
})

function getQuote() {
    return fetch("https://zenquotes.io/api/random").then((resp) => { return resp.json() }).then((data) => {
        return data[0]["q"] + "-" + data[0]["a"]
    })
}

// msg.reply => replies to the sender msg i.e. tag the user who has send the msg
// .channel.send => send the msg to the channel

client.on("ready", () => {
    console.log(`logged in as ${client.user.tag}`)
})


client.on("messageCreate", msg => {
    if (msg.author.bot) return
    if (msg.content === "Hi") {
        msg.reply("Hello")
    }
    if (msg.content === "$inspire") {
        getQuote().then(quote => msg.channel.send(quote))
    }
})


client.login(process.env.TOKEN)