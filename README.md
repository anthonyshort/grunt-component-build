# grunt-component-build [![Build Status](https://travis-ci.org/anthonyshort/grunt-component-build.png)](https://travis-ci.org/anthonyshort/grunt-component-build)

Build Components using Grunt.

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
componentbuild: {
  dev: {
    options: {
      name: 'dev'
    },
    src: 'my-component',
    dest: 'my-component/build'
  }
}
```

You can add as many sub-tasks to the `componentbuild` task and they will be compiled separately.

## Extending Component with Plugins

Builder2.js allows us to extending it so we can add support for other languages, like [CoffeeScript](https://github.com/component/builder-coffee) or [Jade](https://github.com/component/builder-jade) (See the list of official [builder plugins](https://github.com/component/guide/blob/master/component/repositories.md#builder-plugins)). 

You can find an example [here](test/fixtures/plugins).

```js
componentbuild: {
  options: {
    scriptPlugins: function(build) {
      build.use('scripts', coffee());
      build.use('templates', jade({ string: true }));
    },
    stylePlugins: function(build) {
    },
    filePlugins: function(build) {
    }
  }
}
```

By default `stylePlugins` use [Autoprefixer](https://github.com/ai/autoprefixer) to add vendor prefixes to CSS rules. You can specify the browsers you want to target in your project using the option `browsers`.

Make sure the plugin supports the latest [builder2.js](https://github.com/component/builder2.js) API.

## Options

### name

Set the name of the built file.

### install

Install dependencies.

### development

Set `--dev` flag to true. Enable source URLs.

### standalone

The same `--standalone` flag in `component build`. Setting this to a string will name the global variable to that
is exported. Setting this to `true` will do the same, but it will use the component name by default.

### prefix

Prefix CSS URLs with a string. Useful for rewriting URLs to point to a CDN.

### browsers

[Autoprefixer](https://github.com/ai/autoprefixer#browsers) browsers support.

### copy

Copy component assets instead of symlinking.

### require

Exclude the require function at the top of the built component.

### verbose

Show build information.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
0.5.2  
- Fix `browser` typo in the doc. [#41](https://github.com/anthonyshort/grunt-component-build/issues/41)

0.5.0  
- Add builder2.js support (component 1.0.0) using [component build](https://github.com/component/build.js).

0.4.3  
- Fix ignore option

0.4.0  
- Refactor to support Grunt 0.4.0+ API

0.3.2  
- Add noRequire option

0.3.1  
- Upgrade component-build to 0.9.x  

0.3.0  
- Define a default output `/build`. The `output` option is now optional.

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
Copyright (c) 2014 Anthony Short  
Licensed under the MIT license.
