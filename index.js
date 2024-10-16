const moment = require('moment-timezone');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const app = express();
const PORT = 3000;
const TelegramBot = require("node-telegram-bot-api");
const chuttmalle = process.env.TELEGRAM_BOT_TOKEN;
const smutsreciever = process.env.TELESMUTSOFFICIALBOT;
// const channelId = "-1002412850515";
const uri = process.env.MONGODB_URI;
const dbName = 'askeladd';
const collectionName = 'waitforplot';

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let vidlinks = [];
async function retrieveData() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Retrieve only 'link' field from all documents
        const data = await collection.find({}, { projection: { link: 1, _id: 0 } }).toArray();
        vidlinks = data.map(item => item.link);
        console.log('Retrieved data:', vidlinks);
    } catch (err) {
        console.error('Error retrieving data:', err);
    } finally {
        await client.close();
    }
}
retrieveData();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const botc = new TelegramBot(chuttmalle, { polling: true });   //provider
const bots = new TelegramBot(smutsreciever, { polling: true }); //reciever
function postlinks(){

    const chatId ="-1002412850515" ;
    // console.log("First bot message received", chatId, msg);
    const links = shuffleArray(vidlinks);
    for (let i = 0; i < 4; i++) {
        try {
            const imageUrl = links[i]
            const spart = imageUrl.split('/').pop().split('-')[0];
            console.log(imageUrl);
            const secondBotLink = `https://t.me/telesmutsofficalbot?start=${spart}`;  // URL to send to the second bot
            console.log(secondBotLink);

            botc.sendPhoto(chatId, links[i], {
                reply_markup: {
                    inline_keyboard: [[
                        {
                            text: "watch now",
                            url: secondBotLink
                        }
                    ]]
                },
                protect_content: true
            });
            sleep(1000);
        } catch (error) {
            console.error("Error sending photo:", error);
        }
    }
    console.log('loop ended');

}


// scheduling

cron.schedule('31 9 * * *', () => {  // Every day at 9:29 AM
    const now = moment().tz('Asia/Kolkata');
    console.log(`Current time in IST: ${now.format('YYYY-MM-DD HH:mm:ss')}`);
    
    postlinks();
    console.log('Videos sent at 9:29 AM IST');
}, {
    scheduled: true,
    timezone: "Asia/Kolkata" // Set the time zone to IST
});

// cron.schedule('0 10 * * *', () => {  // Every day at 10 AM
//      postlinks();
//     console.log('Videos sent at 10 AM');
// });


// reciever 

bots.onText(/\/start(.*)/, (msg, match) => {
    const chatId = msg.chat.id;
    console.log(match);
    const payload = match[1].trim();
    if (payload) {
        const vidlink = ` https://files.redgifs.com/${payload}-mobile.mp4`
        const encodedUrl = encodeURIComponent(vidlink);
        console.log(encodedUrl);
        const final = vidlink.trim();
        // console.log(vidlink);
        bots.sendVideo(chatId, final, { caption: `` }, { protect_content: true });
        // console.log(`Video sent to the chat! ${vidlink}`);
    }
    else {
        // Handle the case where there's no payload
        bots.sendMessage(chatId, 'No URL provided.');
    }
});




app.get('/', (req, res) => {
    res.send('Bot is running');
});

app.get('/ping', (req, res) => {
    res.send('Bot is alive');
});

app.listen(PORT, () => {
    console.log(`Express server is running on http://localhost:${PORT}`);
});



