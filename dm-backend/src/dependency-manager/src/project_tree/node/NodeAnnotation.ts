import Annotation from '../Annotation';

class NodeAnnotation extends Annotation {
  private type: string

  private info: string

  constructor(type: string, info: string) {
    super();
    this.type = type;
    this.info = info;
  }
}

export default NodeAnnotation;
