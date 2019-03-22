export default [
  {
    input: 'bin/expose.js',
    output: {
      file: 'dist/byproxy-server.js',
      format: 'umd',
      name: 'byproxy'
    }
  },
  {
    input: 'bin/link.js',
    output: {
      file: 'dist/byproxy-client.js',
      format: 'iife',
      name: 'byproxy'
    }
  },
  {
    input: 'bin/link.js',
    output: {
      file: 'demo/static/byproxy-client.js',
      format: 'iife',
      name: 'byproxy'
    }
  }
];