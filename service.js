"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const Directory_1 = require("./Entities/Directory");
const File_1 = require("./Entities/File");
class Api {
    static AddDir(id, name, color, parentId) {
        const dir = new Directory_1.Directory(id, name, color);
        const structuredStr = this.GenerateStracturedString(dir, parentId);
        this.dirs = this.dirs.concat(structuredStr);
    }
    static RemoveDir(id) {
        const startIndex = this.dirs.lastIndexOf('parentId', this.dirs.indexOf(`id:${id}`));
        const endIndex = this.dirs.indexOf('|', startIndex);
        this.dirs = this.dirs.replace(this.dirs.substring(startIndex, endIndex + 1), "");
        this.RemoveSubFiles(id);
        this.RemoveSubDirs(id);
    }
    static RemoveFile(id) {
        const startIndex = this.files.lastIndexOf('parentId', this.files.indexOf(`id:${id}`));
        const endIndex = this.files.indexOf('|', startIndex);
        this.files = this.files.replace(this.files.substring(startIndex, endIndex + 1), "");
    }
    static MoveFile(id, parentId) {
        const startIndex = this.files.lastIndexOf('parentId', this.files.indexOf(`id:${id}`));
        const endIndex = this.files.indexOf('|', startIndex);
        let file = this.files.slice(startIndex, endIndex + 1);
        file = file.replace(new RegExp(/[^,]*/), `parentId:${parentId}`);
        this.files = this.files.concat(file);
        this.files = this.files.replace(this.files.substring(startIndex, endIndex + 1), "");
        if (this.files.charAt(0) == '|')
            this.files = this.files.replace('|', "");
    }
    static MoveDir(id, parentId) {
        const startIndex = this.dirs.lastIndexOf('parentId', this.dirs.indexOf(`id:${id}`));
        const endIndex = this.dirs.indexOf('|', startIndex);
        let dir = this.dirs.slice(startIndex, endIndex + 1);
        dir = dir.replace(new RegExp(/[^,]*/), `parentId:${parentId}`);
        this.dirs = this.dirs.concat(dir);
        this.dirs = this.dirs.replace(this.dirs.substring(startIndex, endIndex + 1), "");
        if (this.files.charAt(0) == '|')
            this.files = this.files.replace('|', "");
    }
    static AddFile(id, name, color, parentId) {
        if (this.dirs.includes(`id:${parentId}`)) {
            const file = new File_1.File(id, name, color);
            const structuredStr = this.GenerateStracturedString(file, parentId);
            this.files = this.files.concat(structuredStr);
        }
    }
    static Print() {
        console.log('\n Directories: \n', this.dirs.replace(new RegExp('[|]', 'g'), '\n'));
        console.log('Files: \n', this.files.replace(new RegExp('[|]', 'g'), '\n'));
    }
    static RemoveSubFiles(id) {
        while (this.files.indexOf(`parentId:${id}`) != -1) {
            const startIndex = this.files.indexOf(`parentId:${id}`);
            const endIndex = this.files.indexOf(`|`, startIndex);
            this.files = this.files.replace(this.files.substring(startIndex, endIndex + 1), "");
        }
    }
    static RemoveSubDirs(id) {
        while (this.dirs.indexOf(`parentId:${id}`) != -1) {
            const startIndex = this.dirs.indexOf(`parentId:${id}`);
            const endIndex = this.dirs.indexOf(`|`, startIndex);
            const dir = this.dirs.substring(startIndex, endIndex + 1);
            this.dirs = this.dirs.replace(dir, "");
            const subDirID = parseInt(dir.substring(dir.lastIndexOf('id:') + 3, dir.indexOf(',', dir.lastIndexOf('id:'))));
            this.RemoveSubFiles(subDirID);
        }
    }
    static GenerateStracturedString(obj, parentId) {
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
exports.Api = Api;
Api.dirs = '';
Api.files = '';
//# sourceMappingURL=service.js.map