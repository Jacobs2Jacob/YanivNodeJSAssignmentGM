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
        const startIndex = this.dirs.lastIndexOf('ParentId', this.dirs.indexOf(`Id:${id}`));
        const endIndex = this.dirs.indexOf('|', startIndex);
        this.dirs = this.dirs.replace(this.dirs.substring(startIndex, endIndex + 1), "");
        this.RemoveSubFiles(id);
        this.RemoveSubDirs(id);
    }

    public static RemoveFile(id: number): void {
        const startIndex = this.files.lastIndexOf('ParentId', this.files.indexOf(`Id:${id}`));
        const endIndex = this.files.indexOf('|', startIndex);
        this.files = this.files.replace(this.files.substring(startIndex, endIndex + 1), "");
    }

    public static MoveFile(id: number, parentId: number): void
    {
        const startIndex = this.files.lastIndexOf('ParentId', this.files.indexOf(`Id:${id}`));
        const endIndex = this.files.indexOf('|', startIndex);
        let file = this.files.slice(startIndex, endIndex + 1);
        file = file.replace(new RegExp(/[^,]*/), `ParentId:${parentId}`);
        this.files = this.files.concat(file);
        this.files = this.files.replace(this.files.substring(startIndex, endIndex), "");

        if (this.files.charAt(0) == '|')
            this.files = this.files.replace('|', "");
    }

    public static MoveDir(id: number, parentId: number): void {
        const startIndex = this.dirs.lastIndexOf('ParentId', this.dirs.indexOf(`Id:${id}`));
        const endIndex = this.dirs.indexOf('|', startIndex);
        let dir = this.dirs.slice(startIndex, endIndex + 1);
        dir = dir.replace(new RegExp(/[^,]*/), `ParentId:${parentId}`);
        this.dirs = this.dirs.concat(dir);
        this.dirs = this.dirs.replace(this.dirs.substring(startIndex, endIndex), "");

        if (this.files.charAt(0) == '|')
            this.files = this.files.replace('|', "");
    }

    public static AddFile(id: number, name: string[32], color: FileColor, parentId: number): void
    {
        const file = new File(id, name, color);
        const structuredStr = this.GenerateStracturedString(file, parentId);
        this.files = this.files.concat(structuredStr);
    }
     
    public static Print(): void
    {
        console.log('\n Directories: \n', this.dirs.replace('||', '|').replace(new RegExp('[|]', 'g'), '\n'));
        console.log('Files: \n', this.files.replace('||', '|').replace(new RegExp('[|]', 'g'), '\n'));
    }

    private static RemoveSubFiles(id: number): void
    {
        while (this.files.indexOf(`ParentId:${id}`) != -1) {
            const startIndex = this.files.indexOf(`ParentId:${id}`);
            const endIndex = this.files.indexOf(`|`, startIndex);
            this.files = this.files.replace(this.files.substring(startIndex, endIndex), "");
        }
    }

    private static RemoveSubDirs(id: number): void {
        while (this.dirs.indexOf(`ParentId:${id}`) != -1) {
            const startIndex = this.dirs.indexOf(`ParentId:${id}`);
            const endIndex = this.dirs.indexOf(`|`, startIndex);
            this.dirs = this.dirs.replace(this.dirs.substring(startIndex, endIndex), "");
            this.RemoveSubFiles(id);
        }
    }

    private static GenerateStracturedString(obj: any, parentId: number): string
    {
        let res = parentId ? `ParentId:${parentId},` : `ParentId:N/A,`;

        if (parentId)
            res = `ParentId:${parentId},`;
          
        Object.keys(obj).forEach(key => {
            res += `${key}:${obj[key]},`;
        });

        res += '|';
        return res;
    }
}