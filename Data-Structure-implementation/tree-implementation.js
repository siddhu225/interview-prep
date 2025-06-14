
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

const a = new TreeNode('a');
const b = new TreeNode('b');
const c = new TreeNode('c');
const d = new TreeNode('d');
const e = new TreeNode('e');
const f = new TreeNode('f');

a.left = b;
a.right = c;

b.left = d;
b.right = e;

c.right = f;


function DepthFirstTraversal(root) {
    if (!root) {
        return [];
    }

    const result = [];
    const stack = [];

    stack.push(root);

    while (stack.length > 0) {
        const current = stack.pop();
        result.push(current.data);

        if (current.right) {
            stack.push(current.right);
        }

        if (current.left) {
            stack.push(current.left);
        }
    }

    return result;
}

function breadthFirstTraversal(root) {
  if (!root) {
    return [];
  }

  const result = [];
  const queue = [];

  queue.push(root);

  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current.data);

    if (current.left) {
      queue.push(current.left);
    }

    if (current.right) {
      queue.push(current.right);
    }
  }

  return result;
}

MediaSourceHandle.exports = TreeNode;
