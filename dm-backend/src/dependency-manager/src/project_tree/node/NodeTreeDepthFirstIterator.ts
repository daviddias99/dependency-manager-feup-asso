import NodeDependable from './NodeDependable';

class NodeTreeDepthFirstIterator {
  private root: NodeDependable;

  private current: NodeDependable | undefined;

  private visited: NodeDependable[];

  private toVisit: NodeDependable[];

  constructor(root: NodeDependable) {
    this.root = root;
    this.toVisit = [...this.root.getDependencies()];
    this.visited = [];
    this.current = root;
  }

  public first(): NodeDependable {
    return this.root;
  }

  public next(): void {
    if (this.isDone) {
      return;
    }

    this.visited.push(this.current!);
    this.current = this.toVisit.shift()!;

    if (this.current) {
      this.toVisit = [...this.current.getDependencies().filter((dep) => !this.visited.includes(dep) && !this.toVisit.includes(dep)), ...this.toVisit];
    }
  }

  public get isDone(): boolean {
    return this.toVisit.length === 0 && this.current === undefined;
  }

  public currentItem(): NodeDependable {
    if (!this.current) {
      throw new Error('Iteration over');
    }

    return this.current;
  }
}

export default NodeTreeDepthFirstIterator;
