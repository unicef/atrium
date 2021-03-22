import React from 'react'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  link: {
    marginLeft: '5px',
    marginRight: '5px'
  },
  common: props => ({
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '180%',
    marginBottom: props.mb,
    marginTop: props.mt
  })
})

const FLAG = '<link>'

const flagStr = ({ links, text }) => {
  const flaggedStr = links.reduce((prevStr, link) => {
    const regex = new RegExp(link.str, 'g')
    return prevStr.replace(regex, `${FLAG}${link.str}${FLAG}`)
  }, text)

  return flaggedStr
}

const TextWithLinks = ({ children, links, mt, mb }) => {
  const classes = useStyles({ mt, mb });

  const handleStr = () => {
    if (typeof children === 'string') {
      if (Array.isArray(links)) {
        const flaggedStr = flagStr({ links, text: children })
        
        return flaggedStr.split(FLAG).map((str, index) => {
          const linkFoundIndex = links.findIndex(link => link.str === str)

          if (linkFoundIndex >= 0) {
            const link = links[linkFoundIndex]
            return (
              <Link
                component={RouterLink}
                variant={link.variant}
                to={link.to}
                className={[classes.common, classes.link].join(' ')}
                key={`${link.str}_${index}`}
              >
                {link.str}
              </Link>
            )
          }

          return str

        })
      }

      return children
    }

    return ''
  }

  return (
    <Typography className={classes.common}>
      {handleStr()}
    </Typography>
  )
}

TextWithLinks.propTypes = {
  mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  links: PropTypes.shape({
    to: PropTypes.string,
    str: PropTypes.string,
    variant: PropTypes.string
  }).isRequired,
  children: PropTypes.string.isRequired
}

TextWithLinks.defaultProps = {
  mb: 0,
  mt: 0
}

export default React.memo(TextWithLinks)