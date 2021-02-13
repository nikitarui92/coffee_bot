import dotenv from 'dotenv'

export default class Config {

    static instance = new Config();

    #env = process.env

    constructor() {
        dotenv.config();
    }

    get botToken() { return this.#env.BOT_TOKEN }
    get chatId() { return Number(this.#env.CHAT_ID) }

}
