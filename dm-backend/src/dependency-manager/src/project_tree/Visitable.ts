import Visitor from './Visitor';

interface Visitable {
  accept(visitor: Visitor): void
}

export default Visitable;
