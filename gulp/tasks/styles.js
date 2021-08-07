import gulp from 'gulp';
import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';

export const getStylesTask = ({ sourceFolder, mode, distFolder }) => {
  return function styles() {
    const plugins = mode.production()
      ? [postcssImport, autoprefixer, cssnano()]
      : [postcssImport];

    return gulp
      .src(`${sourceFolder}/**/index.css`)
      .pipe(postcss(plugins))
      .pipe(gulp.dest(distFolder));
  };
};
