import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

export const getImagesTask = ({ sourceFolder, distFolder }) => {
  return function images() {
    return gulp
      .src(`${sourceFolder}/images/**/*`)
      .pipe(imagemin())
      .pipe(gulp.dest(`${distFolder}/images`));
  };
};
