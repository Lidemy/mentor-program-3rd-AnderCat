function Stack() {
  const list = [];
  this.push = (n) => {
    const len = list.length;
    list[len] = n;
  };
  this.pop = () => {
    const popnum = list[list.length - 1];
    list.splice(-1, 1);
    return popnum;
  };
}

function Queue() {
  const list = [];
  this.push = (n) => {
    list[list.length] = n;
  };
  this.pop = () => {
    const popnum = list[0];
    list.splice(0, 1);
    return popnum;
  };
}
const stack = new Stack();
stack.push(10);
stack.push(5);
console.log(stack.pop());
console.log(stack.pop());


const queue = new Queue();
queue.push(1);
queue.push(2);
console.log(queue.pop());
console.log(queue.pop());
