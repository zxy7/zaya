#!/usr/bin/env node
console.log('hi zaya~')
const { program } = require('commander')

program.version(require('../package.json').version,'-v, -V, --version', 'output the current version')
.description('这是zaya')
.usage('<command> [options]')
.parse(process.argv)

program.command('help')
.alias('-h')
.description('帮助命令')
.action(function(name, other) {
    console.log(`
这是zayahahahah

支持的命令:
  version, -v,-V 输出当前框架的版本
  help,-h 输出帮助程序

Example call:
    $ zaya <command> --help`)
    }).parse(process.argv);
