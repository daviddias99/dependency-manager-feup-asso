import Dependable from '../Dependable';
import NodeAnnotation from './NodeAnnotation';
import NodeVisitor from './NodeVisitor';

abstract class NodeDependable extends Dependable {
  private _isNpm: boolean;

  private dependencies: NodeDependable[];

  protected annotations: NodeAnnotation[];

  constructor(name: string, id: string, dependencies: NodeDependable[] = [], annotations: NodeAnnotation[] = [], isNpm: boolean = false) {
    super(name, id);
    this.annotations = annotations;
    this.dependencies = dependencies;
    this._isNpm = isNpm;
  }

  public set isNpm(value: boolean) {
    this._isNpm = value;
  }

  public get isNpm() {
    return this._isNpm;
  }

  public addDependency(dependency: NodeDependable): void {
    this.dependencies.push(dependency);
  }

  public getDependencies(): NodeDependable[] {
    return this.dependencies;
  }

  public addAnnotation(annotation: NodeAnnotation): void {
    this.annotations.push(annotation);
  }

  public getAnnotations(): NodeAnnotation[] {
    return this.annotations;
  }

  public abstract accept(visitor: NodeVisitor): void;
}

export default NodeDependable;
