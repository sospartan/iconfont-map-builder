#!/usr/bin/env node
/**
 * Created by sospartan on 11/24/15.
 */

var fs = require('fs');
var Common = require('./common');

function buildCodePoints(cfg){
    var file = cfg.src;
    var map = new Map();
    var mapFile = file+'-iconmap.js';

    var groups = fs.readFileSync(file, {encoding:'utf-8'}).split('\n');
    groups.map((elem)=>{
        var parts = elem.split(/\s+/);
        if(parts[0]) {
            map[parts[0]] = parseInt(parts[1],16);
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
        } else if (argv.indexOf('-f') > 0 ) {
            var file = argv[argv.indexOf('-f') + 1];
            buildCodePoints({src: file});
            console.log('icon map file generated.')
            return;
        }
    }catch(e){
        console.error(e);
    }
    Common.printUsage();
}else{
    module.exports = buildCodePoints;
}