import { Telegraf } from 'telegraf'

import Config from './Config.js'
import StartCommand from './commands/StartCommad.js'
import MenuCommand from './commands/MenuCommand.js'

export default class App {

    constructor() {
        this.bot = new Telegraf(Config.instance.botToken)
    }

    _addMiddlewares() {
        
    }

    async _addCommands() {
        const startCmd = new StartCommand()
        const menuCmd = new MenuCommand(this.bot)

        this.bot.command(menuCmd.name, await menuCmd.run())
        this.bot.command(startCmd.name, await startCmd.run())
    }

    async startup() {

        this._addMiddlewares()
        await this._addCommands()

        await this.bot.launch()

        process.once('SIGINT', () => this.bot.stop('SIGINT'))
        process.once('SIGTERM', () => this.bot.stop('SIGTERM'))

    }

}

