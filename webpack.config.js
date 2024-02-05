const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: "json-loader",
                type: "javascript/auto",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
                exclude: [
                    path.resolve(__dirname, "src/assets/icons"), // Exclude specific folder
                    path.resolve(__dirname, "src/images"), // Exclude another folder
                ],
            },
            {
                test: /\.svg$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "assets/icons/", // Adjust the output path as needed
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Savory Delights Restaurant",
            template: "./src/index.html",
            filename: "index.html",
        }),
    ],
};
