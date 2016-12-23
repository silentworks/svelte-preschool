import svelte from 'rollup-plugin-svelte';
import buble from 'rollup-plugin-buble';

var pkg = require('./package.json');

export default {
  entry: 'app/index.js',
  dest: 'dist/bundle-' + pkg.version + '.js',
  format: 'es',
  plugins: [
    svelte({
      // By default, all .html and .svelte files are compiled
      extensions: [ '.html' ],

      // You can restrict which files are compiled
      // using `include` and `exclude`
      include: 'app/components/**.html'
    }),
    buble()
  ]
}