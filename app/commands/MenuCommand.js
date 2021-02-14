import { Markup } from 'telegraf'

import AbstractCommand from './AbstractCommand.js'
import MenuService from '../services/MenuService.js'

export default class MenuCommand extends AbstractCommand {

    constructor(bot){
        super()
        this.bot = bot
        this.menuService = MenuService.instance
        this.keyb = null
    }

    get name(){ return 'menu' }

    async init(){
        this.keyb = await this.createKeyboard();
    }

    async createKeyboard(){
        
        const menu = await this.menuService.getMenu()

        const getActionBtns = ({code, price}) => [
            Markup.button.callback('+', `plus_${code}`),
            Markup.button.callback(`${price} RUB`, `price_${code}`),
            Markup.button.callback('-', `minus_${code}`),
        ]

        const keyb = []

        for (const drink of menu.drinks){
            keyb.push([Markup.button.callback(drink.name, `drink_${drink.code}`)])
        }

        this.bot.action(/^plus_(.*)$/, (ctx) => {
            console.log(ctx.match[1])
            ctx.answerCbQuery('Success');
            // ctx.editMessageText('Menu', Markup.inlineKeyboard(keyb.concat([[Markup.button.callback('3', '3')]])))
        })

        this.bot.action(/^drink_(.*)$/, (ctx) => {
            console.log(ctx.match[1])
            ctx.answerCbQuery('Success');
            ctx.editMessageText('Menu', Markup.inlineKeyboard(keyb.concat([[Markup.button.callback('3', '3')]])))
        })
        
        return Markup.inlineKeyboard(keyb)

    }

    async getKeyboard(){

        if (!this.keyb)
            this.keyb = await this.createKeyboard()

        return this.keyb

    }

    async exec(ctx){
        
        const keyboard = await this.getKeyboard()
        
        ctx.replyWithMarkdownV2('*Menu*', keyboard)

    }

}
