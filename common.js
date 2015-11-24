/**
 * Created by sospartan on 11/24/15.
 */
'use strict';

module.exports = {
    printUsage:()=>{
        console.log([
          'Usage:',
          "- transform css file:",
          " iconmap -f <css file> -p <extract pattern> [-n] [group number of icon's name in the regexp pattern,default 1]",
          "",
          "- transform codepoint file:",
          " iconmap-codepoint -f <codepoint file>"
        ].join('\n'));
    },
    generateModule:(map)=>{
        return [
            "/** Created by iconfont-map-builder */",
            "var map =",
            JSON.stringify(map),
            ";module.exports = (name)=>String.fromCharCode(map[name]);"].join('\n');
    }
};