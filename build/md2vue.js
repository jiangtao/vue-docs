#!/usr/bin/env node

var fs         = require('fs')
var path       = require('path')
var chokidar   = require('chokidar')
var fsmonitor  = require('fsmonitor')
var chalk      = require('chalk')

var targetPath = process.argv.slice(2).pop() || 'src/markdown'
var fullPath, routerPath, pagesPath, name, routerMaps = []

fullPath   = path.resolve(path.join(__dirname, '../', targetPath))
routerPath = path.resolve(path.join(__dirname, '../', 'src/router/map.js'))
pagesPath  = path.resolve(path.join(__dirname, '../', 'src/pages'))

if(!fs.existsSync(fullPath)) {
	console.log('')
	console.log(chalk.yellow(`    markdown dir ${fullPath} not exist`))
	return
}
if(!fs.existsSync(pagesPath)) {
	fs.mkdirSync(pagesPath)
}
console.log('')
console.log(chalk.green('    ready to start writing your docs!!'))


fs.readdirSync(fullPath)
   .filter(file => isMd(mime(file)))
   .forEach(md => mdAdd(md))

fsmonitor.watch(fullPath, {
	matches: function(relpath) {
		return isMd(mime(path.basename(relpath)))
	},
	excludes: function(relpath){
		return isDotFile(path.basename(relpath))
	}
}, function(change) {
	change.addedFiles.forEach(mdAdd)
	change.modifiedFiles.forEach(mdChange)
	change.removedFiles.forEach(mdDelete)
})

function mdAdd(md) {
	console.log('')
	console.log(chalk.blue(`    add ${md}`))
	name = shortname(md)
	routerMaps.push(generateRouter(name))
	fs.writeFileSync(routerPath, `export default {\n${routerMaps.join(',')}\n}`)
	fs.writeFileSync(`${pagesPath}/${name}.vue`, generateVue(name), 'utf8')
}

function mdChange(md) {
	console.log('')
	console.log(chalk.blue(`    change ${md}`))
	var name = shortname(md)
	fs.writeFileSync(`${pagesPath}/${name}.vue`, generateVue(name), 'utf8')
}

function mdDelete(md) {
	console.log('')
	console.log(chalk.blue(`    delete ${md}`))
	name = shortname(md)
	var index = routerMaps.indexOf(generateRouter(name))
	if(index == -1) return
	routerMaps.splice(generateRouter(name), 1)
	fs.writeFileSync(routerPath, `export default {\n${routerMaps.join(',\n')}}`)
	fs.unlinkSync(`${pagesPath}/${name}.vue`)
}

function isMd(type) {
	return ['md', 'markdown'].indexOf(type) != -1
}

function shortname(filename) {
	var type = mime(filename)
	if(type) {
		return filename.replace(new RegExp(`.${type}$`), '')
	} else {
		return ''
	}
}

function isDotFile(filename){
	return filename.indexOf('.') == 0
}

function mime(filename) {
	if(isDotFile(filename)) return null
	
	return filename.split('.').pop()
}

function generateRouter(name) {
	var path
	name = encodeURIComponent(name)
	path = name.toLowerCase() == 'readme' ? '' : name
	return `	'/${path}': {
		component: (resolve) => {
			require(['pages/${name}.vue'], resolve)
		}
	}`
}

function generateVue(name) {
	return `<template>
    <Layout>
        <markdown></markdown>
    </Layout>
</template>
<script>
    import markdown from '../markdown/${name}.md'
    export default{
        components: {
            markdown
        }
    }
</script>`
}