const path = require('path');

module.exports = {
  entry: './src/index.js',  // Archivo de entrada principal
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',  // Nombre del archivo generado por Webpack
  },
  mode: 'development',  // Modo de desarrollo
  devServer: {
    static: './public',  // Carpeta para servir archivos estáticos
    port: 8080,  // Puerto del servidor de desarrollo
    open: true,  // Abrir el navegador automáticamente
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,  // Procesar archivos .js y .jsx
        exclude: /node_modules/,
        use: 'babel-loader',  // Usa babel-loader para JSX y JS
      },
      {
        test: /\.css$/,  // Procesar archivos CSS
        use: ['style-loader', 'css-loader'],  // Usa style-loader y css-loader
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Resolver archivos con estas extensiones
  },
};
