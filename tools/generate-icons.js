#!/usr/bin/env node
'use strict'
const path = require('path')
const fs = require('fs-extra')
const feather = require('feather-icons')
const camelCase = require('camelcase')
const prettier = require('prettier')
const { each } = require('lodash')

const customIcons = require('./icons/icons')
const iconsPath = path.resolve(__dirname, '../src/icons/src/generated')
const iconsIndexPath = path.resolve(__dirname, '../src/icons/index.ts')
const indexPath = path.resolve(__dirname, '../src/index.ts')

const isFilledRegex = /filled/g

async function main() {
  const prettierConfig = await prettier.resolveConfig(__dirname)
  await fs.emptyDir(iconsPath)
  const iconNames = []
  let promises = []
  const icons = { ...feather.icons, ...customIcons }
  try {
    promises = each(icons, icon => {
      const iconName = camelCase(icon.name, { pascalCase: true }) + 'Icon'
      const iconContents = icon.contents
      iconNames.push(iconName)
      let iconFile = `
       import React, { PureComponent } from 'react'
       import Icon, {IconProps} from '../Icon'
       export default class ${iconName} extends PureComponent<IconProps> {
         render() {
           return (
             <Icon ${isFilledRegex.test(icon.name) ? 'isSolid' : ''} name="${
        icon.name
      }" viewBox="${icon.attrs.viewBox}" {...this.props}>${iconContents}</Icon>
             )
           }
         }
         `
      const iconPath = path.join(iconsPath, `${iconName}.tsx`)
      iconFile = prettier.format(iconFile, {
        ...prettierConfig,
        filepath: iconPath
      })
      return fs.writeFile(iconPath, iconFile)
    })
  } catch (error) {
    console.log(error)
  }

  try {
    await Promise.all(promises)
  } catch (error) {
    console.log(error)
  }

  let iconsIndexFile = iconNames
    .map(iconName => {
      return `export { default as ${iconName} } from './src/generated/${iconName}'\n`
    })
    .join('')

  iconsIndexFile = prettier.format(iconsIndexFile, {
    ...prettierConfig,
    filepath: iconsIndexPath
  })

  await fs.writeFile(iconsIndexPath, iconsIndexFile)

  const iconsExport = `
  /* Start generated icons */
  export {
    ${iconNames.join(',\n  ')}
  } from './icons'
  /* End generated icons */
  `.trim()

  let indexContent = await fs.readFile(indexPath, 'utf8')
  indexContent = indexContent.replace(
    /\/\* Start generated icons \*\/[\s\S]*?\/\* End generated icons \*\//i,
    iconsExport
  )

  indexContent = prettier.format(indexContent, {
    ...prettierConfig,
    filepath: indexPath
  })

  await fs.writeFile(indexPath, indexContent)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
