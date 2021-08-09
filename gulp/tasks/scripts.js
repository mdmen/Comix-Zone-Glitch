import gulp from 'gulp';
import browserify from 'browserify';
import tsify from 'tsify';
import source from 'vinyl-source-stream';
import watchify from 'watchify';
import fancyLog from 'fancy-log';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';

const bundleFileName = 'bundle.js';
const getConfig = ({ sourceFolder }) => ({
  entries: [`${sourceFolder}/index.ts`],
  cache: {},
  packageCache: {},
});

export const getScriptsTask = ({ sourceFolder, distFolder }) => {
  return function scripts() {
    const config = getConfig({ sourceFolder });
    return browserify(config)
      .plugin(tsify)
      .bundle()
      .pipe(source(bundleFileName))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(distFolder));
  };
};

export const getWatchScriptsTask = ({ sourceFolder, distFolder }) => {
  const config = getConfig({ sourceFolder });
  const watchedBrowserify = watchify(browserify(config).plugin(tsify));

  function watchScripts() {
    return watchedBrowserify
      .bundle()
      .on('error', fancyLog)
      .pipe(source(bundleFileName))
      .pipe(gulp.dest(distFolder));
  }

  watchedBrowserify.on('update', watchScripts);
  watchedBrowserify.on('log', fancyLog);

  return watchScripts;
};
