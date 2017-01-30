var fs = require('fs')
var path = require('path')
var rimraf = require('rimraf')
var fastDiff = require('fast-diff')
function Store(opts){
  this.dir = opts.dir || path.join(__dirname, './.store')
  if (!fs.existsSync(this.dir)) {
    fs.mkdirSync(this.dir)
  }
}
Store.prototype = {
  filePath(filename) {
    return path.join(this.dir, filename + '.vue')
  },

  save(filename, content) {
  console.log(fastDiff('11111','11111'))
    try {
      if (this.writable(filename, content)) {
        fs.writeFileSync(this.filePath(filename), content, 'utf8')
        return true
      } else {
        return false
      }
    } catch (err) {
      console.error(err)
      return false
    }
  },
  diff(filename, content) {
    return true
    // TODO: optimize diff file fast
    return fastDiff(fs.readFileSync(this.filePath(filename), 'utf8'), content).EQUAL === 0
  },
  writable(filename, content){
    return !fs.existsSync(this.filePath(filename)) || this.diff(filename, content)
  },
  clean() {
    rimraf.sync(this.dir)
  }
}


module.exports = Store
