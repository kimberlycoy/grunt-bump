var grunt = require('grunt'),
    exec = require('child_process').exec,
    should = require("should");


describe('bump:git', function () {
  var gitCommand = 'git rev-parse --short HEAD',
      gitVersion,
      version = '0.0.0',
      file = JSON.stringify({
        'version': version
      });

  before(function (done) {
    grunt.task.loadTasks('tasks/bump.js');
    exec(gitCommand, function (err, stdout) {
      gitVersion = stdout.trim();
      done();
    });
  });

  beforeEach(function (){
    grunt.file.read = function () {
      return file;
    };
    grunt.config('bump', {
      options: {
        files: ['one'],
        commit: false,
        createTag: false,
        push: false,
        gitCommand: gitCommand
      }
    });
  });

  it('should equal +GIT', function () {
    var expected = JSON.stringify({
      'version': version + '+' + gitVersion
    });
    grunt.file.write = function (file, content) {
      content.should.eql(expected);
    };
    grunt.task.run('bump:git');
  });

});