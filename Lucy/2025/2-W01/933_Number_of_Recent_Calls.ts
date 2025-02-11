class RecentCounter {
  private PAST_TIME: number = 3000;
  private queue: number[];

  constructor() {
    this.queue = [];
  }

  ping(t: number): number {
    this.queue.push(t);
    const timeStart = t - this.PAST_TIME;

    while (this.queue.length > 0 && this.queue[0] < timeStart) {
      this.queue.shift();
    }

    return this.queue.length;
  }
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
