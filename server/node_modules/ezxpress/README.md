[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

[Express](https://www.npmjs.com/package/express) application generator with AngularJS boilerplate.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

## Installation

```sh
$ npm install -g ezxpress
```

## Quick Start

Create the app:

```sh
$ ezx --git --gulp --css sass /tmp/foo
```

Install dependencies:

```sh
$ cd /tmp/foo && npm install
```

Start your Express.js app at `http://localhost:5000/`:

```sh
$ npm start
```

## Sample Directory Structure
```
foo/
├── app/
│   ├── app.js
│   ├── gulpfile.js
│   ├── .gitignore
│   ├── package.json
│   ├── bin/
│   │   ├── www
│   ├── public/
│   │   ├── index.html
│   │   ├── assets/
│   │   ├── css/
│   │   │   ├── style.css
│   │   ├── js/
│   │   │   ├── app/
│   │   │   │   ├── app.config.js
│   │   │   │   ├── app.module.js
│   │   │   ├── component/
│   │   │   │   ├── example.component.js
│   │   │   │   ├── example.template.html
│   ├── routes/
│   │   ├── users.js
```

## Command Line Options

This generator can also be further configured with the following command line flags.

    -h, --help          output usage information
        --version       output the version number
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (default: css)
        --git           add .gitignore
        --gulp          add gulpfile.js with browser-sync and nodemon
    -f, --force         force on non-empty directory

## License

[ISC](LICENSE)

[npm-image]: https://img.shields.io/npm/v/ezxpress.svg
[npm-url]: https://npmjs.org/package/ezxpress
[downloads-image]: https://img.shields.io/npm/dm/ezxpress.svg
[downloads-url]: https://npmjs.org/package/ezxpress
