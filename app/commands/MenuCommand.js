import AbstractCommand from './AbstractCommand.js'

import MenuService from '../services/MenuService.js'

export default class MenuCommand extends AbstractCommand {

    constructor(bot){
        super()
        this.menuService = MenuService.instance
        this.bot = bot
    }

    get name(){ return 'menu' }

    async createKeyboard(){
        
        const menu = await this.menuService.getMenu()

        return [
            menu.drinks.map(drink => Markup.button.callback(drink.name, drink.code))
        ]

        this.bot.action('1', (ctx) => {
            ctx.answerCbQuery('Success');
            ctx.editMessageText('Menu', Markup.inlineKeyboard(keyb.concat([[Markup.button.callback('3', '3')]])))
        })

    }

    async exec(ctx){
        
        const keyboard = await this.createKeyboard()
        
        ctx.reply('Menu', keyboard)

    }

}
