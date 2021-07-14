import exec from 'child_process';
import util from 'util';
import NodeAnnotation from '../NodeAnnotation';

import NodeComponent from '../NodeComponent';
import NodePackage from '../NodePackage';
import NodeVisitor from '../NodeVisitor';

class NodeAuditVisitor extends NodeVisitor {
  private auditResult: any = {};

  private parsedResult: any = {};

  private requiresAnalysis: boolean = false;

  public async build(projectPath: string) {
    const ex = util.promisify(exec.exec);

    try {
      const p = await ex('npm audit --json', { cwd: projectPath });
      this.auditResult = JSON.parse(p.stdout);

      if (this.auditResult.vulnerabilities !== {}) this.requiresAnalysis = true;
    } catch (error) {
      console.error(error);
    }
  }

  public findProblems(name: string): NodeAnnotation[] {
    if (!this.requiresAnalysis || !this.auditResult.vulnerabilities[name]) {
      return [];
    }

    const annotations: NodeAnnotation[] = [];

    const vulnerabilities = this.auditResult.vulnerabilities[name];

    for (const info of vulnerabilities.via) {
      annotations.push(new NodeAnnotation('Security', info.title));
    }

    return annotations;
  }

  public visitPackage(pack: NodePackage): void {
    if (!pack.isNpm) {
      return;
    }

    const annotations: NodeAnnotation[] = this.findProblems(pack.getName());
    annotations.forEach((annotation) => pack.addAnnotation(annotation));
  }

  public visitComponent(component: NodeComponent): void {
    // pass
  }
}

export default NodeAuditVisitor;
