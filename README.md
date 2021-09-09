# SmartContract events to telegram channel

This is a sample that listens on EVM-based blockchains for a specific contract's events and sends it to a Telegram channel. 
It uses EDD (Event-Driven Design) to achieve the required functionality.

## Initialization

edit the constants file:

```
src/config/constants.js
```
## How it works
The sample simply consists of 3 main files:
* `src/index.js` the runner and initialer of the project
* `src/service/blockchainService.js` the main listener on the contract and event emitter for other parts to catch and respond to it.
* `src/util/BlockchainListener.js` The handler of the events, that are emitter by the `blockchainService`.


## Usage

Run the `src/index.js` file!

## Customization
This sample listens on a specific BEP20 token and notifies the **telegram channel** of buy/sell amount by a specific address (robot).
Feel free to customize the `topics` and the `events` emitted by the `src/service/BlockchainService.js`.
The bot is also controlled by an admin.

## License
[MIT](https://choosealicense.com/licenses/mit/)