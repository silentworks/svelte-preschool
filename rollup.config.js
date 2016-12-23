import serve from 'rollup-plugin-serve'
import svelte from 'rollup-plugin-svelte';

export default {
  entry: 'app/index.js',
  dest: 'build/bundle.js',
  format: 'es',
  plugins: [
    svelte({
      // By default, all .html and .svelte files are compiled
      extensions: [ '.html' ],

      // You can restrict which files are compiled
      // using `include` and `exclude`
      include: 'app/components/**.html'
    }),
    serve({
      // Folder to serve files from,
      contentBase: '',
    
      // Set to true to return index.html instead of 404
      historyApiFallback: true,
    
      // Options used in setting up server
      host: 'localhost',
      port: 9200
    })
  ]
}