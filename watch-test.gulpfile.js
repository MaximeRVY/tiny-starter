'use strict'

const gulp = require('gulp')

gulp.task('watch-test', cb => {
  const TscWatchClient = require('tsc-watch/client')
  const watch = new TscWatchClient()
  const onSuccessfulBuild = () => {
    gulp.series('test')(_res => {})
  }
  watch.on('success', onSuccessfulBuild)
  watch.on('compile_errors', () => {})
  watch.start()
})

/**
 * Run tests.
 */

gulp.task('test', () => {
  const env = require('gulp-env')
  const envs = env.set({
    NODE_ENV: 'test'
  })
  const mocha = require('gulp-mocha')
  return gulp
    .src(['build/**/*.spec.js'], { read: false })
    .pipe(envs)
    .pipe(mocha())
    .once('error', err => {
      console.log('Errors during tests :', err)
    })
    .once('end', () => {})
})
