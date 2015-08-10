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
    // devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    stage: 1
                }
            },
            {
                test: /\.png$/,
                loader: 'url-loader'
            }
        ]
    }
};
