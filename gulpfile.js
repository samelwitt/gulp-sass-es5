const path = require('path')
const gulp = require('gulp')
const loadTasks = require('load-gulp-tasks')
const sequence = require('run-sequence')

const root = process.cwd()
const dest = path.join(root, 'build')
const options = {
  dest: dest,
  root: root
}

/**
 * build to in-memory file system for development
 */
if (process.env.NODE_ENV !== 'production') {
  const GulpMem = require('gulp-mem')
  const gulpMem = new GulpMem()
  gulpMem.serveBasePath = dest
  gulpMem.enableLog = false
  options.gulpMem = gulpMem
  gulp.dest = gulpMem.dest
}

loadTasks(gulp, options)

gulp.task('default', (done) => {
  sequence(['html', 'js:dev', 'js:lib', 'styles:dev','images:dev', 'static'], 'serve:dev', 'watch')
  done()
})

gulp.task('build', (done) => {
  sequence('clean',['html', 'js:prod', 'js:lib', 'styles:prod','images:prod', 'static'])
  done()
})
