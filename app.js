"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Directory_1 = require("./Entities/Directory");
const File_1 = require("./Entities/File");
const service_1 = require("./service");
class App {
    static main() {
        service_1.Api.AddDir(10, 'dir1', Directory_1.DirectoryColor.Blue);
        service_1.Api.AddDir(11, 'dir2', Directory_1.DirectoryColor.Red);
        service_1.Api.AddDir(12, 'dir3', Directory_1.DirectoryColor.Blue);
        service_1.Api.AddDir(13, 'dir4', Directory_1.DirectoryColor.Red, 10);
        service_1.Api.AddFile(148, 'file0', File_1.FileColor.White, 11);
        service_1.Api.RemoveDir(11);
        service_1.Api.AddDir(133, 'dir5', Directory_1.DirectoryColor.Green);
        service_1.Api.AddFile(144, 'file1', File_1.FileColor.White, 13);
        service_1.Api.MoveFile(144, 10);
        service_1.Api.AddFile(143, 'file2', File_1.FileColor.Blue, 12);
        service_1.Api.AddFile(145, 'file3', File_1.FileColor.White, 12);
        service_1.Api.RemoveFile(145);
        service_1.Api.MoveDir(133, 12);
        service_1.Api.Print();
    }
}
App.main();
//# sourceMappingURL=app.js.map