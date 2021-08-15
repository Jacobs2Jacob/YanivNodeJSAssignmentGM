import { Directory, DirectoryColor } from "./Entities/Directory";
import { File, FileColor } from "./Entities/File";

export class Api
{
    private static dirs = '';
    private static files = '';

    public static AddDir(id: number, name: string[32], color: DirectoryColor, parentId?: number): void
    {
        const dir = new Directory(id, name, color);
        const structuredStr = this.GenerateStracturedString(dir, parentId);
        this.dirs = this.dirs.concat(structuredStr);
    }

    public static RemoveDir(id: number): void
    {
        const startIndex = this.dirs.lastIndexOf('parentId', this.dirs.indexOf(`id:${id}`));
        const endIndex = this.dirs.indexOf('|', startIndex);
        this.dirs = this.dirs.replace(this.dirs.substring(startIndex, endIndex + 1), "");
        this.RemoveSubFiles(id);
        this.RemoveSubDirs(id);
    }

    public static RemoveFile(id: number): void {
        const startIndex = this.files.lastIndexOf('parentId', this.files.indexOf(`id:${id}`));
        const endIndex = this.files.indexOf('|', startIndex);
        this.files = this.files.replace(this.files.substring(startIndex, endIndex + 1), "");
    }

    public static MoveFile(id: number, parentId: number): void
    {
        const startIndex = this.files.lastIndexOf('parentId', this.files.indexOf(`id:${id}`));
        const endIndex = this.files.indexOf('|', startIndex);
        let file = this.files.slice(startIndex, endIndex + 1);
        file = file.replace(new RegExp(/[^,]*/), `parentId:${parentId}`);
        this.files = this.files.concat(file);
        this.files = this.files.replace(this.files.substring(startIndex, endIndex + 1), "");

        if (this.files.charAt(0) == '|')
            this.files = this.files.replace('|', "");
    }

    public static MoveDir(id: number, parentId: number): void {
        const startIndex = this.dirs.lastIndexOf('parentId', this.dirs.indexOf(`id:${id}`));
        const endIndex = this.dirs.indexOf('|', startIndex);
        let dir = this.dirs.slice(startIndex, endIndex + 1);
        dir = dir.replace(new RegExp(/[^,]*/), `parentId:${parentId}`);
        this.dirs = this.dirs.concat(dir);
        this.dirs = this.dirs.replace(this.dirs.substring(startIndex, endIndex + 1), "");

        if (this.files.charAt(0) == '|')
            this.files = this.files.replace('|', "");
    }

    public static AddFile(id: number, name: string[32], color: FileColor, parentId: number): void
    {
        if (this.dirs.includes(`id:${parentId}`)) {
            const file = new File(id, name, color);
            const structuredStr = this.GenerateStracturedString(file, parentId);
            this.files = this.files.concat(structuredStr);
        }
    }
     
    public static Print(): void
    {
        console.log('\n Directories: \n', this.dirs.replace(new RegExp('[|]', 'g'), '\n'));
        console.log('Files: \n', this.files.replace(new RegExp('[|]', 'g'), '\n'));
    }

    private static RemoveSubFiles(id: number): void
    {
        while (this.files.indexOf(`parentId:${id}`) != -1) {
            const startIndex = this.files.indexOf(`parentId:${id}`);
            const endIndex = this.files.indexOf(`|`, startIndex);
            this.files = this.files.replace(this.files.substring(startIndex, endIndex + 1), "");
        }
    }

    private static RemoveSubDirs(id: number): void {
        while (this.dirs.indexOf(`parentId:${id}`) != -1) {
            const startIndex = this.dirs.indexOf(`parentId:${id}`);
            const endIndex = this.dirs.indexOf(`|`, startIndex);
            const dir = this.dirs.substring(startIndex, endIndex + 1);
            this.dirs = this.dirs.replace(dir, "");
            const subDirID = parseInt(dir.substring(dir.lastIndexOf('id:') + 3, dir.indexOf(',', dir.lastIndexOf('id:'))));
            this.RemoveSubFiles(subDirID);
        }
    }

    private static GenerateStracturedString(obj: any, parentId: number): string
    {
        let res = parentId ? `parentId:${parentId},` : `parentId:null,`;

        if (parentId)
            res = `parentId:${parentId},`;
          
        Object.keys(obj).forEach(key => {
            res += `${key}:${obj[key]},`;
        });

        res += '|';
        return res;
    }
}