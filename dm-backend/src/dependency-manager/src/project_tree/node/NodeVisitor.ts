import Visitor from '../Visitor';
import NodeComponent from './NodeComponent';
import NodePackage from './NodePackage';

abstract class NodeVisitor implements Visitor {
  public abstract visitPackage(pack: NodePackage): void;

  public abstract visitComponent(component: NodeComponent): void;
}

export default NodeVisitor;
