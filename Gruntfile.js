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
		jasmine: {
			options: {
				version: '~2.0.0'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('test', ['jshint', 'jasmine']);
};