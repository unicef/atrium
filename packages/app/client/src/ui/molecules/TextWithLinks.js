import React from 'react'
import Link from '@material-ui/core/Link'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { replaceTargetString } from '../utils'

const useStyles = makeStyles({
  link: {
    marginLeft: '5px',
    marginRight: '5px'
  },
  common: props => ({
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '180%',
    marginBottom: props.mb,
    marginTop: props.mt
  })
})

const TextWithLinks = ({ children, links, mt, mb }) => {
  const classes = useStyles({ mt, mb })

  if (typeof children !== 'string') return null

  if (!Array.isArray(links)) return children

  const handledLinksStr = links.map(link => link.str)

  const handleReplacement = ({ target, index, replacementTargetsIndex }) => {
    const link = links[replacementTargetsIndex]
    return (
      <Link
        component={RouterLink}
        variant={link.variant}
        to={link.to}
        className={[classes.common, classes.link].join(' ')}
        key={`${target}_${index}`}
      >
        {target}
      </Link>
    )
  }

  const handledContent = replaceTargetString({ handleReplacement, text: children, replacementTargets: handledLinksStr })

  return (
    <Typography className={classes.common}>
      {handledContent}
    </Typography>
  )
}

TextWithLinks.propTypes = {
  mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      str: PropTypes.string,
      variant: PropTypes.string
    })
  ).isRequired,
  children: PropTypes.string.isRequired
}

TextWithLinks.defaultProps = {
  mb: 0,
  mt: 0
}

export default React.memo(TextWithLinks)