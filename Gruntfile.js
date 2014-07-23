module.exports = function(grunt) {
	'use strict';
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all:[
				'Gruntfile.js',
				'scripts/*/*.js',
				'spec/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			},
		},
		jasmine: {
			src: "lib/**/*.js",
			options: {
			  specs: "spec/**/*.js"
			}				
		}
	});

  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-jasmine')

  grunt.registerTask('test', ['jshint', 'jasmine'])  
};