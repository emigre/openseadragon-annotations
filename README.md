Install [OpenSeadragon](https://openseadragon.github.io/), then install the plugin. You can install both with [Bower](http://bower.io/).

```
bower install openseadragon --save
bower install openseadragon-annotations --save
```

Include them in your project.

```html
<script src="bower_components/openseadragon/built-openseadragon/openseadragon/openseadragon.js"></script>
<script src="bower_components/openseadragon-annotations/dist/openseadragon-annotations.min.js"></script>

```

Create an OpenSeadragon viewer and run `initializeAnnotations()` to start drawing annotations.

```javascript
var viewer = OpenSeadragon({
    id: 'viewer',
    showNavigator:  true,
    tileSources: 'http://openseadragon.github.io/example-images/highsmith/highsmith.dzi'
});

viewer.initializeAnnotations();
```

The plugin stores the drawings on a SVG overlay that scales with the deep zoom image.

Your OpenSeadragon viewer will gain an `annotations` object that you can use to interact with the plugin. 

`annotations.export()` 

Returns the SVG with the annotations as a string

`annotations.import()` 

Takes a previously exported string and updates the overlay with it

`annotations.reset()` 

Removes all the annotations from the overlay
