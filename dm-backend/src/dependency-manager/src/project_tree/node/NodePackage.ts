import NodeDependable from './NodeDependable';
import NodeVisitor from './NodeVisitor';

class NodePackage extends NodeDependable {
  public accept(visitor: NodeVisitor): void {
    visitor.visitPackage(this);
  }
}

export default NodePackage;
