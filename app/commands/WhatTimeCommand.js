import { Markup } from 'telegraf'

import AbstractCommand from './AbstractCommand.js'
import MenuService from '../services/MenuService.js'
import OrderManager from '../services/OrderManager.js';
import ApproveOrderCommand from './ApproveOrderCommand.js'

export default class WhatTimeCommand extends AbstractCommand {

    get name(){ return 'what_time' }

    constructor(bot){
      super()
      this.bot = bot
      this.menuService = MenuService.instance
      this.orderManager = OrderManager.instance;
      this.approveOrderCommnad = new ApproveOrderCommand(bot);
      this.keyb = null
    }

    async init(){
      //
    }

    async createKeyboard(){
      const menu = await this.menuService.whatTimeMenu();

      const keyb = []

      for (const item of menu) {
          keyb.push([Markup.button.callback(`${item.name}`, `time_${item.code}`)])
      }

      this.bot.action(/^time_(.*)$/, async (ctx) => {
        const time = ctx.match[1];
        const tgUserId = ctx.from.id;
        this.orderManager.updateOrCreateOrder(tgUserId, { time });
        ctx.answerCbQuery('😃 Success');
        (await this.approveOrderCommnad.run())(ctx);
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
      ctx.replyWithMarkdownV2('*Через какое время подойдете*', keyboard)
    }
}
