import AbstractCommand from './AbstractCommand.js'
import OrderManager from '../services/OrderManager.js';
import Config from '../Config.js'

export default class ApproveOrderCommand extends AbstractCommand {

    get name(){ return 'approve_order' }

    constructor(bot){
      super()
      this.bot = bot
      this.orderManager = OrderManager.instance;
      this.keyb = null
    }

    async init(){
      //
    }

    async exec(ctx) {
        const tgUserId = ctx.from.id;
        const order = this.orderManager.getOrder(tgUserId);
        if (!order) {
          //
          return;  
        }

        const isOrderFull = this.orderManager.isOrderFull(order);
        if(!isOrderFull){
          return
        }
        
        ctx.reply(`Заказ Создан!\nНомер заказа: ${order.orderId}`);
        ctx.telegram.sendMessage(Config.instance.chatId, this.orderManager.prettyOrder(order));

        this.orderManager.deleteOrder(tgUserId);
    }
}
