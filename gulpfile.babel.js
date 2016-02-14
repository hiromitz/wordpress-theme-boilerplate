'use strict';

import gulp from 'gulp';

import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

import sourcemaps from 'gulp-sourcemaps';

import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import concat from 'gulp-concat';

import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';

import browserSync from 'browser-sync';
const reload = browserSync.reload;

import del from 'del';

const manifest = require('asset-builder')('./src/manifest.json');
const path = manifest.paths;
const config = manifest.config || {};

// project assets
const project = manifest.getProjectGlobs();
// global assets (include bower_components)
const globs = manifest.globs;

// Error Handler using plumber
let plumberErrorHandler = { errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

// Compile es2015 into js
function scripts(src, filename) {
  return gulp.src(src)
    .pipe(plumber(plumberErrorHandler))

    // eslint
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())

    // compile
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat(filename))
    .pipe(sourcemaps.write('.'))

    .pipe(gulp.dest(path.dist + 'scripts'))
    .pipe(reload({stream: true}));
}
gulp.task('scripts', () => {
  manifest.forEachDependency('js', function(dep) {
    scripts(dep.globs, dep.name);
  });
});

// Compile sass into CSS
gulp.task('styles', () => {
  return gulp.src(project.css)
    .pipe(plumber(plumberErrorHandler))
    .pipe(sourcemaps.init())
    .pipe(sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe(sourcemaps.write())
    .pipe(concat('theme.css'))
    .pipe(gulp.dest(path.dist + 'styles'))
    .pipe(reload({stream: true}));
});

// image optimization
gulp.task('images', () => {
  return gulp.src(project.images)
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true,
    })).on('error', function (err) {
      console.log(err);
      this.end();
    })
    .pipe(gulp.dest(path.dist + 'images'));
});

gulp.task('fonts', () => {
  return gulp.src(globs.fonts)
    .pipe(gulp.dest(path.dist + 'fonts'));
});

// Static Server (BrowserSync) + watch files
gulp.task('serve', ['build'], () => {

  browserSync({
    proxy: config.devUrl,
    snippetOptions: {
      whitelist: ['/wp-admin/admin-ajax.php'],
      blacklist: ['/wp-admin/**']
    }
  });

  gulp.watch([path.source + 'styles/**/*'], ['styles']);
  gulp.watch([path.source + 'scripts/**/*'], ['scripts']);
  gulp.watch([path.source + 'images/**/*'], ['images']);
  gulp.watch([path.source + 'fonts/**/*'], ['fonts']);
  gulp.watch(['bower.json', 'assets/manifest.json'], ['build']);

  gulp.watch([
    '{lib,templates}/**/*.php', '*.php',
    path.dist + 'images/**/*',
    path.dist + 'fonts/**/*',
  ]).on('change', reload);

});

gulp.task('build', ['fonts', 'styles', 'scripts', 'images']);

gulp.task('clean:scripts', del.bind(null, ['assets/scripts']));
gulp.task('clean:styles', del.bind(null,  ['assets/styles']));
gulp.task('clean:images', del.bind(null,  ['assets/images']));
gulp.task('clean:fonts', del.bind(null,   ['assets/fonts']));
gulp.task('clean', ['clean:scripts', 'clean:styles', 'clean:images', 'clean:fonts']);


gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
