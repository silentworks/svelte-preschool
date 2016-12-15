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
    })
  ]
}