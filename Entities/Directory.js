"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Directory = exports.DirectoryColor = void 0;
var DirectoryColor;
(function (DirectoryColor) {
    DirectoryColor[DirectoryColor["Red"] = 0] = "Red";
    DirectoryColor[DirectoryColor["Green"] = 1] = "Green";
    DirectoryColor[DirectoryColor["Blue"] = 2] = "Blue";
})(DirectoryColor = exports.DirectoryColor || (exports.DirectoryColor = {}));
class Directory {
    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = DirectoryColor[color];
    }
    get Id() { return this.id; }
    set Id(value) { this.id = value; }
    get Name() { return this.name; }
    set Name(value) { this.name = value; }
    get Color() { return this.color; }
}
exports.Directory = Directory;
//# sourceMappingURL=Directory.js.map