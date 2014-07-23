module.exports = function(grunt) {
	'use strict';
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all:[
				'Gruntfile.js',
				'scripts/*/*.js',
			],
			options: {
				jshintrc: '.jshintrc'
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
};