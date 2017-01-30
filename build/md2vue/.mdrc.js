module.exports = {
    dest: 'src/docs',
    plugins: {
        "example": function (marked, code, lang, highlight) {
            console.log('example', code)
            return `${code}<h2 id="demo">code</h2><pre class="${this.options.langPrefix}${lang}"><code>${highlight.highlightAuto(code).value}</code></pre>`
        },
        "interface": function (marked, code, lang, highlight) {
            try {
                var yaml = require('yamljs')
                var parsedJson = yaml.parse(code)
                var jsonStr = JSON.stringify(parsedJson, null, 2)
                return `<vue-doc-tabs :data='${jsonStr}'></vue-doc-tabs>`
            } catch (e) {
                return 'yaml parse error, check your interface code'
            }
        }
    }
}