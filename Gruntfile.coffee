module.exports = (grunt) ->

  grunt.initConfig
    'auto-release':
      options:
        checkTravisBuild: false

    'npm-contributors':
      options:
        commitMessage: 'chore: update contributors'

    simplemocha:
      options:
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'tap'
      all:
        src: ['test/**/*.js']

  grunt.loadTasks 'tasks'
  grunt.loadNpmTasks 'grunt-npm'
  grunt.loadNpmTasks 'grunt-auto-release'
  grunt.loadNpmTasks 'grunt-simple-mocha'

  grunt.registerTask 'test', 'Run all tests', ->
    grunt.task.run 'simplemocha'

  grunt.registerTask 'release', 'Build, bump and publish to NPM.', (type) ->
    grunt.task.run [
      'npm-contributors',
      "bump:#{type||'patch'}",
      'npm-publish'
    ]
