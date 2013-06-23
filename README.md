# grunt-twig

> Compiles and concatenates twig.js templates; currently, just for use in the browser.

[twig.js](https://github.com/justjohn/twig.js) does not yet have the ability to
compile templates to actual JavaScript code. It instead compiles templates into
data structures that it can easily use later to render the template with a
given data set (or "context").

Thus, the application still needs to load twig.js in order to use the
compiled templates.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-twig --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-twig');
```

## The "twig" task

### Overview
In your project's Gruntfile, add a section named `twig` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  twig: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.jst_variable
Type: `String`
Default value: `'JST'`

The name of the global variable that should store all the templates.

#### options.separator
Type: `String`
Default value: `';\n'`

A string that is inserted between each compiled template when
concatenating templates.

### Usage Examples

#### Default Options
In this example, the default options are used to compile two simple templates.

```js
grunt.initConfig({
  twig: {
    options: {},
    files: {
      'dest/my-compiled-templates.js': [
        'templates/testing.twig',
        'templates/hello.twig'
      ]
    },
  },
})
```

If the `testing.twig` file has the content `Testing` and the `hello.twig` file
has the content `Hello, {{ name }}`, the generated result would be something
like:

```js
var JST=JST||[];
JST["templates/testing.twig"]={"options":{},"blocks":{},"child":{"blocks":{}},"extend":null,"tokens":[{"type":"raw","value":"Testing\n"}]};
JST["templates/hello.twig"]={"options":{},"blocks":{},"child":{"blocks":{}},"extend":null,"tokens":[{"type":"raw","value":"Hello, "},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"name","match":["name"]}]},{"type":"raw","value":"\n"}]}
```

#### The jst_variable Option
In this example, the jst_variable option is use to customize the name of the array that the compiled templates will be stored in.

```js
grunt.initConfig({
  twig: {
    options: {
      jst_variable: 'myTemplates'
    },
    files: {
      'dest/my-compiled-templates.js': [
        'templates/testing.twig',
        'templates/hello.twig'
      ]
    },
  },
})
```

In this case, the resulting file, `dest/my-compiled-templates.js` will look
something like:

```js
var JST=JST||[];
JST["templates/testing.twig"]={"options":{},"blocks":{},"child":{"blocks":{}},"extend":null,"tokens":[{"type":"raw","value":"Testing\n"}]};
JST["templates/hello.twig"]={"options":{},"blocks":{},"child":{"blocks":{}},"extend":null,"tokens":[{"type":"raw","value":"Hello, "},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"name","match":["name"]}]},{"type":"raw","value":"\n"}]}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
