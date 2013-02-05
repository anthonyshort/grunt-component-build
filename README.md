# grunt-component-build

Build and watch Components. Supports file globs inside of the scripts to build a component using any number of files. This is so that you can use Component in place of Browserify or similar tools to build out CommonJS apps and still have access to the components. 

You can specify scripts and styles within Grunt and these will override the component.json file. This means you don't need to list every file to build with Component. This shouldn't be used for building Components themselves, but for compiling applications in a way you normally would with Browserify but using Component instead so you have access to Components. 

## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-component-build --save-dev
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/gruntjs/grunt/wiki/Getting-started

## Documentation

Add a component section to your Grunt file:

```js
component: {
  app: {
    output: './dist/',
    config: './component.json',
    styles: false,
    scripts: [ 'src/**/*.js' ],
    standalone: true
  }
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Anthony Short  
Licensed under the MIT license.
