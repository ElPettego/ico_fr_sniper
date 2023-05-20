const Web3 = require('web3');
const amqp = require('amqplib')
require('dotenv').config()


async function main() {
    const INFURA = process.env.INFURA;
    const port = process.env.PORT;
    const web3 = new Web3(`ws://localhost:8551`);

    const address = '0xae2fc483527b8ef99eb5d9b44875f005ba1fae13';

    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();
    web3.eth.subscribe('newBlockHeaders', (error, result) => {
    if (error) {
        console.error('Error:', error);
    }
    })
    .on('data', async (header) => {
    const block = await web3.eth.getBlock(header.hash);
    for (const txHash of block.transactions) {
        const tx = await web3.eth.getTransaction(txHash);
        if (tx && tx.from.toLowerCase() === address.toLowerCase()) {
            console.log(tx);
            channel.sendToQueue('test', Buffer.from(tx['hash']))
        }
    }
    });
}

main()