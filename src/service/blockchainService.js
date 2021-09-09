const {CONSTANTS} = require('../config/constant');
const {ethers} = require('ethers');
const Web3 = require('web3');
const EventEmitter = require('events');


class Blockchain extends EventEmitter {

    constructor() {
        super();
        this.Web3Config = {
            socketConfig: {
                reconnect: {
                    auto: true,
                    delay: 100, // ms
                    maxAttempts: 5,
                    onTimeout: false
                }
            },
            topics: [
                //add your topics
                ethers.utils.id("Transfer(address,address,uint256)"),
            ],
            contract: CONSTANTS.CONTRACT_ADDRESS
        };
        this.Web3Config['socketProvider'] = new Web3.providers.WebsocketProvider(CONSTANTS.WS_URL, this.Web3Config.socketConfig);
        this.web3 = new Web3(this.Web3Config.socketProvider);
    }

    startListening() {
        let _this = this;
        this.blockchainSubscription = this.web3.eth.subscribe(
            'logs',
            {
                address: this.Web3Config.contract,
                topics: this.Web3Config.topics
            },
            function (error, result) {
                if (!error) {

                } else {
                    _this.emit('BC-ERROR', error.message);
                }
            }).on("connected", function (subscriptionId) {
                _this.emit('BC-CONNECTED', subscriptionId);
            }).on("data", function (log) {
                //Ad your own custom filter and emitter, this is just a sample
                let from = log.topics[1];
                let to = log.topics[2];
                let data = log.data;
                let robotHex = ethers.utils.hexZeroPad('0x0000000000...', 32);

                if (from === robotHex) {
                    let amount = _this.web3.utils.hexToNumberString(data) / (10 ** 18);
                    _this.emit('BC-SELL', amount);
                } else if (to === robotHex) {
                    let amount = _this.web3.utils.hexToNumberString(data) / (10 ** 18);
                    _this.emit('BC-BUY', amount);
                }

            }).on("changed", function (log) {


            }).on('error', function (err) {
                _this.emit('BC-ERROR', err.message);
            });

    }

    stopListening() {
        let _this = this;
        if (this.blockchainSubscription == null)
            return

        this.blockchainSubscription.unsubscribe(function(error, success){
            if(success)
                _this.emit('BC-UNS-Success');
            else
                _this.emit('BC-UNS-Err', error.message);
        });


    }
}

const blockchain = new Blockchain();

exports.blockchain = blockchain;

