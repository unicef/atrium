import React from 'react'
import { connect } from 'react-redux'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import makeStyles from '@material-ui/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import UNICEFLogo from './imgs/UNICEF_logo.png'
import WFPLogo from './imgs/WFP_logo.png'
import UNDPLogo from './imgs/UNDP_logo.png'
import JoinModal from './JoinModal'
import sectionBreak from '../assets/section-line.svg'
import { Button } from '../../../ui'
import { LimitedHeader } from '../Header'
import { Carousel, ExpansionList } from './components'
import {
  MainBackground,
  BlockchainExplainedImg,
  AccelerateInnovation,
  DecisionMaking,
  LearnAboutBc
} from '../assets'

const theseAreBadVariableNamesThereIsNoReasonToSeparateThem = makeStyles(
  () => ({
    loginButton: {
      width: 118,
      height: '100%',
      color: '#01CE4B',
      backgroundColor: '#ffffff',
      borderRadius: 0
    }
  })
)

const useWelcomeSectionStyles = makeStyles(theme => ({
  titleOfHeader: {
    fontSize: 16,
    color: theme.colors['black-two'],
    letterSpacing: 1.8,
    textTransform: 'uppercase'
  },
  header: {
    textAlign: 'left'
  },
  main: {
    height: '100%',
    minHeight: '100vh'
  },
  section: {
    width: '100%',
    minHeight: 720,
    maxWidth: 1440,
    margin: '0 auto',
    backgroundImage: `url(${MainBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat',
    '& > div': {
      paddingTop: 119,
      maxWidth: 635
    },
    textAlign: 'center'
  },
  description: {
    textAlign: 'left',
    marginTop: 27,
    marginBottom: 30,
    fontSize: 21,
    '& > b': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '@media (max-width:600px)': {
      fontSize: 18
    }
  }
}))

const useWhyJoinSectionStyles = makeStyles(theme => ({
  section: {
    marginTop: -45,
    paddingBottom: 160
  },
  titleOfSection: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 220,
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
  addProjectBtnWrapper: {
    marginTop: -40,
    '@media (max-width: 959px)': {
      marginTop: 40,
      display: 'flex',
      justifyContent: 'center'
    }
  }
}))

const useWhoBuildingSectionStyles = makeStyles(theme => ({
  section: {
    paddingBottom: 170,
    '& > div:first-child': {
      maxWidth: 635
    }
  },
  titleOfSection: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 220,
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
  description: {
    fontSize: 21,
    marginBottom: 30,
    '@media (max-width:600px)': {
      fontSize: 18
    }
  },
  companys: {
    marginTop: 130
  },
  companyList: {
    flexWrap: 'nowrap',
    '@media (max-width: 599px)': {
      flexWrap: 'wrap',
      '& > *:not(:last-child)': {
        marginBottom: 70
      }
    }
  },
  companyLogo: {
    display: 'flex',
    alignItems: 'center',
    maxHeight: 90,
    maxWidth: 170,
    objectFit: 'contain'
  }
}))

const useMoreInfoSectionStyles = makeStyles(theme => ({
  section: {
    backgroundColor: '#f8f8f8',
    paddingTop: 80,
    paddingBottom: 150,
    '& > div:first-child': {
      maxWidth: 795
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

const Landing = props => {
  const welcomeStyles = useWelcomeSectionStyles()
  const whyJoinStyles = useWhyJoinSectionStyles()
  const whoBuildingStyles = useWhoBuildingSectionStyles()
  const moreInfoStyles = useMoreInfoSectionStyles()
  const blockchainStyles = useBlockchainSectionStyles()
  const classes = theseAreBadVariableNamesThereIsNoReasonToSeparateThem()

  const [isOpenJoinModal, toggleJoinModal] = React.useState(false)

  const handleToggleJoinModal = () => {
    toggleJoinModal(prev => !prev)
  }

  const handleRedirectToLogin = () => {
    props.history.push('/login')
  }

  return (
    <Box component="div" className={welcomeStyles.main}>
      <JoinModal isOpen={isOpenJoinModal} handleClose={handleToggleJoinModal} />

      {!props.isAuthenticated && (
        <LimitedHeader
          title="The Atrium (beta)"
          titleProps={{
            component: 'span',
            variant: 'h6',
            className: welcomeStyles.titleOfHeader
          }}
          actionInlineStyle={{ marginRight: 0 }}
          action={
            <Button
              type="button"
              size="small"
              onClick={handleRedirectToLogin}
              className={classes.loginButton}
            >
              Sign in
            </Button>
          }
        />
      )}

      <Box component="section" className={welcomeStyles.section}>
        <Container component="div">
          <Typography
            className={welcomeStyles.header}
            component="h1"
            variant="h1"
            color="secondary"
          >
            Where collaboration happens.
          </Typography>
          <Typography component="h5" className={welcomeStyles.description}>
            Start your blockchain journey with The Atrium, an{' '}
            <b>interagency platform for blockchain technology</b>, built on
            blockchain, designed to support learning, collaboration and
            conversation amongst the UN community.
            <br />
            <br />
            The Atrium is open to <b>any UN personnel</b> who is interested in
            blockchain technology. By participating, members can even earn
            blockchain-based badges!
          </Typography>
          {props.isAuthenticated ? null : (
            <Grid container>
              <Button
                type="button"
                color="primary"
                style={{ letterSpacing: 1 }}
                onClick={handleToggleJoinModal}
              >
                Join Atrium
              </Button>
            </Grid>
          )}
        </Container>
      </Box>

      <Box
        component="section"
        className={whyJoinStyles.section}
        classes={{ input: welcomeStyles.section }}
      >
        <Container component="div">
          <Typography
            component="h3"
            color="secondary"
            className={whyJoinStyles.titleOfSection}
          >
            Why should I join The Atrium?
          </Typography>
          <Carousel
            list={[
              {
                key: 0,
                title: 'Accelerate',
                text:
                  'Are you curious to learn about different UN use cases? Have you ever wondered how your entity could apply blockchain? In The Atrium, learn what projects and prototypes are being launched within the UN system and get in direct contact with the project owner. Working on a project you’d like to share? The Atrium is the perfect destination to share your work and collaborate with like-minded peers.',
                imgSrc: AccelerateInnovation
              },
              {
                key: 1,
                title: 'Community',
                text:
                  'The Atrium is built with collaboration and community in-mind. To jumpstart this collaboration, members of The Atrium are encouraged to engage with colleagues across the UN that are also interested in blockchain, as well as provide feedback on the platform via the Forum section.',
                imgSrc: DecisionMaking
              },
              {
                key: 2,
                title: 'Build on blockchain',
                text:
                  'The Atrium is a UN-wide platform built and enabled by blockchain. By actively using The Atrium, you and other personnel can earn blockchain-based badges. Learn about the difference between blockchain and cryptocurrency, explore the history of the technology and browse use cases and reports focused on the use of blockchain for social impact.',
                imgSrc: LearnAboutBc
              }
            ]}
          />
          {/* <div className={whyJoinStyles.addProjectBtnWrapper}>
            <Button variant="outlined">Add a blockchain project</Button>
          </div> */}
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
      </Box>
      <Box
        component="section"
        className={whoBuildingStyles.section}
        classes={{ input: welcomeStyles.section }}
      >
        <Container component="div" classes={{ input: welcomeStyles.section }}>
          <Typography
            component="h4"
            variant="h1"
            color="secondary"
            style={{ marginBottom: 27, textAlign: 'left' }}
          >
            Build it together.
          </Typography>
          <Typography
            component="p"
            variant="body1"
            className={whoBuildingStyles.description}
            style={{ textAlign: 'left' }}
          >
            The Atrium has been established as a decentralized collaboration
            tool by the United Nations Development Programme (UNDP), UNICEF, the
            World Food Programme (WFP) and the UN Innovation Network (UNIN).
            <br />
            <br />
            Part of a UN entity? Join us now to become a member of this
            collaborative initiative.
          </Typography>
          {/* <Grid container alignItems="center" justify="center">
            <Button type="button" color="primary" style={{ letterSpacing: 1 }}>Become a member organisation</Button>
          </Grid> */}
        </Container>
        <Container
          component="div"
          className={whoBuildingStyles.companys}
          style={{
            textAlign: 'center'
          }}
        >
          <Grid
            container
            className={whoBuildingStyles.companyList}
            style={{
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Grid item xs={4}>
              <img src={UNDPLogo} style={{ width: 54 }} />
            </Grid>
            <Grid item xs={4}>
              <img src={UNICEFLogo} style={{ width: 170 }} />
            </Grid>
            <Grid item xs={4}>
              <img src={WFPLogo} style={{ width: 100 }} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="section" className={moreInfoStyles.section}>
        <Container component="div">
          <Typography component="h3" variant="h4" color="secondary">
            Want more information? Here are some of our Frequently Asked
            Questions
          </Typography>
          <ExpansionList
            list={[
              {
                title: 'What kind of projects can I share on The Atrium?',
                content: `Any distributed application (dApp) can be shared on The Atrium. In addition to uploading your project to the "Projects" page, you can also share in The Atrium's Github repository. This allows any user of The Atrium to access the code, increasing the opportunity for rapid innovation. As a note, although The Atrium uses a private Ethereum blockchain as the test network, the GitHub repository is agnostic to infrastructure.`
              },
              // {
              //   title: "What types of questions can I create a poll around",
              //   content: "Nulla pellentesque dignissim enim sit amet. Vitae auctor eu augue ut lectus arcu bibendum at. Varius duis at consectetur lorem donec massa sapien faucibus et. At erat pellentesque adipiscing commodo elit at imperdiet dui. Vitae turpis massa sed elementum tempus. Habitant morbi tristique senectus et netus et. Lacus sed viverra tellus in hac habitasse. Molestie a iaculis at erat pellentesque adipiscing commodo elit. Vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt. Arcu dictum varius duis at consectetur lorem donec massa sapien. Aliquam vestibulum morbi blandit cursus risus. Urna nec tincidunt praesent semper feugiat nibh. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget.",
              // },
              {
                title:
                  'I am working on a project that is not public-facing. How secure is The Atrium to host my project?',
                content:
                  'The Atrium is a tool which enables UN organisations to learn about and collaborate on blockchain projects. Hence keeping the platform restricted to UN personnel helps individuals to comfortably share their ideas and work in a secure environment.'
              }
            ]}
          />
        </Container>
      </Box>
    </Box>
  )
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)
