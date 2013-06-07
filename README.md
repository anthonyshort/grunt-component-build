# grunt-component-build [![Build Status](https://travis-ci.org/anthonyshort/grunt-component-build.png)](https://travis-ci.org/anthonyshort/grunt-component-build)

Build and watch Components. Supports file globs inside of the scripts to build a component using any number of files. This is so that you can use Component in place of Browserify or similar tools to build out CommonJS apps and still have access to the components. 

You can specify scripts and styles within Grunt and these will override the component.json file. This means you don't need to list every file to build with Component. This shouldn't be used for building Components themselves, but for compiling applications in a way you normally would with Browserify but using Component instead so you have access to Components. 

## Getting Started
If you haven't used `grunt` before, be sure to check out the Getting Started guide, as it explains how to create a `Gruntfile` as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-component-build --save-dev
```
then load the tasks in your Gruntfile with

```javascript
grunt.loadNpmTasks('grunt-component-build');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/gruntjs/grunt/wiki/Getting-started

## The Basics

Add a component section to your Grunt file:

```js
component_build: {
  app: {
    styles: false,
    scripts: true,
    verbose: true
  }
}
```

You can add as many sub-tasks to the component_build task and they will be compiled separately.

## Extending Component with Plugins

Builder.js allows us to extending it so we can add support for other languages, like Coffeescript or Jade. You can do this easily in the `configure` option in your grunt file.

```js
component_build: {
  app: {
    output: './dist/',
    styles: false,
    scripts: true,
    standalone: true,
    configure: function(builder) {
      builder.use(myPlugin);
    }
  }
}
```

These plugins are extremely simple. You can grab them from npm or write your own.  
[List of plugins](https://github.com/component/component/wiki/Plugins)

## Built-in Plugins

There are two plugins built into this grunt task. They compile Coffeescript and plain HTML. 

```js
component_build: {
  app: {
    output: './dist/',
    styles: false,
    scripts: true,
    standalone: true,
    plugins: ['coffee', 'templates']
  }
}
```

These are located in the `/plugins` folder and function the same way as any other builder.js plugin. These are opt-in so you'll need to add the line to your config.

### Templates

Templates will convert any html files you have added to the `templates` section of your `component.json` file so you can require them without needing to do anything. 

```js
var template = require('./template.html');
```

### Coffeescript

This works the same way as the template plugin except that it uses the scripts section of the `component.json` file. It will automatically compile and files ending in `.coffee` and allow you to require them as if they were JS files. 

```js
var calendar = require('calendar');
```

You don't need to add the `.js` extension when requiring the coffee files. Each coffee file is converted on the fly and replaces the original in the built file.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
0.2.8  
- Add an option for verbose output (similar to component build -v)

0.2.7  
- Rename task to component_build  
- Add Travis

0.2.6  
- Upgrade component-build to 0.8.1  

0.2.5  
- Updated support for component-builder 0.7.0  
- Updated grunt task to use new Builder config name  
- .conf changed to .config

0.2.4  
- Upgraded component-build to 0.6.4

0.2.0beta  
- Added support for grunt 0.4.0  

0.1.4  
- Added builder.js plugin support  

0.1.0  
- First release  

## License
Copyright (c) 2012 Anthony Short  
Licensed under the MIT license.
