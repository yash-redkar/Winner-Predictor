export class ComparisonCounter {
  constructor() {
    this.count = 0;
  }

  compare(a, b) {
    this.count++;
    return a - b;
  }

  reset() {
    this.count = 0;
  }

  getCount() {
    return this.count;
  }
}
