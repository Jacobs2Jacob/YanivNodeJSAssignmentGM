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
        const startIndex = this.dirs.lastIndexOf('ParentId', this.dirs.indexOf(`Id:${id}`));
        const endIndex = this.dirs.indexOf('|', startIndex);
        this.dirs = this.dirs.replace(this.dirs.substring(startIndex, endIndex + 1), "");
        this.RemoveSubDirs(id);
    }
    static RemoveFile(id) {
        const startIndex = this.files.lastIndexOf('ParentId', this.files.indexOf(`Id:${id}`));
        const endIndex = this.files.indexOf('|', startIndex);
        this.files = this.files.replace(this.files.substring(startIndex, endIndex + 1), "");
    }
    static MoveFile(id, parentId) {
        const startIndex = this.files.lastIndexOf('ParentId', this.files.indexOf(`Id:${id}`));
        const endIndex = this.files.indexOf('|', startIndex);
        let file = this.files.slice(startIndex, endIndex + 1);
        file = file.replace(new RegExp(/[^,]*/), `ParentId:${parentId}`);
        this.files = this.files.concat(file);
        this.files = this.files.replace(this.files.substring(startIndex, endIndex), "");
        if (this.files.charAt(0) == '|')
            this.files = this.files.replace('|', "");
    }
    static MoveDir(id, parentId) {
        const startIndex = this.dirs.lastIndexOf('ParentId', this.dirs.indexOf(`Id:${id}`));
        const endIndex = this.dirs.indexOf('|', startIndex);
        let dir = this.dirs.slice(startIndex, endIndex + 1);
        dir = dir.replace(new RegExp(/[^,]*/), `ParentId:${parentId}`);
        this.dirs = this.dirs.concat(dir);
        this.dirs = this.dirs.replace(this.dirs.substring(startIndex, endIndex), "");
        if (this.files.charAt(0) == '|')
            this.files = this.files.replace('|', "");
    }
    static AddFile(id, name, color, parentId) {
        const file = new File_1.File(id, name, color);
        const structuredStr = this.GenerateStracturedString(file, parentId);
        this.files = this.files.concat(structuredStr);
    }
    static Print() {
        console.log('\n Directories: \n', this.dirs.replace('||', '|').replace(new RegExp('[|]', 'g'), '\n'));
        console.log('Files: \n', this.files.replace('||', '|').replace(new RegExp('[|]', 'g'), '\n'));
    }
    static RemoveSubDirs(id) {
        while (this.dirs.indexOf(`ParentId:${id}`) != -1) {
            const startIndex = this.dirs.indexOf(`ParentId:${id}`);
            const endIndex = this.dirs.indexOf(`|`, startIndex);
            this.dirs = this.dirs.replace(this.dirs.substring(startIndex, endIndex), "");
        }
    }
    static GenerateStracturedString(obj, parentId) {
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
exports.Api = Api;
Api.dirs = '';
Api.files = '';
//# sourceMappingURL=service.js.map