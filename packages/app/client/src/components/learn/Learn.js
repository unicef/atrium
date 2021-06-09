import React from 'react'
import { compose } from 'recompose'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'
import { connect } from 'react-redux'

import { getLearningResources } from '../../actions/learningActions'
import {
  MainLearnBackground,
  BlockchainExplainedImg,
  DbBlockchainImg,
  DisruptedBitcoinImg,
  DemoBlockhainImg
} from './assets'
import sectionBreak from './assets/section-line.svg'
import { Button } from '../../ui'
import Resources from './components/Resources'
import { guideWrapper } from '../guide-wrapper'

const useMainSectionStyles = makeStyles(theme => ({
  main: {
    height: '100%',
    minHeight: '100vh',
    marginTop: 50
  },
  section: {
    width: '100%',
    minHeight: 731,
    maxWidth: 1520,
    margin: '0 auto',
    backgroundImage: `url(${MainLearnBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat'
  },
  contentWrapper: {
    paddingTop: 163,
    maxWidth: 635
  },
  description: {
    marginTop: 21,
    fontSize: 21,
    '& > b': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '@media (max-width: 600px)': {
      fontSize: 18
    }
  }
}))

const useBlockchainSectionStyles = makeStyles(theme => ({
  section: {
    marginTop: 91,
    paddingBottom: 105
  },
  titleOfSection: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 280,
    fontSize: 21,
    '&:after': {
      position: 'absolute',
      content: '""',
      bottom: 0,
      left: '50%',
      width: 2,
      height: 151,
      marginBottom: -180,
      transform: 'translateX(-50%)',
      background: `url(${sectionBreak})`
    }
  },
  explainedContainer: {
    display: 'flex',
    maxWidth: 1130,
    margin: '0 auto'
  },
  buttonWrapper: {
    marginTop: 40,
    '@media (max-width: 959px)': {
      marginTop: 30
    }
  },
  explainedTitle: {
    marginBottom: 18,
    color: theme.colors['dark-forest-green']
  },
  imageWrapper: {
    maxWidth: 610,
    '@media (max-width: 959px)': {
      maxWidth: 'initial'
    }
  },
  imageOfSlide: {
    display: 'block',
    width: '100%',
    objectFit: 'contain'
  },
  cardsRow: {
    paddingTop: 68,
    maxWidth: 1195
  },
  cardItem: {
    maxWidth: 360,
    '& > p': {
      fontSize: 21
    },
    '& > button': {
      marginTop: 20
    },
    '@media (max-width: 959px)': {
      maxWidth: 'initial',
      margin: '0 auto'
    }
  },
  cardImageWrapper: {
    marginBottom: 20,
    '& > img': {
      display: 'block',
      width: '100%',
      objectFit: 'contain'
    },
    '@media (max-width: 959px)': {
      maxWidth: 400
    }
  },
  articleTitle: {
    minHeight: 62
  }
}))

const useResourcesSectionStyles = makeStyles(theme => ({
  section: {
    '& > div:first-child': {
      maxWidth: 550
    }
  },
  titleOfSection: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: theme.typography.fontFamily,
    textAlign: 'center',
    width: '100%',
    marginBottom: 260,
    '&:after': {
      position: 'absolute',
      content: '""',
      bottom: 0,
      left: '50%',
      width: 2,
      height: 151,
      marginBottom: -180,
      transform: 'translateX(-50%)',
      background: `url(${sectionBreak})`
    }
  }
}))

const Learn = ({ resources, getLearningResources }) => {
  const mainSectionStyles = useMainSectionStyles()
  const blockchainStyles = useBlockchainSectionStyles()
  const resourcesStyles = useResourcesSectionStyles()

  React.useEffect(() => {
    getLearningResources()
  }, [getLearningResources])

  return (
    <Box component="div" className={mainSectionStyles.main}>
      <Box component="section" className={mainSectionStyles.section}>
        <Container component="div" className={mainSectionStyles.contentWrapper}>
          <Typography component="h1" variant="h1" color="secondary">
            Learning Resources
          </Typography>
          <Typography component="h5" className={mainSectionStyles.description}>
            Welcome to the Learn section of The Atrium. While any blockchain and
            crypto resources are publicly available, the amount of information
            can be overwhelming.{' '}
            <b>Below you’ll find a curated list of introductory resources</b>{' '}
            centered around blockchain and cryptocurrency.{' '}
            <i>As a note, these resources are external</i>.
          </Typography>
        </Container>
      </Box>
      <Box component="section" className={blockchainStyles.section}>
        <Container component="div">
          <Typography
            component="h3"
            color="secondary"
            className={blockchainStyles.titleOfSection}
          >
            Blockchain essentials
          </Typography>
          <div className={blockchainStyles.explainedContainer}>
            <Grid container spacing={5} justify="space-between">
              <Grid container item sm={12} md={5}>
                <Typography
                  variant="h4"
                  className={blockchainStyles.explainedTitle}
                >
                  Practical Guide
                </Typography>
                <Typography>
                  We have created an easy-to-use, practical guide for the UN and
                  public sector, complete with definitions, decision-making
                  tools and use cases, helping you to evaluate if blockchain is
                  the correct tool for your next solution.
                </Typography>
                <div className={blockchainStyles.buttonWrapper}>
                  <Button
                    href="https://atrium.network/guide"
                    target="_blank"
                    variant="outlined"
                  >
                    Read more
                  </Button>
                </div>
              </Grid>
              <Grid
                container
                item
                sm={12}
                md={7}
                className={blockchainStyles.imageWrapper}
              >
                <img
                  src={BlockchainExplainedImg}
                  alt="Blockchain explained"
                  className={blockchainStyles.imageOfSlide}
                />
              </Grid>
            </Grid>
          </div>
        </Container>
        <Container component="div" className={blockchainStyles.cardsRow}>
          <Grid container spacing={5} justify="space-between">
            <Grid item sm={4} md={4} className={blockchainStyles.cardItem}>
              <div className={blockchainStyles.cardImageWrapper}>
                <img src={DisruptedBitcoinImg} alt="Trust disrupted bitcoin" />
              </div>
              <Typography
                className={blockchainStyles.articleTitle}
                component="p"
                variant="body1"
              >
                Background on bitcoin and the blockchain
              </Typography>
              <Button
                href="https://techcrunch.com/2016/10/15/watch-all-six-episodes-of-our-series-trust-disrupted-bitcoin-and-the-blockchain/"
                target="_blank"
                variant="outlined"
              >
                Read article
              </Button>
            </Grid>
            <Grid item sm={4} md={4} className={blockchainStyles.cardItem}>
              <div className={blockchainStyles.cardImageWrapper}>
                <img src={DemoBlockhainImg} alt="A visual demo of blockchain" />
              </div>
              <Typography
                className={blockchainStyles.articleTitle}
                component="p"
                variant="body1"
              >
                A visual demo of blockchain
              </Typography>
              <Button
                href="https://anders.com/blockchain/"
                target="_blank"
                variant="outlined"
              >
                Watch video
              </Button>
            </Grid>
            <Grid item sm={4} md={4} className={blockchainStyles.cardItem}>
              <div className={`${blockchainStyles.cardImageWrapper}`}>
                <img src={DbBlockchainImg} alt="Database vs blockchain" />
              </div>
              <Typography
                className={blockchainStyles.articleTitle}
                component="p"
                variant="body1"
              >
                Database versus blockchain
              </Typography>
              <Button
                href="https://hackernoon.com/databases-and-blockchains-the-difference-is-in-their-purpose-and-design-56ba6335778b"
                target="_blank"
                variant="outlined"
              >
                Read article
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box component="section" className={resourcesStyles.section}>
        <Container component="div">
          <Typography
            component="h3"
            variant="h5"
            color="secondary"
            className={resourcesStyles.titleOfSection}
          >
            Below is a list of general resources. It’s suggested to start at the
            top, and work your way down the list.
          </Typography>
        </Container>
        <Resources resources={resources} />
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({ resources: state.learning.resources })

export default compose(
  guideWrapper,
  connect(mapStateToProps, { getLearningResources })
)(Learn)
