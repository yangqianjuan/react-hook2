const babel = require('gulp-babel');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');

gulp.task('clean', async function () {
  await del('es/**');
  await del('lib/**');
  await del('cjs/**');
});

gulp.task('cjs', function () {
  return gulp
    .src('./es/**/*.js')
    .pipe(babel({ configFile: '../../.babelrc' }))
    .pipe(gulp.dest('lib/'));
});

gulp.task('es', function () {
  const tsProject = ts.createProject('tsconfig.pro.json', { module: 'ESNext' });
  return tsProject.src().pipe(tsProject()).pipe(babel()).pipe(gulp.dest('es/'));
});

gulp.task('declaration', function () {
  const tsconfig = ts.createProject('tsconfig.pro.json', {
    declaration: true,
    emitDeclarationOnly: true,
  });
  return tsconfig.src().pipe(tsconfig()).pipe(gulp.dest('es/')).pipe(gulp.dest('lib/'));
});
exports.default = gulp.series('clean', 'es', 'cjs', 'declaration');
