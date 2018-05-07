const { getMarkdown } = require('./r')
const { resolve, join } = require('path')
const fs = require('fs-extra')
const chalk = require('chalk').default
const { extractHeader } = require('./r')

const FormatCodeToString = obj => {
  const st = JSON.stringify(obj)
  return `window.Config = JSON.parse('${st}')`
}

const ImportMarkdown = (route, path) => {
  return [`\nimport ${route} from '${path}';`, `window.component["${route}"] = ${route};`].join('\n')
}

module.exports = function(source, map, meta) {
  const docsPath = resolve(process.argv[2])

  this.addContextDependency(docsPath)

  const navi = join(docsPath, 'navi')

  let selector = getMarkdown(docsPath)

  const originCode = FormatCodeToString({
    navi: selector
  })

  let imString = [
    `import README from '${join(docsPath, 'README.md')}';\n`,
    'window.component = {};',
    `window.README = {
      route:'README',
      name:'README',
      path:void 666,
      children:void 666,
      type:'file',
      component:README,
      header:JSON.parse('${JSON.stringify(extractHeader(join(docsPath, 'README.md')))}')
    };`,
    'window.level = 2;',
    ' // first step is getting the README.md'
  ].join('\n')

  selector.forEach(i => {
    if (i.type === 'file') {
      imString += ImportMarkdown(i.route, i.path)
    }
    if (i.type === 'dir') {
      i.children.forEach(child => {
        if (child.type === 'file') imString += ImportMarkdown(i.route + '_' + child.route, child.path)
        // todo: more nested
      })
    }
  })

  this.callback(null, originCode + ';\n' + imString + source, map, meta)
  return // always return undefined when calling callback()
}
