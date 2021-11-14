import { Markup } from 'telegraf'

import AbstractCommand from './AbstractCommand.js'
import MenuService from '../services/MenuService.js'
import WhatTimeCommand from './WhatTimeCommand.js';
import OrderManager from '../services/OrderManager.js';

export default class HowMuchCupsCommand extends AbstractCommand {

    get name(){ return 'how_much_cups' }

    constructor(bot){
      super()
      this.bot = bot
      this.menuService = MenuService.instance
      this.orderManager = OrderManager.instance;
      this.whatTimeCommand = new WhatTimeCommand(bot);
      this.keyb = null
    }

    async init(){
      //
    }

    async createKeyboard(){
      const menu = await this.menuService.howMuchCupsMenu();

      const keyb = [];

      for (const cup of menu) {
          keyb.push([Markup.button.callback(`${cup.name}`, `cup_${cup.code}`)])
      }

      this.bot.action(/^cup_(.*)$/, async (ctx) => {
        const itemCount = ctx.match[1];
        console.log(itemCount);
        const tgUserId = ctx.from.id;

        this.orderManager.updateOrCreateOrder(tgUserId, { itemCount });

        ctx.answerCbQuery('😃 Success');

        await this.whatTimeCommand.exec(ctx);
      })
      
      return Markup.inlineKeyboard(keyb)
    }

    async getKeyboard(){
      if (!this.keyb)
          this.keyb = await this.createKeyboard()
      return this.keyb
    }

    async exec(ctx) {
      const keyboard = await this.getKeyboard()
      ctx.replyWithMarkdownV2('*Выберете количество кружек*', keyboard)
    }
}
