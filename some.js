



// bots.onText(/\/start/, (msg) => {
//             const chatId = msg.chat.id;
//             const firstName = msg.from.first_name; 
//             console.log(chatId, msg);
//             const formattedMessage = `Welcome! ${firstName} 👋 \nThis is perfect place to get enlighted \nHappy fapping 💋 \nFor more premium🌟 content join https://t.me/+EgdUGW-dwo9mOTg1 `;
//             bots.sendMessage(chatId, formattedMessage, {
//                 reply_markup: {
//                     keyboard: [["TURN ME ON 💦"], ["/SendAll"]],
//                     resize_keyboard: true,
//                 },
//             });
//         });

// Function to run the bot
// async function runbot() {
// await retrieveData(); // Ensure links are retrieved before starting the bot
// let lastVideoCaption = null;
// Initialize bot
// const bot = new TelegramBot(chuttmalle, { polling: true });

//     // Handle /start command
//     bot.onText(/\/start/, (msg) => {
//         const chatId = msg.chat.id;
//         const firstName = msg.from.first_name; 
//         console.log(chatId, msg);
//         const formattedMessage = `Welcome! ${firstName} 👋 \nThis is perfect place to get enlighted \nHappy fapping 💋 \nFor more premium🌟 content join https://t.me/+EgdUGW-dwo9mOTg1 `;
//         bot.sendMessage(chatId, formattedMessage, {
//             reply_markup: {
//                 keyboard: [["TURN ME ON 💦"], ["/SendAll"]],
//                 resize_keyboard: true,
//             },
//         });
//     });

//     bot.onText('message', (msg) => {
//         // const chatId = msg.chat.id;
//         // const firstName = msg.from.first_name; 
//         console.log(chatId, msg);
//         bot.sendMessage(chatId, {
//             reply_markup: {
//                 keyboard: [["TURN ME ON 💦"], ["/SendAll"]],
//                 resize_keyboard: true,
//             },
//         });
//     });

//     bot.on("message", async (msg) => {
//         const chatId = msg.chat.id;
//         const text = msg.text;
//         if (text === "TURN ME ON 💦") {
//             for (let i = 0; i < 4 && i < links.length; i++) {
//                 try {
//                     const videoCaption = `video no: ${i + 1}`;
//                     let media = videouurl(links[i]);
//                     console.log(media);
//                     // console.log(media)
//                     await bot.sendVideo(chatId, media, { caption: videoCaption ,thumbnail:links[i], protect_content: true });
//                     console.log(`Video sent to the chat! ${links[i]}`);
//                     updateVideoCaptions(videoCaption);
//                 } catch (error) {
//                     console.error("Error sending video:", error);
//                     bot.sendMessage(chatId, `Error: ${error.message}`);
//                 }
//             }
//             textbtn(chatId);  // Provide inline button after the videos
//         }

//         if (text === "/SendAll") {
//                 try {

//                         for (let i = 0;  i < links.length; i++) {
//                             await bot.sendVideo(chatId, links[i], { caption: `video no: ${i}`,                     
//                                 protect_content: true
//                              });
//                         }
//                 } catch (error) {
//                     console.error("Error sending video:", error);
//                 }
//             }
//     });

//     // Handle inline button callback
//     bot.on('callback_query', async (callbackQuery) => {
//         const chatId = callbackQuery.message.chat.id;
//         const data = callbackQuery.data;

//         if (data === 'more') {
//             const lastVideoCaption = getLastVideoCaption();
//             const start = extractIntegersFromString(lastVideoCaption)[0] || 0;
//             const end = start + 20;

//             for (let i = start; i < end && i < links.length; i++) {
//                 try {
//                     const videoCaption = `video no: ${i + 1}`;
//                     let media = videouurl(links[i]);
//                     console.log(media);
//                     await bot.sendVideo(chatId, media , { caption:videoCaption ,thumbnail:links[i] , protect_content: true });
//                 } catch (error) {
//                     console.error("Error sending video:", error);
//                     bot.sendMessage(chatId, `Error: ${error.message}`);
//                 }
//             }
//             await bot.answerCallbackQuery(callbackQuery.id);  // Stops Telegram's "waiting" animation
//         }
//     });

//     // Helper functions
//     function updateVideoCaptions(newCaption) {
//         lastVideoCaption = newCaption;         
//         console.log("Updated Captions -> Last:", lastVideoCaption); 
//     }

//     function getLastVideoCaption() {
//         return lastVideoCaption;
//     }

//     function extractIntegersFromString(str) {
//         const regex = /\d+/g;  
//         const matches = String(str).match(regex); 
//         return matches ? matches.map(Number) : [];
//     }

//    bot.on('message', (msg) => {
//     const chatId = msg.chat.id;  // Extract the chat ID from the message
//     const firstName = msg.from.first_name;  // Get the sender's first name if needed

//     console.log(chatId, msg);  // Log the chat ID and full message for debugging

//     for (let i = 0; i < 2; i++) {
//         try {
//             // Send a photo with an inline button directly under it
//             bot.sendPhoto(chatId, links[i], {
//                 reply_markup: {
//                     inline_keyboard: [[{ text: "watch now", callback_data: `more_${i}` }]]  
//                 }
//             });

//         } catch (error) {
//             console.error("Error sending photo:", error);
//         }
//     }
// });

// }

// Start the bot once when the server starts
// runbot();

const arr=[1,2,3,4,5,6,7,8,9]

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
console.log(shuffleArray(arr));