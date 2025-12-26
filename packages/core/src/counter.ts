export interface CounterOptions {
  min?: number;
  max?: number;
}

export class CounterLogic {
  private count: number;
  private min: number;
  private max: number;

  constructor(initialValue: number = 0, options: CounterOptions = {}) {
    this.count = initialValue;
    this.min = options.min ?? -Infinity;
    this.max = options.max ?? Infinity;
    this.clamp();
  }

  private clamp() {
    this.count = Math.min(Math.max(this.count, this.min), this.max);
  }

  get() {
    return this.count;
  }

  set(value: number) {
    this.count = value;
    this.clamp();
    return this.count;
  }

  inc(delta: number = 1) {
    this.count += delta;
    this.clamp();
    return this.count;
  }

  dec(delta: number = 1) {
    this.count -= delta;
    this.clamp();
    return this.count;
  }

  reset(value: number) {
    this.count = value;
    this.clamp();
    return this.count;
  }
}
