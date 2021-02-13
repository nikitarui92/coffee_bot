import { Telegraf, Markup } from 'telegraf'

import Config from './Config.js'

import StartCommand from './commands/StartCommad.js'

export default class App {

    constructor() {
        this.bot = new Telegraf(Config.instance.botToken)
    }

    _addMiddlewares() {
        
    }

    _addCommands() {
        const startCmd = new StartCommand();
        this.bot.command(startCmd.name, startCmd.run())
    }

    async startup() {

        this._addMiddlewares()
        this._addCommands()

        await this.bot.launch()

        process.once('SIGINT', () => this.bot.stop('SIGINT'))
        process.once('SIGTERM', () => this.bot.stop('SIGTERM'))

    }

}

