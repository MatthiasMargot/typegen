Swagger Typegen

[![codecov](https://codecov.io/gh/MatthiasMargot/swagger-typegen/branch/master/graph/badge.svg?token=GSLHWG7U4F)](https://codecov.io/gh/MatthiasMargot/swagger-typegen)
<a href="https://codeclimate.com/github/MatthiasMargot/swagger-typegen/maintainability"><img src="https://api.codeclimate.com/v1/badges/106a3e3f77f51488215a/maintainability" /></a>

## How to generate the type file

```sh
$ node cli input.json [-o,--output] output
```

Parameters
- input (required) - The path to swagger file in JSON format
- -o, --output [filename] (optional) - the path to the output file. By skipping this param, the output is returned in the terminal.

Example:

```sh
$ node cli example/input.json -o example/output.ts
```
