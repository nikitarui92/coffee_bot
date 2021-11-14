import { Markup } from 'telegraf'

import AbstractCommand from './AbstractCommand.js'
import MenuService from '../services/MenuService.js'
import HowMuchCupsCommand from './HowMuchCupsCommand.js';
import OrderManager from '../services/OrderManager.js';

export default class MenuCommand extends AbstractCommand {

    constructor(bot){
        super();
        this.bot = bot;
        this.menuService = MenuService.instance;
        this.orderManager = OrderManager.instance;
        this.howMuchCupsCommand = new HowMuchCupsCommand(this.bot);
        this.keyb = null;
    }

    get name(){ return 'menu' }

    async init(){
        this.keyb = await this.createKeyboard();
    }

    async createKeyboard(){
        const menu = await this.menuService.mainMenu()

        const keyb = []

        for (const drink of menu.drinks) {
            keyb.push([Markup.button.callback(`${drink.name} - ${drink.price}`, `drink_${drink.code}`)])
        }

        this.bot.action(/^drink_(.*)$/, async (ctx) => {
            const coffeeType = ctx.match[1];
            const tgUserId = ctx.from.id;
            this.orderManager.updateOrCreateOrder(tgUserId, { menuItem: coffeeType });
            ctx.answerCbQuery('😃 Success');
            (await this.howMuchCupsCommand.run())(ctx);
        });
        
        return Markup.inlineKeyboard(keyb)
    }

    async getKeyboard() {
        if (!this.keyb)
            this.keyb = await this.createKeyboard()
        return this.keyb
    }

    async exec(ctx) {
        const keyboard = await this.getKeyboard()
        ctx.replyWithMarkdownV2('*Menu*', keyboard)
    }
}
