# Get JS
[![NPM Version](https://img.shields.io/npm/v/get-js.svg?style=flat-square)](https://www.npmjs.com/package/get-js)
[![NPM Downloads](https://img.shields.io/npm/dt/get-js.svg?style=flat-square)](https://www.npmjs.com/package/get-js)
[![Code Climate](https://img.shields.io/codeclimate/github/kabirbaidhya/get-js.svg?style=flat-square)](https://codeclimate.com/github/kabirbaidhya/get-js)

A lightweight promise based package to load scripts on the fly.

## Installation

```bash
# Using npm
$ npm install get-js --save

# Using Yarn
$ yarn add get-js

# Using Bower
$ bower install get-js --save
```

You'll also need a [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) polyfill for [older browsers](http://caniuse.com/#feat=promises).
```
$ npm install es6-promise
```

## Usage
Include the package using Common JS `require()` or ES2015 `import`:

```javascript
var get = require('get-js');

// ES2015+
import get from 'get-js';
```

Or, using `<script>` tags:

```html
<script type="text/javascript" src="/path/to/get-js/dist/get.min.js"></script>
```

Here you go:

```javascript
// Load single script
get('https://code.jquery.com/jquery-2.2.3.min.js').then(function() {
    console.log('do something');
});

// Load multiple scripts, without changing the order
get([
    '/js/abc.js',
    '/js/xyz.js'
]).then(function() {
    console.log('do something now');
}).catch(function() {
    console.log('error');
});
```

## Using in Angular Projects
You can also inject this in your angular files as a `$q` friendly angular service.

Require the angular module using
```javascript
var angularGetJs = require('get-js/angular'); 
```
Or
```html
<script type="text/javascript" src="/path/to/get-js/dist/angular-get.min.js"></script>
```

Then you should be able to use it like this
```javascript

// Add the module as a dependeny in your app
angular.module('app', ['angularGetJs']);

// Inject the service
angular.module('app')
    .controller('MyController', ['get', function(get) {
        get('/some/script.js')
            .then(function() {
                console.log('do something now');
            })
            .catch(function() {
                console.log('error');
            });
    }]);
```