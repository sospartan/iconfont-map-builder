#!/usr/bin/env node
/**
 * Created by sospartan on 11/23/15.
 */

'use strict';

var fs = require('fs');
var CSSOM = require('cssom');


function buildCss(cfg){
        var file = cfg.src;
        var extractPattern = cfg.pattern;
        var nameGrp = cfg.nameGroupNum?cfg.nameGroupNum:1;
        var map = new Map();
        var mapFile = file+'-iconmap.js';

        var parsed = CSSOM.parse(fs.readFileSync(file, {encoding:'utf-8'}));
        parsed.cssRules
            .map((elem)=>{
                var selector = elem.selectorText;
                if(!selector||!elem.style.content){
                    return;
                }
                var selectorSplits = selector.split(',');
                for(let s of selectorSplits){
                    if(!s){
                        continue;
                    }
                    var matched = s.match(extractPattern);
                    if(matched){
                        var content = elem.style.content.replace(/"\\([0-9a-z]+)"/,'0x$1');
                        map[String(matched[nameGrp])] = parseInt(content);
                    }
                }
            });
        var output = [
            "/** Created by iconfont-map-builder */",
            "var map =",
            JSON.stringify(map),
            ";module.exports = (name)=>String.fromCharCode(map[name]);"];
        fs.writeFileSync(mapFile,output.join('\n'));
}

function printUsage(){
    console.log([
        'Usage:',
        "iconmap -f <css file> -p <extract pattern> [-n] [group number of icon's name in the regexp pattern,default 1]"
    ].join('\n'));
}

if(require.main === module){
    try {
        var argv = process.argv;
        if (argv.indexOf('-h')>-1 || argv.indexOf('--help')>-1) {
            printUsage();
            return;
        } else if (argv.indexOf('-f') > 0 && argv.indexOf('-p') > 0) {
            var file = argv[argv.indexOf('-f') + 1];
            var pattern = argv[argv.indexOf('-p') + 1];
            var num = argv.indexOf('-n') > 0 ? (argv.indexOf('-n') + 1) : 1;
            buildCss({src: file, pattern: pattern, nameGroupNum: num});
            console.log('icon map file generated.')
            return;
        }
    }catch(e){
        console.error(e);
    }
    printUsage();
}else{
    module.exports = buildCss;
}