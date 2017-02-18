#!/usr/bin/env node
var path      = require('path')
var marked    = require('marked')
var highlight = require('highlight.js')
var DomParser = require('dom-parser')
var Store     = require('./store')
var fs        = require('fs')

var rootDir
    , store
    , rootConfig
    , mdConfig
    , targetPath
    , destDir
    , source
    , content
    , result
    , filename
    , isFunction

isFunction = item => Object.prototype.toString.call(item) === `[object Function]`

rootDir    = process.cwd()
rootConfig = path.resolve(path.join(rootDir, '.mdrc.js'))
mdConfig   = fs.existsSync(rootConfig) ? rootConfig: require('./.mdrc')
destDir    = mdConfig.dest
    ? path.isAbsolute(mdConfig.dest)
        ? mdConfig.dest
        : path.resolve(path.join(rootDir, mdConfig.dest))
    : ''

targetPath = process.argv.slice(2).pop()
targetPath = path.isAbsolute(targetPath)
    ? targetPath
    : path.resolve(path.join(rootDir, targetPath))

console.log('dsf',targetPath)
if(!targetPath || !fs.existsSync(targetPath)){
    console.error(`${targetPath} not exist`)
    return
}

/**
 * html => vue file template
 * @param  {[type]} html [description]
 * @return {[type]}      [description]
 */
var renderVueTemplate = function(html) {
	var parser = new DomParser()
	var dom = parser.parseFromString(html)
	var [style] = dom.getElementsByTagName('style')
	var [script] = dom.getElementsByTagName('script')
	var output = {
		style: style ? style.innerHTML : '',
		script: script ? script.innerHTML : ''
	}
	var reg = {
		style: /<style.*?<\/style>/gi,
		script: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
	}
	var result = `<template>\n <section>${html.replace(reg.style, '').replace(reg.script, '')}</section>\n</template>`
	if(output.style) {
		result += `<style>\n${output.style}\n</style>`
	}
	if(output.script) {
		result += `<script>\n${output.script}\n</script>`
	}
	return result
}

function escape(html, encode) {
	return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
/**
 * @description rewrite marked.Renderer.prototype.code
 */
marked.Renderer.prototype.code = function(code, lang, escaped) {
    var plugin = mdConfig.plugins && mdConfig.plugins[lang]
    if(!lang) {
        return `<pre><code>${escape(code, true)}</code></pre>`
    } else if(lang && isFunction(plugin)) {
        var result = plugin.call(this, marked, code, lang, highlight)
        if(result) {
            return result
        }
        return code
    }
    return `<pre class="${this.options.langPrefix}${escape(lang)}"><code>${highlight.highlightAuto(code).value}</code></pre>`
}

marked.setOptions({renderer: new marked.Renderer()})
source  = fs.readFileSync(targetPath, 'utf8')
source  = source.replace(/@/g, '__at__')
content = marked(source).replace(/__at__/g, '@')
result  = renderVueTemplate(content)

filename = path.basename(targetPath).replace(/\.(?:md|markdown)$/gi, '')

store = new Store({dir: destDir})
console.log('start save')
if(store.save(filename, result)){
    console.log(`${filename} generate successfully`)
} else {
    console.log(`${filename} has generated fail, please change it`)
}




