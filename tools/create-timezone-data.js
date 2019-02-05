#!/usr/bin/env node
'use strict'
const path = require('path')
const fs = require('fs-extra')
const moment = require('moment-timezone/moment-timezone-utils')

const packedLatest = require('moment-timezone/data/packed/latest.json')

function unpackAndUnlink(latest) {
  const unpacked = {
    ...latest,
    zones: latest.zones.map(moment.tz.unpack),
    links: []
  }

  latest.links.forEach(link => {
    const [leadTzName, alias] = link.split('|')
    const leadTzData = unpacked.zones.find(zone => zone.name === leadTzName)

    unpacked.zones.push({
      ...leadTzData,
      name: alias
    })
  })

  return unpacked
}

const filePath = path.resolve(__dirname, '../src/timezone/src/data/')
const fileName = 'timezone-data.json'

async function main() {
  await fs.emptyDir(filePath)

  const unpackedLatest = await unpackAndUnlink(packedLatest)

  const packed = await moment.tz.filterLinkPack(unpackedLatest, 2017, 2024)

  await fs.writeFile(
    `${filePath}/${fileName}`,
    JSON.stringify(packed),
    'utf8',
    err => {
      if (err) {
        console.log(
          '[tz-data] Failed to generate new timezone data for 2017-2024.',
          err
        )
      } else {
        console.log('[tz-data] Timezone data generated and saved at ', filePath)
      }
    }
  )
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
