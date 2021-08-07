import gulp from 'gulp';
import gulpMode from 'gulp-mode';
import { getStylesTask } from './tasks/styles';
import { getCleanTask } from './tasks/clean';
import { getHtmlTask } from './tasks/html';
import { getImagesTask } from './tasks/images';
import { getScriptsTask, getWatchScriptsTask } from './tasks/scripts';

const sourceFolder = '../src';
const distFolder = '../dist';
const mode = gulpMode();

const clean = getCleanTask(distFolder);
const styles = getStylesTask({ sourceFolder, distFolder, mode });
const html = getHtmlTask({ sourceFolder, distFolder, mode });
const scripts = getScriptsTask({ sourceFolder, distFolder });
const watchScripts = getWatchScriptsTask({ sourceFolder, distFolder });
const images = getImagesTask({ sourceFolder, distFolder });

const watch = () => {
  gulp.watch(`${sourceFolder}/**/index.html`, html);
  gulp.watch(`${sourceFolder}/**/*.css`, styles);
  gulp.watch(`${sourceFolder}/**/*.{svg,png}`, images);
};

export const build = gulp.series(
  clean,
  gulp.parallel(html, styles, images, scripts)
);

export const dev = gulp.series(
  clean,
  gulp.parallel(html, styles, images),
  gulp.parallel(watch, watchScripts)
);
