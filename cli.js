#!/usr/bin/env node

const fs = require('fs')
const { program } = require('commander')

const typescript = require('./typescript')

/*
 * TODO: Restore yaml support
 *
 * const SwaggerParser = require('swagger-parser')
 */

function typegen (pathToSource, options) {
 const source = fs.readFileSync(pathToSource, { encoding: 'utf-8' })

  const json = JSON.parse(source)

  const output = typescript(json)

  if (options.output) {
    fs.writeFileSync(options.output, output)
    return
  }

  process.stdout.write(output)
}

program
  .name('typegen')
  .arguments('<pathToSource>')
  .option('-o, --output <path>', 'write the generated output to a path')
  .action(typegen)

program.parse(process.argv)
