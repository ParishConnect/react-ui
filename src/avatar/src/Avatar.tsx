import * as React from 'react'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'
import { Image } from '../../image'
import { Text } from '../../typography'
import { ThemeContext } from '../../theme'
import globalGetInitials from './utils/getInitials'
import globalHash from './utils/hash'

const initialsProps = {
  top: 0,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1
}

export interface AvatarProps extends BoxProps {
  /**
   * The src attribute of the image.
   * When it's not available, render initials instead.
   */
  src?: string
  /**
   * The size of the avatar.
   */
  size?: number
  /**
   * The name used for the initials and title attribute.
   */
  name: string
  /**
   * The value used for the hash function.
   * The name is used as the hashValue by default.
   * When dealing with anonymous users you should use the id instead.
   */
  hashValue?: string
  /**
   * When true, render a solid avatar.
   */
  isSolid?: boolean
  /**
   * The color used for the avatar.
   * When the value is `automatic`, use the hash function to determine the color.
   */
  color?: string
  /**
   * When true, force show the initials.
   * This is useful in some cases when using Gravatar and transparent pngs.
   */
  forceShowInitials?: boolean
  /**
   * When the size is smaller than this number, use a single initial for the avatar.
   */
  sizeLimitOneCharacter?: number
  /**
   * Function to get the initials based on the name.
   */
  getInitials?(name: string): string
}

interface AvatarState {
  imageHasFailedLoading: boolean
}

class Avatar extends React.PureComponent<AvatarProps, AvatarState> {
  public static contextType = ThemeContext
  static defaultProps = {
    color: 'automatic',
    size: 24,
    isSolid: false,
    getInitials: globalGetInitials,
    forceShowInitials: false,
    sizeLimitOneCharacter: 20
  }

  state: AvatarState = {
    imageHasFailedLoading: false
  }

  handleError = () => {
    this.setState({ imageHasFailedLoading: true })
  }

  getColorProps = () => {
    const {
      isSolid = false,
      color = 'automatic',
      hashValue: propsHashValue,
      name
    } = this.props
    const theme = this.context

    if (color === 'automatic') {
      const hashValue = globalHash(propsHashValue || name)
      return theme.getAvatarProps({ isSolid, color, hashValue })
    }

    return theme.getAvatarProps({ isSolid, color })
  }

  render() {
    const {
      src,
      size,
      name,
      getInitials = globalGetInitials,
      forceShowInitials,
      sizeLimitOneCharacter,
      ...props
    } = this.props
    const theme = this.context

    const { imageHasFailedLoading } = this.state
    const imageUnavailable = !src || imageHasFailedLoading
    const initialsFontSize = `${theme.getAvatarInitialsFontSize(
      size,
      sizeLimitOneCharacter
    )}px`

    let initials = getInitials(name)
    if (size && sizeLimitOneCharacter && size <= sizeLimitOneCharacter) {
      initials = initials && initials.substring(0, 1)
    }
    const colorProps = this.getColorProps()

    return (
      <Box
        width={size}
        height={size}
        overflow="hidden"
        borderRadius={9999}
        position="relative"
        display="inline-flex"
        justifyContent="center"
        backgroundColor={colorProps.backgroundColor}
        title={name}
        {...props}
      >
        {(imageUnavailable || forceShowInitials) && (
          <Text
            css={initialsProps as any}
            fontSize={initialsFontSize}
            lineHeight={initialsFontSize}
            width={size}
            height={size}
            color={colorProps.color}
          >
            {initials}
          </Text>
        )}
        {!imageUnavailable && (
          <Image
            width="auto"
            height="100%"
            src={src}
            onError={this.handleError}
          />
        )}
      </Box>
    )
  }
}

export default Avatar
