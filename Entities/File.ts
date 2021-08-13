

export enum FileColor {
    Blue = 0,
    White = 1
}

export class File {
    private id: number;
    private name: string[32];
    private color: string;

    get Id(): number { return this.id }
    set Id(value: number) { this.id = value }

    get Name(): string[32] { return this.name }
    set Name(value: string[32]) { this.name = value }

    get Color(): string { return this.color }

    constructor(id: number, name: string[32], color: FileColor) {
        this.id = id;
        this.name = name;
        this.color = FileColor[color];
    }
}