import { DirectoryColor } from "./Entities/Directory";
import { FileColor } from "./Entities/File";
import { Api } from "./service";

class App {

    public static main() {
        Api.AddDir(10, 'dir1', DirectoryColor.Blue);
        Api.AddDir(11, 'dir2', DirectoryColor.Red);
        Api.AddDir(12, 'dir3', DirectoryColor.Blue);
        Api.AddDir(13, 'dir4', DirectoryColor.Red, 10);

        Api.AddFile(144, 'file1', FileColor.White, 13);
        Api.MoveFile(144, 10);
        Api.AddFile(148, 'file0', FileColor.White, 13);
        Api.AddFile(121, 'file01', FileColor.White, 10);
        Api.RemoveDir(10);

        Api.AddDir(133, 'dir5', DirectoryColor.Green);
        Api.AddFile(143, 'file2', FileColor.Blue, 12);
        Api.AddFile(145, 'file3', FileColor.White, 12);
        Api.RemoveFile(145);
        Api.MoveDir(133, 12);

        Api.Print();
    }
}

App.main();