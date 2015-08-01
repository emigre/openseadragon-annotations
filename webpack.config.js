module.exports = {
    entry: "./src/openseadragon-annotations.js",
    output: {
        path: './dist',
        filename: "openseadragon-annotations.js",
        libraryTarget: "umd"
    },
    externals: {
        "OpenSeadragon": "OpenSeadragon"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    }
};
