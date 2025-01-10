type MessageType = 'orderCreated' | 'orderCancelled';

interface Message {
  type: MessageType;
}

interface Order {
  orderId: string;
  items: { productId: string; quantity: number }[];
}

export interface OrderCreatedMessage {
  type: 'orderCreated';
  payload: Order;
}

export interface OrderCancelledMessage {
  type: 'orderCancelled';
  payload: { orderId: string };
}

export class MessageBus {
  private subscribers: Record<string, ((message: any) => void)[]> = {};

  subscribe<T extends Message>(type: T['type'], subscriber: (message: T) => void): void {
    if (!this.subscribers[type]) {
      this.subscribers[type] = [];
    }
    this.subscribers[type].push(subscriber);
  }

  publish<T extends Message>(message: T): void {
    const subscribers = this.subscribers[message.type] || [];
    subscribers.forEach((subscriber) => subscriber(message));
  }
}

export class InventoryStockTracker {
  private orderHistory: Record<string, Order> = {};

  constructor(
    private bus: MessageBus,
    private stock: Record<string, number>,
  ) {
    this.subscribeToMessages();
  }

  private subscribeToMessages(): void {
    this.bus.subscribe<OrderCreatedMessage>('orderCreated', (message) =>
      this.handleOrderCreated(message),
    );
    this.bus.subscribe<OrderCancelledMessage>('orderCancelled', (message) =>
      this.handleOrderCancelled(message),
    );
  }

  private handleOrderCreated(message: OrderCreatedMessage): void {
    const { orderId, items } = message.payload;
    this.orderHistory[orderId] = message.payload;

    items.forEach(({ productId, quantity }) => {
      this.stock[productId] = (this.stock[productId] || 0) - quantity;
    });
  }

  private handleOrderCancelled(message: OrderCancelledMessage): void {
    const { orderId } = message.payload;
    const order = this.orderHistory[orderId];

    if (order) {
      order.items.forEach(({ productId, quantity }) => {
        this.stock[productId] = (this.stock[productId] || 0) + quantity;
      });
      delete this.orderHistory[orderId];
    }
  }

  getStock(productId: string): number {
    return this.stock[productId] || 0;
  }
}
