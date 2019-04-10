import vue from "rollup-plugin-vue"; // Handle .vue SFC files
import buble from "rollup-plugin-buble"; // Transpile/polyfill with reasonable browser support
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/KGuage.vue", // Path relative to package.json
  output: {
    name: "KGuage",
    exports: "named"
  },
  plugins: [
    commonjs(),
    vue({
      css: false, // Dynamically inject css as a <style> tag
      compileTemplate: true // Explicitly convert template to render function
    }),
    buble(), // Transpile to ES5
    terser()
  ]
};
