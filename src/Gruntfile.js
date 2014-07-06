"use strict";

module.exports = function(grunt) {

    // Module Requires
    // --------------------------
    require("load-grunt-tasks")(grunt);
    require("time-grunt")(grunt);


    // Init Config
    // --------------------------

    var appConfig = {

        // Dirs
        dirs: {
            styl: "../assets/styl",
            css:  "../assets/css",
            img:  "../assets/images"
        },

        // Metadata
        pkg: grunt.file.readJSON("package.json"),
        banner:
        "/*" +
        " * -------------------------------------------------------\n" +
        " * Project: <%= pkg.title %>\n" +
        " * Version: <%= pkg.version %>\n" +
        " * Author:  <%= pkg.author.name %> (<%= pkg.author.email %>)\n" +
        " *\n" +
        " * Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.title %>\n" +
        " * -------------------------------------------------------\n" +
        " */\n",

        // Browser Sync
        browser_sync: {
            files: {

                // Applying Livereload feature on the following files
                src : [
                    '../assets/css/*.css',
                    '../index.html'
                ],

            },
            options: {

                // Manual Configuration for IP
                host : "192.168.0.106",

                // Setting the base directory
                server: {
                    baseDir: "../"
                },

                // Calling the Watch Task
                watchTask: true,

                // Synchronizing events between devices
                ghostMode: {
                    scroll: true,
                    links: true,
                    forms: true
                }
            },
        },

        // Watch
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: "<%= dirs.styl %>/**",
                tasks: "stylus"
            }
        },

        // Stylus
        stylus: {
            compile: {
                options: {
                    paths: ['<%= dirs.styl %>'],
                    compress: true,
                    "include css": true
                },
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.styl %>/style.styl'
                }
            }
        }
    };

    grunt.initConfig(appConfig);


    // Register tasks
    // --------------------------

    // Start server and watch for changes
    grunt.registerTask("default", ["browser_sync", "watch"]);

    // Run build
    grunt.registerTask("build", ["stylus"]);

};
