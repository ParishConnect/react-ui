const fs = require('fs')
const path = require('path')

const buildIconsObject = require('./build-icons-object')

const IN_DIR = path.resolve(__dirname, './icons')
const OUT_FILE = path.resolve(__dirname, './icons/icons.json')

async function main() {
  console.log(`Building ${OUT_FILE}...`)

  const svgFiles = await fs
    .readdirSync(IN_DIR)
    .filter(file => path.extname(file) === '.svg')

  const getSvg = svgFile => fs.readFileSync(path.join(IN_DIR, svgFile))

  const icons = await buildIconsObject(svgFiles, getSvg)

  fs.writeFileSync(OUT_FILE, JSON.stringify(icons))
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
