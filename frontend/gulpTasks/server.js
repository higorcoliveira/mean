const gulp = require('gulp')
const watch = require('gulp-watch')
const webserver = require('gulp-webserver')

//Inicializa o webserver do gulp e chama a task que fica monitorando mudanças nos arquivos
gulp.task('server', ['watch'], () => {
    return gulp.src('public').pipe(webserver({
        livereload: true,
        port: 3000,
        open: true
    }))
})

// tasks que serão executadas caso algo seja alterado
gulp.task('watch', () => {
    watch('app/**/*.html', () => gulp.start('app.html'))
    watch('app/**/*.css', () => gulp.start('app.css'))
    watch('app/**/*.js', () => gulp.start('app.js'))
    watch('assets/**/*.*', () => gulp.start('app.assets'))
})
