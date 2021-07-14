import { parse, encode, NodeProjectTree } from './src/project_tree/node/NodeProjectTree';
import NodeTreeDepthFirstIterator from './src/project_tree/node/NodeTreeDepthFirstIterator';
import NodeAuditVisitor from './src/project_tree/node/visitors/NodeAuditVisitor';
import GitUtils from './src/shelljs/GitUtils';

const madge = require('./src/adapted_modules/madge');

async function getDependencies(gitPath: string): Promise<any> {

  const gitModule = new GitUtils(gitPath);
  await gitModule.cloneRepo();
  const projectPath = gitModule.getProjectPath();
  const dependencies = await madge(projectPath, { includeNpm: true });
  const depObj = dependencies.obj();
  const name = projectPath.split('/');
  const tree: NodeProjectTree = parse(depObj, name[name.length - 1]);

  const auditVisitor: NodeAuditVisitor = new NodeAuditVisitor();
  const iterator: NodeTreeDepthFirstIterator = tree.getIterator();

  await auditVisitor.build(projectPath);
  while (!iterator.isDone) {
    iterator.currentItem()!.accept(auditVisitor);
    iterator.next();
  }

  return encode(tree);
}

export default getDependencies;
