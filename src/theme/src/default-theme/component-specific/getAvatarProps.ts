import fills from '../foundational-styles/fills'

interface AvatarProps {
  isSolid: boolean
  color: string
  hashValue: number
}

interface AvatarObject {
  color: string
  backgroundColor: string
}

const getAvatarProps = ({
  isSolid,
  color,
  hashValue
}: AvatarProps): AvatarObject => {
  const appearances = fills[isSolid ? 'solid' : 'subtle']

  if (color === 'automatic') {
    const keys = Object.keys(appearances)
    const key = keys[hashValue % keys.length]
    return appearances[key]
  }

  return appearances[color]
}

export default getAvatarProps
