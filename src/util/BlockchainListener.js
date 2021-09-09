class BlockChainListener {
    constructor(bot, emitter, admin, channel) {
        this.bot = bot;
        this.emitter = emitter;
        this.admin = admin;
        this.channel = channel;
        this.init()
    }

    init() {
        let _this = this;

        this.emitter.on('BC-ERROR', function (err) {
            _this.sendMessageToAdmin("Error: \n" + err)
        });

        this.emitter.on('BC-CONNECTED', function (SubId) {
            _this.sendMessageToAdmin("Connected: \n" + SubId)
        });

        this.emitter.on('BC-SELL', function (amount) {
            if (amount==0)
                return;
            _this.sendMessageToChannel("🔴🔴🔴\n" + "Sell \n" + 'Amount: '+ amount);


        });

        this.emitter.on('BC-BUY', function (amount) {
            if (amount==0)
                return;
            _this.sendMessageToChannel("🟢🟢🟢\n" + "Buy \n" + 'Amount: '+ amount)
        });

        this.emitter.on('BC-ERROR', function (err) {
            _this.sendMessageToAdmin("Error: \n" + err)
        });

        this.emitter.on('BC-UNS-Success', function () {
            _this.sendMessageToAdmin("Unsubscribed successfully")
        });

        this.emitter.on('BC-UNS-Err', function (error) {
            _this.sendMessageToAdmin("Unsubscribe Error\n" + error)

        });

    }

    sendMessageToAdmin(message){
        this.bot.telegram.sendMessage(this.admin, message)

    }

    sendMessageToChannel(message){
        this.bot.telegram.sendMessage(this.channel, message)
    }
}

exports.BlockChainListener = BlockChainListener;
