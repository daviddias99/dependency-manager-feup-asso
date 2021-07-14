import * as path from 'path';

class GitUtils {
    private shell: any = require('shelljs');
    private destFolderName: string = '';
    private readonly gitRepo: string;

    constructor(repo: string) {
        if (!this.shell.which('git')) {
            this.shell.echo('This module requires git installed')
            this.shell.exit(1);
        }
        this.gitRepo = repo
    }

    public getProjectPath(): string {
        return path.join(__dirname, '../projects', this.destFolderName);
    }

    public async cloneRepo() {
        this.destFolderName = GitUtils.hashFnv32a(this.gitRepo)
        this.shell.echo(this.destFolderName);
        if (this.shell.exec(`ls ${path.join(__dirname, '../projects')} | grep ${this.destFolderName}`).code === 0) {
            this.shell.echo('Pulling new content!')
            if (this.shell.exec(`cd ${path.join(__dirname, '../projects', this.destFolderName)} && git pull`).code !== 0) {
                this.shell.echo('Git pull failed')
                this.shell.exit(1)
            }
        } else {
            this.shell.echo('Cloning new project!')
            if (this.shell.exec(`git clone ${this.gitRepo} ${path.join(__dirname, '../projects', this.destFolderName)}`).code !== 0) {
                this.shell.echo('Git clone failed')
                this.shell.exit(1)
            }
        }
    }

    private static hashFnv32a(str: string): string {
        /*jshint bitwise:false */
        var i, l,
            hval: number = 0x811c9dc5

        for (i = 0, l = str.length; i < l; i++) {
            hval ^= str.charCodeAt(i);
            hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        }
        // Convert to 8 digit hex string
        return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
    }


}

export default GitUtils;
