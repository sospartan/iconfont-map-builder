
'use strict';

function testTransform() {
    var transform = require('./index');

    transform({
            src: './test/font-awesome-v4.4.0.css',
            pattern: /^\.fa-([a-z0-9-]+?):before$/
        });
}

function useGenerated(){
    var getIcon = require('./test/font-awesome-v4.4.0.css-iconmap');
    console.log(getIcon('map'));
}

useGenerated();
