class CircularBuffer<T> {
  capacity: number;
  occupancy: number;
  buffer: T[];
  head: number;
  tail: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.occupancy = 0;
    this.buffer = []
    this.head = this.tail = -1
  }

  read() {
    if (this._isEmpty()) throw new BufferEmptyError();

    const item = this.buffer[this.head];
    this._inc_head();
    this.occupancy--;

    return item;
  }

  write(data: T) {
    // Add an element to the back +and overwrite front if full+
    if (!this._isFull()) {
      if (this.head === -1) this.head = 0;
      this._inc_tail();
      this.buffer[this.tail] = data;
      this.occupancy++;
    }
    else {
      throw new BufferOverflowError();
    }
  }

  forceWrite(data: T) {
    if (this._isFull()) {
      this.buffer[this.head] = data;
      this._inc_head();
      this._inc_tail();
    }
    else { // act as a write => delegate...
      this.write(data);
    }
  }

  clear() {
    this.head = this.tail = -1
    this.occupancy = 0;
  }

  private _inc_head() {
    this.head = this.head < this.capacity - 1 ? this.head + 1 : 0;
  }

  private _inc_tail() {
    this.tail = this.tail < this.capacity - 1 ? this.tail + 1 : 0;
  }

  private _isFull(): boolean {
    return this.occupancy === this.capacity;
  }

  private _isEmpty(): boolean {
    return this.occupancy === 0
  }

}

export class BufferOverflowError extends Error { };

export class BufferEmptyError extends Error { };

export default CircularBuffer;
