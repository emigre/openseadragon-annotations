This plugin allows you to draw vector annotations over [OpenSeadragon](https://openseadragon.github.io/) deep zoom images. The plugin creates the drawings on a SVG overlay that scales with the image.

![Preview](img/preview.gif)

## Usage

### Installation

You will need both OpenSeadragon and this plugin. You can [download](https://github.com/Emigre/openseadragon-annotations/releases) the plugin manually or install it with a package manager like Bower or npm.

```console
npm install openseadragon openseadragon-annotations --save-dev
```

Once OpenSeadragon and the plugin are included in your page, you can start an OpenSeadragon viewer with the plugin in this way:

```javascript
const viewer = OpenSeadragon({
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

const annotations = new OpenSeadragon.Annotations({ viewer });
```

The viewer screen will have an additional set of icons at the bottom-left side, that you can use to toggle the drawing mode and draw annotatations over the image.

### Supported Browsers

The plugin works on Chrome, Firefox, Opera and Safari. Internet Explorer 9 and above and Microsoft Edge are also supported, but performance is worse in them due to their lack of support for the `vector-effect` SVG attribute.
