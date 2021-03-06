"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const chokidar = require("chokidar");
const j2a_1 = require("./utils/j2a");
const program = new commander.Command();
program
    .description("convert path/to/*.json to path/to/*.any")
    .version(require("../package.json").version)
    .option("-i, --input <path>", "json source directory path")
    .option("-o, --output <path>", "export directory path")
    .option("-t, --type <type>", "typescript dart", "typescript")
    .option("-w, --watch", "watch mode");
program.parse(process.argv);
function main() {
    const { input, output, type = "typescript", watch } = program;
    let parseType = j2a_1.ParseType[type];
    if (!parseType) {
        console.log(`type <${type}> is not support`);
        return;
    }
    if (!input || !output) {
        console.log("j2a -i dir/input -o dir/output --typescript");
        return;
    }
    if (watch) {
        chokidar.watch(input).on("all", (event, path) => {
            if (!["add", "change"].includes(event))
                return;
            console.log(`${event} ${path}`);
            let paths = path.split("/");
            let fileName = paths[paths.length - 1];
            j2a_1.j2aFile(input, fileName, output, parseType);
        });
        return;
    }
    j2a_1.j2a(input, output, parseType);
}
main();
