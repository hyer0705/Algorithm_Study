class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(node) {
    this.size++;
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }

    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }

  pushLeft(node) {
    this.size++;
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }

    this.head.prev = node;
    node.next = this.head;
    this.head = node;
  }

  pop() {
    const poppedNode = this.tail;
    if (this.size === 0) return;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size = 0;
      return poppedNode;
    }

    this.tail.prev.next = null;
    this.tail = this.tail.prev;
    this.size--;

    return poppedNode;
  }

  popLeft() {
    const poppedNode = this.head;
    if (this.size === 0) return;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size = 0;
      return poppedNode;
    }

    this.head.next.prev = null;
    this.head = this.head.next;
    this.size--;

    return poppedNode;
  }
}

function solution(rc, operations) {
  const OPERATION = Object.freeze({
    shiftRow: "ShiftRow",
    rotate: "Rotate",
  });

  const ROW = rc.length;
  const COL = rc[0].length;

  const leftCol = new Deque();
  const rightCol = new Deque();
  const center = new Deque();

  for (const row of rc) {
    leftCol.push(new Node(row[0]));
    rightCol.push(new Node(row[COL - 1]));

    const centerNode = new Deque();

    for (const col of row.slice(1, COL - 1)) {
      centerNode.push(new Node(col));
    }
    center.push(new Node(centerNode));
  }

  const shiftRow = () => {
    leftCol.pushLeft(leftCol.pop());
    rightCol.pushLeft(rightCol.pop());
    center.pushLeft(center.pop());
  };

  const rotate = () => {
    center.head.value.pushLeft(leftCol.popLeft());
    rightCol.pushLeft(center.head.value.pop());
    center.tail.value.push(rightCol.pop());
    leftCol.push(center.tail.value.popLeft());
  };

  for (const operation of operations) {
    if (operation === OPERATION.shiftRow) shiftRow();
    else rotate();
  }

  const answer = [];
  for (let i = 0; i < rc.length; i++) {
    const temp = [];
    temp.push(leftCol.popLeft().value);
    const nums = center.popLeft().value;
    while (nums.head) {
      temp.push(nums.popLeft().value);
    }
    temp.push(rightCol.popLeft().value);

    answer.push(temp);
  }

  return answer;
}

solution(
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  ["Rotate", "ShiftRow"]
);
