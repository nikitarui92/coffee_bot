import { v4 } from 'uuid'

export default class OrderManager {

  static instance = new OrderManager();

  constructor(){
    this.orders = new Map();
  }

  generateOrderId(){
    return v4();
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
    console.log(`creted: ${this.prettyOrder(tgUserId)}`);
    return order;
  }

  updateOrder(tgUserId, { menuItem, itemCount, time }) {
    const order = this.orders.get(tgUserId);
    if (!order) {
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

    console.log(`updated: ${this.prettyOrder(tgUserId)}`);

    return order;
  }

  deleteOrder(tgUserId) {
    return this.orders.delete(tgUserId);
  }

  prettyOrder(tgUserId) {
    const order = this.orders.get(tgUserId);
    if(order){
      return `#Order: order_id: ${order.orderId} | menu_item: ${order.menuItem} | item_count: ${order.itemCount} | time: ${order.time} min`
    }
  }

}
