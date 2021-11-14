import { v4 } from 'uuid'

export default class OrderManager {

  static instance = new OrderManager();

  constructor(){
    this.orders = new Map();
  }

  generateOrderId(){
    return v4().slice(0, 8).toUpperCase();
  }

  isOrderFull(order){
    if(!order.menuItem || !order.itemCount || !order.time){
      return false;
    }
    return true;
  }

  getOrder(tgUserId){
    return this.orders.get(tgUserId);
  }

  updateOrCreateOrder(tgUserId, { menuItem, itemCount, time }){
    if (this.orders.has(tgUserId)){
      return this.updateOrder(tgUserId, { menuItem, itemCount, time });
    }
    return this.createOrder(tgUserId, { menuItem, itemCount, time });;
  }

  createOrder(tgUserId, { menuItem, itemCount, time }){
    const order = { menuItem, itemCount, time, tgUserId, orderId: this.generateOrderId() };
    this.orders.set(tgUserId, order);
    console.log(`creted: ${this.prettyOrder(order)}`);
    return order;
  }

  updateOrder(tgUserId, { menuItem, itemCount, time }) {
    const order = this.orders.get(tgUserId);
    if (!order) {
      console.log(`not found order: tgUserId: ${tgUserId}`);
      return;
      //throw new Error(`not found order: tgUserId: ${tgUserId}`);
    }

    if(menuItem){
      order.menuItem = menuItem;
    }
    if(itemCount){
      order.itemCount = itemCount;
    }
    if(time){
      order.time = time;
    }

    this.orders.set(tgUserId, order);

    console.log(`updated: ${this.prettyOrder(order)}`);

    return order;
  }

  deleteOrder(tgUserId) {
    return this.orders.delete(tgUserId);
  }

  prettyOrder(order) {
      return `\#order: order_id: ${order.orderId} | menu_item: ${order.menuItem} | item_count: ${order.itemCount} | time: ${order.time} min | user_id: ${order.tgUserId}`
  }

}
