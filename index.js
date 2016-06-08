#!/usr/bin/env node
/**
 * Created by sospartan on 11/23/15.
 */

'use strict';

var fs = require('fs');
var CSSOM = require('cssom');
var Common = require('./common');


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
                        var content = elem.style.content.replace(/"\\([0-9A-Za-z]+)"/,'0x$1');
                        map[matched[nameGrp]] = parseInt(content);
                    }
                }
            });

        fs.writeFileSync(mapFile,Common.generateModule(map));
}



if(require.main === module){
    try {
        var argv = process.argv;
        if (argv.indexOf('-h')>-1 || argv.indexOf('--help')>-1) {
            Common.printUsage();
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
    Common.printUsage();
}else{
    module.exports = buildCss;
}
