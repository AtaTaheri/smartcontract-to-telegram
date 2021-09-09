//Websocket node address
const Websocket_Url = 'wss://bsc-ws-node.nariox.org:443';
//THe contract to listen to its events
const CONTRACT_ADDRESS = '';
//Telegram Bot Token
const BOT_TOKEN = '';
//Admin Chat ID
const ADMIN_CHAT_ID = 0;
//The channel to broadcast the data
const CHANNEL_ID = '@YOUR_CHANNEL_ID';

const publicise = {
    WS_URL: Websocket_Url,
    CONTRACT_ADDRESS: CONTRACT_ADDRESS,
    BOT_TOKEN: BOT_TOKEN,
    ADMIN_CHAT_ID: ADMIN_CHAT_ID,
    CHANNEL_ID: CHANNEL_ID,
};

exports.CONSTANTS = publicise;