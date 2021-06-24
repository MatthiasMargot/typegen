Swagger Typegen

[![codecov](https://codecov.io/gh/MatthiasMargot/swagger-typegen/branch/master/graph/badge.svg?token=GSLHWG7U4F)](https://codecov.io/gh/MatthiasMargot/swagger-typegen)
<a href="https://codeclimate.com/github/MatthiasMargot/swagger-typegen/maintainability"><img src="https://api.codeclimate.com/v1/badges/106a3e3f77f51488215a/maintainability" /></a>

## How to generate the type file

```sh
$ node cli input.json output.ts
```

- swagger-input-path - the path to your swagger file in JSON format. This param is required.
- swagger-output-path - the path to your output file. This param is required.

Example:

```sh
$ node cli example/input.json example/output.ts
```
