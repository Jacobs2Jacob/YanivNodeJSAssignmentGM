
export enum DirectoryColor {
    Red = 0,
    Green = 1,
    Blue = 2
}
 
export class Directory
{
    private id: number;
    private name: string[32];
    private color: string;

    get Id(): number { return this.id }
    set Id(value: number) { this.id = value }

    get Name(): string[32] { return this.name }
    set Name(value: string[32]) { this.name = value }

    get Color(): string { return this.color }
    
    constructor(id: number, name: string[32], color: DirectoryColor)
    {
        this.id = id;
        this.name = name;
        this.color = DirectoryColor[color];
    }
}