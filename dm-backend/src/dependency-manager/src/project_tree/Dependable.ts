import Visitor from './Visitor';
import Annotation from './Annotation';
import Visitable from './Visitable';

abstract class Dependable implements Visitable {
  private name: string;

  private id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public getId(): string {
    return this.id;
  }

  public abstract addAnnotation(annotation: Annotation): void;

  public abstract getAnnotations(): void;

  public abstract accept(visitor: Visitor): void

  public abstract addDependency(dependency: Dependable): void;

  public abstract getDependencies(): Dependable[];
}

export default Dependable;
