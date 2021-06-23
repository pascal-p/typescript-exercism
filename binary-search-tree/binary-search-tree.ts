class TreeNode {
  data: any;
  left: TreeNode | undefined;
  right: TreeNode | undefined;

  constructor(data: any, left?: TreeNode | undefined, right?: TreeNode | undefined) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  _root: TreeNode | undefined;

  constructor(data: any) {
    if (typeof data === 'undefined') {
      this._root = undefined;
      return
    }
    this._root = new TreeNode(data);
  }

  get data(): any {
    if (typeof this._root === 'undefined') {
      throw new Error("Empty Tree");
    }
    return this._root.data;
  }

  get right(): TreeNode | undefined {
    if (typeof this._root === 'undefined') {
      throw new Error("Empty Tree");
    }
    return this._root.right;
  }

  get left(): TreeNode | undefined {
    if (typeof this._root === 'undefined') {
      throw new Error("Empty Tree");
    }
    return this._root.left;
  }

  insert(data: any): TreeNode | undefined {
    if (typeof data === 'undefined') {
      throw new Error("nothing to insert in current tree...");
    }

    const node = new TreeNode(data);
    if (typeof this._root === 'undefined') {
      return this._root = node;
    }
    return this._insert(this._root, this._root, node, 'left');
  }

  each(fn: any): TreeNode | undefined {
    return this._dfs_inf(this._root, fn);
  }

  // helpers

  private _insert(parent: TreeNode, root: TreeNode | undefined, node: TreeNode,
    dir = 'left'): TreeNode | undefined {
    if (typeof root === 'undefined') {
      if (dir === 'left') {
        parent.left = node;
      }
      else { // dir === 'right'
        parent.right = node;
      }
      return;
    }

    if (node.data < root.data) {
      return this._insert(root, root.left, node, 'left');
    }
    else if (node.data > root.data) {
      return this._insert(root, root.right, node, 'right');
    }
    else {
      this._insert(root, root.left, node, 'left');
    }
  }

  private _dfs_inf(root: TreeNode | undefined, fn: any): TreeNode | undefined {
    if (typeof root === 'undefined') { return undefined; }
    this._dfs_inf(root.left, fn);
    fn(root.data);
    return this._dfs_inf(root.right, fn);
  }

}

export default BinarySearchTree;
