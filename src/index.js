const {CONSTANTS} = require('./config/constant');
const {blockchain} = require('./service/blockchainService')
const {Telegraf} = require('telegraf');
const {BlockChainListener} = require('./util/BlockchainListener')
const bot = new Telegraf(CONSTANTS.BOT_TOKEN);
let blockChainListener;


bot.start((ctx) => {
    ctx.reply('Welcome\n/help')
});
bot.help((ctx) => {
    ctx.reply('/startListen' + '\n' + '/stopListen' );
});
bot.hears('/startListen', (ctx) => {
    if (ctx.chat.id !== CONSTANTS.ADMIN_CHAT_ID) {
        ctx.reply('Unauthorized');
        return;
    }
    blockchain.startListening();
    ctx.reply('Starting ...');

});
bot.hears('/stopListen', (ctx) => {
    if (ctx.chat.id !== CONSTANTS.ADMIN_CHAT_ID) {
        ctx.reply('Unauthorized');
        return;
    }
    blockchain.stopListening();
    ctx.reply('Stopping ...');
});


bot.launch().then(function () {
    blockChainListener = new BlockChainListener(bot, blockchain, CONSTANTS.ADMIN_CHAT_ID, CONSTANTS.CHANNEL_ID);
}).catch(function () {
    process.exit();
});


