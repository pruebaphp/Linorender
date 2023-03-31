import path from 'path';
export default {
    mode: 'development',
    entry: {
        eliminarUsuario: './src/eliminarUsuario.js',
    },
    output: {
      path: path.resolve('./public/js'),
      filename: '[name].js',
    },
  }


