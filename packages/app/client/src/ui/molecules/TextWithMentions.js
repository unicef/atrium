import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { composeMargins, replaceTargetString } from '../utils'

const useStyles = makeStyles((theme) => ({
  mention: {
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '15px',
    lineHeight: '150%',
    color: theme.palette.primary.main,
    cursor: "pointer"
  },
  rest: props => ({
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '180%',
    ...composeMargins(props)
  })
}))

const TextWithMentions = ({ children, mentions, ...textProps }) => {
  const classes = useStyles(textProps)

  if (typeof children !== 'string') return null

  if (!Array.isArray(mentions)) return children

  const handledMentions = mentions.map((mention) => `@${mention.name}`)

  const handleReplacement = ({ target, index, replacementTargetsIndex }) => {
    const { name } = mentions[replacementTargetsIndex]
    //TODO: IMPLEMENT THE PROPER FEATURE FOR THE MENTION NAME
    return (
      <Typography component="span" key={`${target}_${index}`} className={classes.mention}>
        {name}
      </Typography>
    )
  }

  const handledContent = replaceTargetString({ handleReplacement, text: children, replacementTargets: handledMentions })
  
  return (
    <Typography component="span" className={classes.rest} {...textProps}>
      {handledContent}
    </Typography>
  )

}

export default TextWithMentions
