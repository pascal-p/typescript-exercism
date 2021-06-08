class LinkedList<T> {
  head: Node<T> | undefined;
  tail: Node<T> | undefined;
  len: number

  constructor() {
    this.head = undefined;
    this.tail = undefined;
    this.len = 0;
  }

  push(v: T): void {
    // add item to the tail
    const node = new Node<T>(v);
    node.prev = this.tail;

    if (this.len === 0) { // empty: set head
      this.head = node;
    }
    else if (this.tail === undefined) {
      // odd!
      this.tail = node;  // FIXME!
    }
    else {
      this.tail.next = node;
    }
    this.tail = node;
    this.len += 1;
  }

  pop(): T | undefined {
    // get element from tail
    if (this.len === 0) return undefined; // throw new Error('Empty List');

    const node = this.tail;
    if (node === undefined) return undefined;

    this.tail = node.prev;

    if (this.len == 1) {
      // will become empty list - update head ref
      this.head = undefined
      // node.prev === undefined
    }
    else if (node.prev !== undefined) {
      node.prev.next = undefined;
    }
    this.len -= 1;
    return node.v;
  }

  shift(): T | undefined {
    // get element from head
    if (this.len == 0) return undefined; // throw new Error('Empty List');

    const node = this.head;
    if (node === undefined) return undefined;
    this.head = node.next;

    if (this.len == 1) {
      // will become empty list - update tail ref
      this.tail = undefined;
    }
    else if (node.next !== undefined) {
      node.next.prev = undefined;
    }
    node.next = undefined;
    this.len -= 1;
    return node.v;
  }

  unshift(v: T): void {
    // add at the start of the list (head)
    const node = new Node(v);
    // node.prev = undefined;
    node.next = this.head;

    if (this.len == 0) {
      // it was an empty list move tail ref.
      this.tail = node;
    }
    else if (this.head !== undefined) {
      this.head.prev = node;
    }
    this.head = node;
    this.len += 1;
  }

  delete(v: T): void {
    if (this.len == 0) return undefined;

    if (this.len == 1 && this.head !== undefined && this.head.v == v) { // delete from singleton list
      this.len = 0;
      this.head = this.tail = undefined;
      return;
    }

    // general case: find element in list
    if (this.head === undefined) return undefined;

    let cur: Node<T> | undefined = this.head;
    let found = false;
    while (cur != this.tail) {
      if (cur.v == v) {
        found = true;
        break;
      }
      cur = cur.next;
      if (cur === undefined) break;
    }
    // we may have !found && cur === this.tail && cur.v === this.tail.v === v

    if (!found && (typeof cur === 'undefined' || cur.v !== v)) return undefined;
    // now cur !== undefined

    if (cur === this.head) {                                  // special case: delete head
      this.head = this.head.next;
      if (this.head !== undefined) this.head.prev = undefined;
    }
    else if (cur === this.tail && this.tail !== undefined) {  // special case: delete tail
      this.tail = this.tail.prev;
      if (this.tail !== undefined) this.tail.next = undefined;
    }
    else if (cur !== undefined) {  // compiler is complaining...
      //                           // ... Must be a better way (we know cur !== undefined)
      if (cur.prev !== undefined && cur.next !== undefined) cur.prev.next = cur.next;
      if (cur.next !== undefined && cur.prev !== undefined) cur.next.prev = cur.prev;
    }
    this.len -= 1;
  }

  count(): number {
    return this.len;
  }
}

class Node<T> {
  v: T;
  next: Node<T> | undefined;
  prev: Node<T> | undefined;

  constructor(v: T) {
    this.v = v;
    this.next = undefined;
    this.prev = undefined;
  }
}

export default LinkedList;
