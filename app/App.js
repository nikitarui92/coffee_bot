import { Telegraf } from 'telegraf'
import { format } from 'pretty-format'

import Config from './Config.js'
import StartCommand from './commands/StartCommad.js'
import MenuCommand from './commands/MenuCommand.js'

export default class App {

    constructor() {
        this.bot = new Telegraf(Config.instance.botToken)
    }

    #registerMiddlewares() {
        this.bot.use((ctx, next)=>{
            // console.log(format(ctx.update));
            next()
        })
    }

    async #registerCommands() {
        const startCmd = new StartCommand()
        const menuCmd = new MenuCommand(this.bot)

        this.bot.command(menuCmd.name, await menuCmd.run())
        this.bot.command(startCmd.name, await startCmd.run())
    }

    async startup() {
        this.#registerMiddlewares()
        await this.#registerCommands();
        await this.bot.launch();
        process.once('SIGINT', () => this.bot.stop('SIGINT'));
        process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
    }
}
