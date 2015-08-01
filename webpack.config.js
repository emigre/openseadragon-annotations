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
            {
                test: /\.(png|jpg|gif)$/,
                loaders: [
                    'file?hash=sha512&digest=hex&name=img/[name].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    }
};
