import gulp from 'gulp';
import htmlMin from 'gulp-htmlmin';

export const getHtmlTask = ({ sourceFolder, mode, distFolder }) => {
  return function html() {
    return gulp
      .src(`${sourceFolder}/**/index.html`)
      .pipe(
        mode.production(
          htmlMin({
            removeComments: true,
            collapseWhitespace: true,
          })
        )
      )
      .pipe(gulp.dest(distFolder));
  };
};
