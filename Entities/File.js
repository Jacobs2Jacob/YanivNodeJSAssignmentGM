"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = exports.FileColor = void 0;
var FileColor;
(function (FileColor) {
    FileColor[FileColor["Blue"] = 0] = "Blue";
    FileColor[FileColor["White"] = 1] = "White";
})(FileColor = exports.FileColor || (exports.FileColor = {}));
class File {
    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = FileColor[color];
    }
    get Id() { return this.id; }
    set Id(value) { this.id = value; }
    get Name() { return this.name; }
    set Name(value) { this.name = value; }
    get Color() { return this.color; }
}
exports.File = File;
//# sourceMappingURL=File.js.map