# iconfont-map-builder  
Simple command tool to transform iconfont's css file to a js mapping moudle .

## Usage  
install this tool via npm  
`npm install iconfont-map-builder -g`  
  
now use 'iconmap' command to transform css file
`iconmap -f test/font-awesome-v4.4.0.css -p '^\.fa-([a-z0-9-]+?):before$'`

this command will generate a js  file (...-iconmap.js) in the same folder with css file. You can use it in your project in any way you like.  

Example:  

```javascript
var getIconChar = require('your-iconmap-file.js');

//react native render  
return (
<Text style={{fontFamily: 'fontawesome',fontSize:30}}>
map icon:{getIconChar('map')}
</Text>
);
```

