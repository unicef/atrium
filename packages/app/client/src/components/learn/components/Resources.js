import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/styles/withStyles'
import { LEARNING_CATEGORIES_ENUM } from '../../../unin-constants'

const Link = withStyles({
  rootLink: {
    position: 'relative',
    textDecoration: 'none',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 0,
      height: 2,
      backgroundColor: 'currentColor',
      transition: 'width 0.2s ease'
    },
    '&:hover:after': {
      width: '100%'
    }
  }
})(({ classes, href, children, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={classes.rootLink}
    style={{ color }}
  >
    {children}
  </a>
))

/**
 * Get all resources from a given type into Link component
 *
 * @param {Resource[]} resourceList
 * @param {LEARNING_CATEGORIES_ENUM} resourceType
 */
const getResourceLinks = (resourceList, resourceType) => {
  return resourceList.map(resource => {
    if (resource.category === resourceType) {
      return (
        <Link href={resource.link}>
          <b>{resource.title}</b>&nbsp;{resource.description}
        </Link>
      )
    }
    return null
  })
}

const resourceArray = resources => [
  {
    title: 'Blockchain',
    list: getResourceLinks(resources, LEARNING_CATEGORIES_ENUM.BLOCKCHAIN),
    options: {
      bgColor: '#8dffc3',
      titleColor: '#5ed898',
      listColor: '#454545'
    }
  },
  {
    title: 'Cryptocurrency',
    list: getResourceLinks(resources, LEARNING_CATEGORIES_ENUM.CRYPTOCURRENCY),
    options: {
      bgColor: '#8dffc3',
      titleColor: '#5ed898',
      listColor: '#454545'
    }
  },
  {
    title: 'Wallets',
    list: getResourceLinks(resources, LEARNING_CATEGORIES_ENUM.WALLETS),
    options: {
      bgColor: '#8dffc3',
      titleColor: '#5ed898',
      listColor: '#454545'
    }
  },
  {
    title: 'Ethereum',
    list: getResourceLinks(resources, LEARNING_CATEGORIES_ENUM.ETHEREUM),
    options: {
      bgColor: '#8dffc3',
      titleColor: '#5ed898',
      listColor: '#454545'
    }
  },
  {
    title: 'Bitcoin',
    list: getResourceLinks(resources, LEARNING_CATEGORIES_ENUM.BITCOIN),
    options: {
      bgColor: '#8dffc3',
      titleColor: '#5ed898',
      listColor: '#454545'
    }
  },
  {
    title: 'Use cases',
    list: getResourceLinks(resources, LEARNING_CATEGORIES_ENUM.USE_CASES),
    options: {
      bgColor: '#8dffc3',
      titleColor: '#5ed898',
      listColor: '#454545'
    }
  },
  {
    title: 'Supplementary Resources',
    list: getResourceLinks(
      resources,
      LEARNING_CATEGORIES_ENUM.SUPPLEMENTARY_RESOURCES
    ),
    options: {
      bgColor: '#8dffc3',
      titleColor: '#5ed898',
      listColor: '#454545'
    }
  }
]

const styles = theme => ({
  resource: {
    display: 'flex',
    padding: '80px 0',
    maxWidth: 1034,
    margin: '0 auto'
  },
  resourceBox: {
    '@media (max-width: 959px)': {
      justifyContent: 'center',
      padding: '0 15px'
    }
  },
  resourceTitle: {
    '@media (max-width: 967px)': {
      marginBottom: 50
    }
  },
  resourceList: {
    maxWidth: 570,
    margin: 0,
    padding: 0,
    '& > li': {
      listStyleType: 'none',
      '&:not(:last-child)': {
        marginBottom: 37
      },
      '@media (max-width: 600px)': {
        '& p': {
          fontSize: 20
        }
      }
    }
  }
})

const ResourceListItem = ({ color, item }) =>
  item ? (
    <li>
      <Typography component="p" variant="h4" style={{ color }}>
        {React.cloneElement(item, { color })}
      </Typography>
    </li>
  ) : null

const Resources = ({ classes, resources }) => {
  return resourceArray(resources).map((obj, k) => (
    <Box key={k} style={{ backgroundColor: obj.options.bgColor }}>
      <Container className={classes.resource}>
        <Grid container>
          <Grid container item xs={12} md={6} className={classes.resourceBox}>
            <Typography
              component="p"
              variant="h1"
              className={classes.resourceTitle}
              style={{ color: obj.options.titleColor }}
            >
              {obj.title}
            </Typography>
          </Grid>
          <Grid container item xs={12} md={6} className={classes.resourceBox}>
            <ul className={classes.resourceList}>
              {obj.list.map((item, i) => (
                <ResourceListItem
                  key={i}
                  item={item}
                  color={obj.options.listColor}
                />
              ))}
            </ul>
          </Grid>
        </Grid>
      </Container>
    </Box>
  ))
}

export default withStyles(styles)(Resources)
