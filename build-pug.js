const pug = require('pug')
const fs = require('fs')
const path = require('path')

// Read lang variable (fallback en)
const languages = ['en', 'de']

const translations = {}
languages.forEach(language => {
    translations[language] = JSON.parse(fs.readFileSync(`translations/${language}.json`))
})

//Define the helper function
function getAssetPath(relativePath) {
    return path.join('/assets', relativePath)
}

const compiled = pug.renderFile('src/pug/index.pug', {
    pretty: true,
    translations,
    getAssetPath,
})

const distDirectoryPath = 'dist'

if (!fs.existsSync(distDirectoryPath)) {
    fs.mkdirSync('dist')
}

fs.writeFileSync(path.join(distDirectoryPath, 'index.html'), compiled)
