/* eslint-disable no-console */
import esbuild from 'esbuild';

const buildDirectory = 'dist';
const production = process.env.NODE_ENV === 'production';

// Config entrypoint files
const entryPoints = ['src/index.ts'];

/**
 * Default Settings
 * @type {esbuild.BuildOptions}
 */
const defaultSettings = {
  bundle: true,
  outdir: buildDirectory,
  minify: production,
  sourcemap: !production,
  target: production ? 'es6' : 'esnext',
};

// Files building
if (production)
  esbuild.build({
    ...defaultSettings,
    entryPoints: entryPoints,
  });

// Files serving
if (!production) {
  esbuild
    .serve(
      {
        servedir: buildDirectory,
        port: 3000,
      },
      {
        ...defaultSettings,
        entryPoints,
      }
    )
    .then((server) => {
      console.log(`Serving at http://localhost:${server.port}`);
    });
}
