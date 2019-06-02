import vue from "rollup-plugin-vue"; // Handle .vue SFC files
import buble from "rollup-plugin-buble"; // Transpile/polyfill with reasonable browser support
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
console.log(('es' in process.argv))
export default {
  input: "src/KGauge.vue", // Path relative to package.json
  output: {
    name: "KGauge",
    exports: "named"
  },
  plugins: [
    commonjs(),
    vue({
      css: false, // Dynamically inject css as a <style> tag
      compileTemplate: true // Explicitly convert template to render function
    }),
    (process.argv.includes('es')) ? null : buble(), // Transpile to ES5
    terser()
  ]
};
