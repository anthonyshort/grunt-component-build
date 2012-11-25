# grunt-component-build

Build and watch Components. Supports file globs inside of the scripts to build a component using any number of files. This is so that you can use Component in place of Browserify or similar tools to build out CommonJS apps and still have access to the components. 

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-component-build`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-component-build');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

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
