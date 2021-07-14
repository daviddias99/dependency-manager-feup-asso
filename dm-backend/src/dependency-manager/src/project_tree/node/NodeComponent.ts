import NodeDependable from './NodeDependable';
import NodeVisitor from './NodeVisitor';

class NodeComponent extends NodeDependable {
  public accept(visitor: NodeVisitor): void {
    visitor.visitComponent(this);
  }
}

export default NodeComponent;
