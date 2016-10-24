var localConfig = {
    product: 'touchjs', //项目名，用于md5后的资源 如<%- staticBase %>/xx/a.js替换成<%- staticBase %>/xx/a.131.js
    srcDir: '', //源文件的目录, 编译文件 的来源 grunt.option('p')
    releaseDir: 'dist/'
};
module.exports = function(grunt) {

    'use strict';

    // require('time-grunt')(grunt);
    var path = require('path');
    var config = localConfig;
    
    //如果没有服务器配置，采用本地配置
    if(!config.product) {
        var localConfigFile = grunt.file.read('./config/localConfig.js');
        eval(localConfigFile); //会localConfig值
        for(var key in localConfig) {
            config[key] = localConfig[key];
        }
    }

    
    grunt.initConfig({
        product : config.product,
        clean: {
            folders: [config.releaseDir]
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: path.join(config.srcDir, 'src'),
                    src: ['**/*'],
                    // filter: changeFilter,
                    dest: config.releaseDir
                }]
            }
        },
        concat: {
            main: {
                files: [{
                    expand: true,
                    cwd: path.join(config.srcDir, 'src'),
                    src: ['**/*.js'],
                    // filter: changeFilter,
                    dest: config.releaseDir
                }]
            }
        },
        uglify: {
            options: {
                banner: '/*! js <%= product %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
            },
            min: {
                expand: true,
                cwd: config.releaseDir,
                src: '**/*.js',
                dest: config.releaseDir
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: {
                    'dist/touch.js': 'dist/touch.js'
                }
            },
            test: {
                files: {
                    'dist/touch.js': 'dist/touch.js'
                }
            }
        },
        eslint: {
            target: ['./src/**/*.js']
        },
        watch: {
            options: {
                livereload: true
            },
            local: {
                files: [path.join(config.srcDir, 'src') + '/**'],
                tasks: ['eslint', 'clean', 'copy:main', 'concat','babel:dist','uglify' ]
            }
        }
    });
    grunt.registerTask('local', ['eslint', 'clean', 'copy:main', 'concat', 'watch:local']);
    grunt.registerTask('default', ['clean', 'copy:main', 'concat', 'babel:dist','uglify']);
    grunt.registerTask('test', ['babel:test','uglify']);
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-babel');
     

};
