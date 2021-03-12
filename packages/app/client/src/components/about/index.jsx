import React from 'react'

import Grid from '@material-ui/core/Grid'
import ExpansionList from './ExpansionList'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'
import AboutBackground from './imgs/About_main.png'
import AboutLearn from './imgs/About_learn.png'
import AboutProjects from './imgs/About_projects.png'
import AboutForum from './imgs/About_forum.png'
import AboutBadges from './imgs/About_badges.png'
import AboutTree from './imgs/about-tree.jpg'
import sectionBreak from './imgs/section-line.svg'

const useBlockchainSectionStyles = makeStyles(theme => ({
  section: {},
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
    marginTop: 87,
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
    fontFamily: 'Roboto',
    textAlign: 'center',
    width: '100%',
    marginBottom: 180,
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

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    minHeight: '100vh',
    marginTop: 50
  },
  header: {
    width: '100%',
    minHeight: 731,
    maxWidth: 1520,
    margin: '0 auto',
    backgroundImage: `url(${AboutBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat'
  },
  section: {
    marginTop: 91,
    paddingBottom: 105
  },
  contentWrapper: {
    paddingTop: 163,
    marginLeft: 150,
    maxWidth: 615
  },
  subtitle: {
    marginTop: 21,
    fontSize: 21,
    '& > b': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '@media (max-width: 600px)': {
      fontSize: 18
    }
  },
  offerRight: {
    textAlign: 'right'
  },
  offerTitleLeft: {
    fontSize: 38,
    marginTop: 35,
    textAlign: 'left'
  },
  offerTitleRight: {
    fontSize: 38,
    marginTop: 35,
    paddingLeft: 80,
    textAlign: 'left'
  },
  offerImage: {
    width: 500
  },
  offerTextLeft: {
    fontFamily: 'Roboto',
    fontSize: 18,
    lineHeight: 1.67,
    width: 502
  },
  offerTextRight: {
    fontFamily: 'Roboto',
    fontSize: 18,
    lineHeight: 1.67,
    paddingLeft: 80,
    textAlign: 'left'
  },
  systemText: {
    marginTop: 20,
    fontSize: 21,
    fontFamily: 'Roboto',
    lineHeight: 1.43
  },
  systemLink: {
    color: '#01ce4b'
  }
}))

export default function() {
  const classes = useStyles()

  const blockchainStyles = useBlockchainSectionStyles()
  // const resourcesStyles = useResourcesSectionStyles()

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.header}>
        <div className={classes.contentWrapper}>
          <Typography component="h1" variant="h1" color="secondary">
            Meet The Atrium
          </Typography>
          <Typography component="h5" className={classes.subtitle}>
            Welcome to The Atrium, the UN system’s first blockchain-based
            collaboration tool. The Atrium was created to make it easier to
            learn about blockchain and implement blockchain projects within your
            organisation. Bringing together learning resources, a repository to
            which UN blockchain projects can be shared and contributed to, and a
            private Ethereum network for experimentation, The Atrium is meant to
            enhance blockchain collaboration across the UN.
          </Typography>
        </div>
      </Grid>

      <Container component="div" className={classes.section}>
        <Typography
          component="h3"
          color="secondary"
          className={blockchainStyles.titleOfSection}
        >
          What The Atrium offers
        </Typography>
        <Grid container>
          <Grid item xs={12} md={6}>
            <img alt="AboutLearn" src={AboutLearn} className={classes.offerImage} />
            <Typography
              component="h2"
              variant="h2"
              color="secondary"
              className={classes.offerTitleLeft}
            >
              Learn
            </Typography>
            <Typography
              component="p"
              variant="p"
              className={classes.offerTextLeft}
            >
              The Learn page provides a number of curated resources to help you
              learn about blockchain technology and how it might apply to the
              challenges you face in your organisation.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} className={classes.offerRight}>
            <img alt="AboutProjects" src={AboutProjects} className={classes.offerImage} />
            <Typography
              component="h2"
              variant="h2"
              color="secondary"
              className={classes.offerTitleRight}
            >
              Projects
            </Typography>
            <Typography
              component="div"
              variant="div"
              className={classes.offerTextRight}
            >
              The Projects page gives you access to UN blockchain projects to
              enable you to learn more about how blockchain is being applied
              across the UN system, and provide you with access to the team to
              learn more about how you could experiment and collaborate.
            </Typography>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 131 }}>
          <Grid item xs={12} md={6}>
            <img alt="AboutForum" src={AboutForum} className={classes.offerImage} />
            <Typography
              component="h2"
              variant="h2"
              color="secondary"
              className={classes.offerTitleLeft}
            >
              Forum
            </Typography>
            <Typography
              component="p"
              variant="p"
              className={classes.offerTextLeft}
            >
              The Forum page allows you to further your learning about
              blockchain by engaging with colleagues on a variety of topics.
              Here you can pose and/or answer a question from the community.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} className={classes.offerRight}>
            <img alt="AboutBadges" src={AboutBadges} className={classes.offerImage} />
            <Typography
              component="h2"
              variant="h2"
              color="secondary"
              className={classes.offerTitleRight}
            >
              Badges
            </Typography>
            <Typography
              component="div"
              variant="div"
              className={classes.offerTextRight}
            >
              You’re earning blockchain-based badges by using this platform.
              Check your profile to see what badges you’ve earned to date, and
              what activities can earn you more. Your achievements are being
              captured on The Atrium’s blockchain, making them permanently
              recorded.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container component="div" className={classes.section}>
        <Typography
          component="h3"
          color="secondary"
          className={blockchainStyles.titleOfSection}
        >
          The Atrium System
        </Typography>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <div style={{ maxWidth: 636 }}>
              <Typography component="h2" variant="h2" color="secondary">
                The Atrium is hosted on a private Ethereum network. Currently,
                nodes are being run by the UNDP, UNICEF, and WFP.
              </Typography>
              <Typography
                component="p"
                variant="p"
                className={classes.systemText}
              >
                We are looking for other organizations that would be interested
                in setting up their own node, therefore, participating by
                increasing the resilience of the system. If interested, please
                contact{' '}
                <a
                  href="mailto:blockchain@uninnovation.network"
                  className={classes.systemLink}
                >
                  blockchain@uninnovation.network
                </a>
                .
              </Typography>
              <ExpansionList
                list={[
                  {
                    title: 'What is a blockchain node?',
                    content: [
                      `Blockchain is software consisting of a collection of digital transactions that are batched together into blocks of information and then shared across computers on a shared network in a secure way. Each new block added is chained to the previous block, making it difficult to change past information.`,
                      'The computers that retain an entire copy of all transactions that have ever occurred, therefore the entire blockchain, are called nodes. As new transactions are submitted to the network of computers, each node updates.',
                      'Transactions submitted to a blockchain are immutable, meaning that once added to the network, the information can only be added and previous data cannot be removed or modified.'
                    ],
                    img: AboutTree
                  },
                  {
                    title: 'What does it mean to “run a node”?',
                    content: [
                      'Hosting or “running” a node means the entire blockchain is being run on your server. Because blockchain is distributed, each node contains an entire copy of the blockchain, therefore, the more nodes that exist, the more copies exist, increasing the decentralization and resilience of the overall system.'
                    ]
                  },
                  {
                    title: 'Why run a blockchain node?',
                    content: [
                      'Nodes serve as the basis of all blockchain applications, therefore by setting up node infrastructure, your organization is actively participating in the blockchain ecosystem. An added benefit of running a blockchain node is that the value and strength of a blockchain increases as more nodes are running.',
                      'As The Atrium is intended for experimentation, going through the process of setting up a node helps you understand the considerations of this new technology before doing it for a larger scale project.'
                    ]
                  }
                ]}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
      <Container component="div" className={classes.section}>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <div style={{ maxWidth: 636 }}>
              <Typography component="h2" variant="h2" color="secondary">
                Frequently Asked Questions
              </Typography>

              <ExpansionList
                list={[
                  {
                    title: 'Do I have to be technical to use The Atrium?',
                    content: [
                      `No technical knowledge is required to use The Atrium! The key features of the site are designed for anyone to use.`
                    ]
                  },
                  {
                    title: 'Can I start building? How?',
                    content: [
                      'If you’re looking to deploy your platform on The Atrium blockchain, reach out to blockchain@uninnovation.network.'
                    ]
                  },
                  {
                    title: 'Can my external blockchain vendors/partners join?',
                    content: [
                      'Currently, The Atrium is open only to UN personnel.'
                    ]
                  },
                  {
                    title: 'Who is the Atrium built for?',
                    content: [
                      'The Atrium is designed for UN personnel who are interested in 1) learning more about blockchain, 2) exploring blockchain projects within the UN system and 3) engaging with others in the UN blockchain community.'
                    ]
                  },
                  {
                    title:
                      'What are the different ways that I / my organisation can get involved?',
                    content: [
                      'Any UN personnel can be a member of The Atrium. For organisations who would like to be part of The Atrium blockchain, including running a blockchain node or proposing future features to be included in the platform, please email blockchain@uninnovation.network.'
                    ]
                  },
                  {
                    title:
                      'Am I allowed to use the code shared by other agencies for my own projects?',
                    content: [
                      'Access to code varies project by project. The easiest way to determine if you are able to use source code is by reaching out to a project owner listed on the Projects page. The Atrium encourages the creation of open-source digital public goods.'
                    ]
                  },
                  {
                    title: 'Are the learning materials free?',
                    content: [
                      'We aim to curate resources that are easily accessible to the UN community. This includes a mix of internal resources and external links. For external resources, the cost may vary depending upon resource, though nearly all are free to use.'
                    ]
                  },
                  {
                    title:
                      'Who should I reach out to if I have questions about a project I see on the Atrium?',
                    content: [
                      'Each project will have a point of contact listed. By clicking on the envelope icon, you will be able to email the individual responsible for the project.'
                    ]
                  },
                  {
                    title:
                      'I have a question about The Atrium. Who should I reach out to? ',
                    content: ['Please email blockchain@uninnovation.network.']
                  }
                ]}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}
