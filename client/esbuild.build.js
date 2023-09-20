const vuePlugin = require('esbuild-vue');

require('esbuild').build({
    entryPoints: ['src/dashboard.js'],
    bundle: true,
    outfile: 'out.js',
    platform: 'node',
    loader: { '.png': 'dataurl' },
    plugins: [vuePlugin({
      extractCss: true,
      workers: false,
      onReadFile: path => {
          console.error("The following dependency was used:", path);
      }
  })],
    define: {
        "process.env.NODE_ENV": JSON.stringify("development"),
    },
});