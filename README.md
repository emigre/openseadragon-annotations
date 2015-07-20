This is a work in progress and is still in a very early stage.
 
Install [OpenSeadragon](https://openseadragon.github.io/), then install the plugin. 
 
```
bower install openseadragon --save
```
```
bower install openseadragon-annotations --save
```

Then create an OpenSeadragon viewer and run `initializeAnnotations()`. You need to pass the path to the image folder that contains the buttons as an argument.

```javascript
OpenSeadragon({
    id: 'viewer',
    showNavigator:  true,
    tileSources: 'http://openseadragon.github.io/example-images/highsmith/highsmith.dzi'
}).initializeAnnotations({
    imagePath: 'bower_components/openseadragon-annotations/img/'
});
```

