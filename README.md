This plugin allows you to draw vector annotations over [OpenSeadragon](https://openseadragon.github.io/) deep zoom images. The plugin creates the drawings on a SVG overlay that scales with the image.

![Preview](img/preview.gif)

To use it, add both OpenSeadragon and the plugin as dependencies in your project. You could do it with [Bower](http://bower.io/).

```
bower install openseadragon --save
bower install openseadragon-annotations --save
```

Then load them in your page somehow, for example by including them as `<script>` elements.

```html
<script src="bower_components/openseadragon/built-openseadragon/openseadragon/openseadragon.js"></script>
<script src="bower_components/openseadragon-annotations/dist/openseadragon-annotations.min.js"></script>

```

Now you can create an OpenSeadragon viewer and initialize the plugin with `initializeAnnotations()` to start drawing annotations.

```javascript
var viewer = OpenSeadragon({
    id: 'viewer',
    showNavigator:  true,
    tileSources: {
        Image: {
            xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
            Url: 'http://content.zoomhub.net/dzis/TDbz_files/',
            Format: 'jpg',
            Overlap: '1',
            TileSize: '254',
            ServerFormat: 'Default',
            Size: {
                Height: '4409',
                Width: '7793'
            }
        }
    }
});

viewer.initializeAnnotations();
```

Your OpenSeadragon viewer will gain an `annotations` object that you can use to interact with the plugin. 

`viewer.annotations.export()` 

Returns the SVG with the annotations as a string

`viewer.annotations.import()` 

Takes a previously exported string and updates the overlay with it

`viewer.annotations.reset()` 

Removes all the annotations from the overlay
