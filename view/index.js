/*jshint latedef:false */
var generator  = require('yeoman-generator');
var util       = require('util');
var path       = require('path');

module.exports = Generator;

function Generator() {
  generator.NamedBase.apply(this, arguments);

  // inspect package.json for appname
  try {
    this.pkg = JSON.parse(this.readFileAsString(path.join(process.cwd(), 'package.json')));
    this.appname = this.pkg.name;
  }
  catch (err) {
    console.log('ERROR::',err);
    // pass
  }

  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates/javascript';
  this.sourceRoot(path.join(__dirname, dirPath));
  this.option('coffee', { desc: 'CoffeeScript instead standard JavaScript' });
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createViewFiles = function createViewFiles() {
  // TODO: Add template
  var ext = this.options.coffee ? 'coffee' : 'js';
  this.template('view.' + ext, path.join('app/scripts/views', this.name + '.' + ext));
};
