export class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventType, callback) {
    this.events[eventType] = this.events[eventType] || [];
    this.events[eventType].push(callback);
  }

  emit(eventType, arg) {
    if (this.events[eventType]) {
      this.events[eventType].forEach((callback) => callback(arg));
    }
  }
}
