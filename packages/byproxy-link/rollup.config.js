import { terser } from "rollup-plugin-terser";

export default [
  {
    input: 'lib/byproxy-link.js',
    output: {
      file: 'lib/byproxy-link.umd.js',
      format: 'umd',
      name: 'byproxy'
    },
    plugins: [terser()]
  },
  {
    input: 'lib/byproxy-link.js',
    output: {
      file: 'lib/byproxy-link.iife.js',
      format: 'iife',
      name: 'byproxy'
    },
    plugins: [terser()]
  },
  {
    input: 'lib/byproxy-link.js',
    output: {
      file: 'lib/byproxy-link.m.js',
      format: 'esm'
    },
    plugins: [terser()]
  }
];