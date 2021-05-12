import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { RelativeDate, AbsoluteDate, TextButton, Authorship } from '../atoms'

const textStyles = (theme) => ({
  root: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '13px',
    lineHeight: '140%',
    color: theme.colors['dark-gray']
  }
})

const buttonStyles = (theme) => ({
  root: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '140%',
    color: theme.palette.text.primary,
    padding: 3,
    minWidth: 0
  }
})

const separatorStyles = (theme) => ({
  root: {
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '13px',
    lineHeight: '140%',
    color: theme.palette.text.primary,
    marginLeft: 5,
    marginRight: 5
  }
})

const Text = withStyles(textStyles)(Typography)
const Button = withStyles(buttonStyles)(TextButton)
const Separator = withStyles(separatorStyles)((props) => <Typography {...props}>·</Typography>)

const handleDateTypes = (variant, props) => {
  const handledProps = { ...props, color: 'dark-gray' }
  if (variant === 'relative') {
    return <RelativeDate {...handledProps} />
  }

  return <AbsoluteDate {...handledProps} />
}

const handleVariant = ({ variant, type, ...props }) => {
  switch(type) {
    case 'textbutton':
      return <Button {...props} />
    case 'date':
      return handleDateTypes(variant, props)
    case 'text':
      return <Text {...props} />
    case 'authorship':
      return <Authorship prefix {...props} />
    default:
      return null
  }
}

const CardInfoRow = ({ components }) => {

  if (!Array.isArray(components) || components.length === 0) return null

  return (
    <Grid container itme xs alignItems="center">
      {components.map((props, index) => {
        const component = handleVariant(props)
        const correspondentPosition = index + 1

        if (component === null) return null

        if (components.length === correspondentPosition) {
          return component
        }

        return (
          <>
            {component}
            <Separator />
          </>
        )
      })}
    </Grid>
  )
}

export default CardInfoRow
