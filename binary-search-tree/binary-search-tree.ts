type TTreeNode<T> = TreeNode<T> | undefined;

class TreeNode<T> {
  data: T;
  left: TTreeNode<T>;
  right: TTreeNode<T>;

  constructor(data: T, left?: TreeNode<T> | undefined, right?: TreeNode<T> | undefined) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree<T> {
  _root: TTreeNode<T>;

  constructor(data: T) {
    if (this.isUndefinedOrNull(data))  {
      this._root = undefined;
      return;
    }
    this._root = new TreeNode(data);
  }

  get data(): T {
    if (this.isUndefinedOrNull(this._root)) {
      throw new Error("Empty Tree");
    }
    return this._root!.data;
  }

  get right(): TTreeNode<T> {
    if (typeof this._root === 'undefined') {
      throw new Error("Empty Tree");
    }
    return this._root.right;
  }

  get left(): TTreeNode<T> {
    if (typeof this._root === 'undefined') {
      throw new Error("Empty Tree");
    }
    return this._root.left;
  }

  insert(data: T): TTreeNode<T> {
    if (this.isUndefinedOrNull(data)) {
      throw new Error("nothing to insert in current tree...");
    }

    const node = new TreeNode(data);
    if (this.isUndefinedOrNull(this._root)) {
      return this._root = node;
    }

    return this._insert(this._root as TreeNode<T>, this._root as TreeNode<T>, node, 'left');
  }

  each(fn: (_a: T) => any): TTreeNode<T> {
    return this._dfs_inf(this._root, fn);
  }

  // helpers
  private _insert(parent: TreeNode<T>, root: TTreeNode<T>, node: TreeNode<T>, dir = 'left'): TTreeNode<T> {
    if (this.isUndefinedOrNull(root)) {
      if (dir === 'left') {
        parent.left = node;
      }
      else { // dir === 'right'
        parent.right = node;
      }
      return;
    }

    if (node.data < root!.data) {
      return this._insert(root!, root!.left, node, 'left');
    }

    if (node.data > root!.data) {
      return this._insert(root!, root!.right, node, 'right');
    }

    this._insert(root!, root!.left, node, 'left');
  }

  private _dfs_inf(root: TTreeNode<T>, fn: (_a: T) => any): TTreeNode<T> {
    if (typeof root === 'undefined') { return undefined; }
    this._dfs_inf(root.left, fn);
    fn(root.data);
    return this._dfs_inf(root.right, fn);
  }

  private isUndefinedOrNull(data: T | TTreeNode<T> | null): boolean {
    return typeof data === 'undefined' || data === null;
  }
}

export default BinarySearchTree;
