module.exports = {
  entry: {
    main: './entry/main.js',
    
  },
  output: {
    filename: '[name].js'
  },
  module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
