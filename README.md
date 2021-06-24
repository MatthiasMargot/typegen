Swagger Typegen

<a href="https://codeclimate.com/github/MatthiasMargot/swagger-typegen/maintainability"><img src="https://api.codeclimate.com/v1/badges/106a3e3f77f51488215a/maintainability" /></a>

## How to generate the type file

```sh
$ node cli swagger-input-path swagger-output-path
```

- swagger-input-path - the path to your swagger file in json format. This param is required.
- swagger-output-path - the path to your output file. This param is optional, by missing this param a file

Example:

```sh
$ node cli example/input.json example/output.ts
```