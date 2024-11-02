console.log("Starting server");

const TelegramBot = require('node-telegram-bot-api');
const {tg_bot_token, tg_bot_chat, makeUrl, int_from, int_to, serviceIds, commit_name} = require("./environs");
const {setRandomInterval, millisByMinutes} = require("./util");

const bot = new TelegramBot(tg_bot_token, {polling: true});

let scanCount = 0;
let lastScan = new Date();

bot.sendMessage(tg_bot_chat, "Bot redeployed.\n Commit: " + commit_name).then()

bot.on('text', async msg => {
    try {
        await bot.sendMessage(msg.chat.id, "Bot is online. All the notifications are in channel");
    } catch (error) {
        console.log(error);
    }
})

processRequest().then()
setRandomInterval(async () => {
    await processRequest()
}, millisByMinutes(int_from), millisByMinutes(int_to))

async function processRequest() {
    const newDate = new Date();
    console.log("Requesting data from " + newDate.toISOString());
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    const services = Object.keys(serviceIds)
    for (let serviceIdx = 0; serviceIdx < services.length; serviceIdx++) {
        try {
            const serviceName = services[serviceIdx];
            const response = await fetch(
                makeUrl(newDate.toISOString(), nextYear.toISOString(), serviceIds[serviceName])
            );
            if (!response.ok) {
                const message = `${newDate.toISOString()}: Failed to fetch data for ${serviceName}. Response not ok.`
                console.log(message);
                console.log(response)
                await bot.sendMessage(tg_bot_chat, message);
                return
            }

            const json = await response.json();
            await processJson(serviceName, json.data)
        } catch (error) {
            console.error(error.message);
            await bot.sendMessage(tg_bot_chat, "Failed to fetch data with exception:\n" + error.message);
        }
    }

    lastScan = newDate;
    scanCount++;
}

async function processJson(serviceName, result) {
    let message = serviceName + "\n";
    message += `Просмотрено мест на запись: ${result.length}\n`;
    let availableBooking = [];
    for (let i = 0; i < result.length; i++) {
        if (result[i].attributes.isAvailable === true) {
            availableBooking.push(result[i]);
        }
    }
    message += `Найдено мест: ${availableBooking.length}\n`
    if (availableBooking.length > 0) {
        message += "Даты: \n";
        for (let j = 0; j < availableBooking.length; j++) {
            message += availableBooking[j].attributes.date + "\n"
        }
    }
    if (availableBooking.length > 0) {
        await bot.sendMessage(tg_bot_chat, message)
    }
}