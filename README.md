This is a work in progress and is still in a very early stage.

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

Create an OpenSeadragon viewer and run `initializeAnnotations()` to start using the plugin.

```javascript
var viewer = OpenSeadragon({
    id: 'viewer',
    showNavigator:  true,
    tileSources: 'http://openseadragon.github.io/example-images/highsmith/highsmith.dzi'
});

viewer.initializeAnnotations();
```

