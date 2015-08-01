module.exports = {
    entry: "./src/openseadragon-annotations.js",
    output: {
        path: './dist',
        filename: "openseadragon-annotations.js",
        libraryTarget: "umd",
        library: "OpenSeadragon.annotations"
    },
    externals: {
        "OpenSeadragon": "OpenSeadragon"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' }
        ]
    }
};
