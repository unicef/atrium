import React from 'react'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  link: {
    marginLeft: '5px',
    marginRight: '5px'
  },
  common: {
    marginTop: '35px',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '180%',
  }
})

const FLAG = '<link>'

const flagStr = ({ links, text }) => {
  const flaggedStr = links.reduce((prevStr, link) => {
    const regex = new RegExp(link.str, 'g')
    return prevStr.replace(regex, `${FLAG}${link.str}${FLAG}`)
  }, text)

  return flaggedStr
}

const TextWithLinks = ({ children, links }) => {
  const classes = useStyles();

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

export default React.memo(TextWithLinks)