var gulp = require('gulp'),
    browserSync = require('browser-sync').create();
gulp.task('browser-reload', function (done) {
    browserSync.reload();
    done();
});
gulp.task('default', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(["**/*"], ['browser-reload']);
})
