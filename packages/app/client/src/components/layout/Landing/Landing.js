import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { JoinAtrium, SectionContainer } from '../../../ui'
import { Button } from '../../../ui'
import { LimitedHeader } from '../Header'
import {
  MainBackground,
  AccelerateInnovation,
  DecisionMaking,
  ExplorePrototypes,
  BuildBackground,
  ReadingBoy,
  ReadingBackground,
  ButterflyLogos
} from '../assets'
import {
  CollapsableQuestion,
  SectionIcon
} from '../../../ui/pages/Learn/components'
import { MainContainer } from '../../../ui/templates'
import ProfilePictureHeader from '../Header/ProfilePictureHeader'
import DropdownHeaderMenu from '../Header/DropdownHeaderMenu'
import { logoutUser } from '../../../actions/authActions'

const useStyles = makeStyles(() => ({
  borderButton: {
    left: 40,
    position: 'absolute',
    bottom: 0,
    transform: 'translate(0, 50%)'
  },
  main: {
    height: '100%',
    minHeight: '100vh',
    width: '80%',
    margin: 'auto'
  },
  descriptionHeader: {
    textAlign: 'left',
    maxWidth: '408px'
  },
  header: {
    color: '#178FE2',
    marginBottom: 16
  },
  section: {
    display: 'flex',
    width: '100%',
    paddingTop: 0,
    textAlign: 'left',
    paddingBottom: 100,
    justifyContent: 'center'
  },
  line: {
    borderBottom: 'solid 1.2px',
    marginBottom: 41,
    width: '100%'
  },
  smallLine: {
    width: '45%',
    borderBottom: 'solid 1.2px rgba(255, 255, 255, 0.28)'
  },
  separator: {
    display: 'flex',
    alignItems: 'center'
  },
  separatorOr: {
    color: 'white',
    margin: '0 5%',
    textAlign: 'center',
    fontWeight: 500
  },
  descriptionText: {
    fontSize: 18,
    textAlign: 'left'
  },
  image: {
    width: '100%',
    height: '100%'
  }
}))

const useWelcomeSectionStyles = makeStyles(theme => ({
  titleOfHeader: {
    fontSize: 28,
    color: theme.colors['black-two'],
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    lineHeight: '34px'
  },
  description: {
    textAlign: 'left',
    marginTop: 40,
    fontSize: '18px',
    lineHeight: '180%',
    width: '100%',
    maxWidth: 470,
    padding: '36px 59px 56px 41px',
    position: 'relative'
  },
  buttons: {
    display: 'flex',
    textAlign: 'right',
    alignItems: 'center'
  },
  loginButton: {
    width: '105px',
    height: '40px',
    margin: 0,
    padding: 8
  },
  signupButton: {
    width: '105px',
    height: '40px',
    margin: '0 10px 0 0',
    padding: 8
  },
  welcomeText: {
    textAlign: 'left',
    marginTop: 30,
    fontSize: '18px',
    lineHeight: '180%',
    width: '100%',
    maxWidth: 470,
    padding: '0 59px 56px 0',
    position: 'relative'
  }
}))

const useWhyJoinSectionStyles = makeStyles(theme => ({
  titleOfSection: {
    textAlign: 'center'
  },
  textTitle: {
    fontSize: '32px'
  },
  description: {
    border: 'solid 1.2px',
    borderRadius: 5,
    backgroundColor: 'white'
  }
}))

const useWhoBuildingSectionStyles = makeStyles(theme => ({
  section: {
    backgroundImage: `url(${BuildBackground})`,
    paddingTop: 80,
    display: 'flex',
    width: '100%',
    textAlign: 'left',
    justifyContent: 'center',
    height: '100%',
    maxHeight: '633px'
  },
  descriptionText: {
    fontSize: 21,
    marginTop: '10%',
    marginBottom: 30
  }
}))

const useExploreSectionStyles = makeStyles(theme => ({
  section: {
    backgroundColor: '#DDFBF6',
    paddingTop: 80,
    paddingBottom: 150
  },
  imgInSection: {
    width: '100%',
    maxWidth: '628px',
    margin: '10% 10% 0 0'
  }
}))

const useBlockchainSectionStyles = makeStyles(theme => ({
  viewDocumentButton: {
    margin: '0 10% 10%'
  },
  section: {
    marginTop: '8%',
    backgroundColor: '#DDFBF6'
  },
  descriptionHeader: {
    fontSize: '38px !important'
  },
  description: {
    border: 'solid 1.2px',
    borderRadius: 5,
    width: '80%',
    backgroundColor: 'white',
    marginTop: 90
  },
  readingBoy: {
    margin: '-273px 0 10% 0'
  },
  readingBackground: {
    margin: '-60px 0 0 -21%'
  },
  wrapper: {
    marginLeft: '30%'
  }
}))

const useMoreInfoStyles = makeStyles(theme => ({
  descriptionHeader: {
    textAlign: 'center',
    fontSize: '32px'
  },
  descriptionText: {
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 64,
    fontSize: 18
  },
  container: {
    alignItems: 'center'
  }
}))

const Landing = props => {
  const welcomeStyles = useWelcomeSectionStyles()
  const whyJoinStyles = useWhyJoinSectionStyles()
  const whoBuildingStyles = useWhoBuildingSectionStyles()
  const exploreStyles = useExploreSectionStyles()
  const moreInfoStyles = useMoreInfoStyles()
  const blockchainStyles = useBlockchainSectionStyles()
  const classes = useStyles()

  const questions = [
    {
      title: 'What kind of projects can I share on The Atrium?',
      answer: `Any distributed application (dApp) can be shared on The Atrium. In addition to uploading your project to the "Projects" page, you can also share in The Atrium's Github repository. This allows any user of The Atrium to access the code, increasing the opportunity for rapid innovation. As a note, although The Atrium uses a private Ethereum blockchain as the test network, the GitHub repository is agnostic to infrastructure.`
    },
    {
      title:
        'I am working on a project that is not public-facing. How secure is The Atrium to host my project?',
      answer:
        'The Atrium is a tool which enables UN organisations to learn about and collaborate on blockchain projects. Hence keeping the platform restricted to UN personnel helps individuals to comfortably share their ideas and work in a secure environment.'
    }
  ]

  const handleNavigation = path => {
    props.history.push(path)
  }

  return (
    <MainContainer mt={0} size="full">
      <Grid container xs={12} justify="center">
        <Grid item container xs={12} xl={8} className={classes.section}>
          <Grid item xs={12} sm={12} md={10} style={{ marginBottom: 90 }}>
            <LimitedHeader
              title="THE ATRIUM"
              titleProps={{
                component: 'span',
                variant: 'h6',
                className: welcomeStyles.titleOfHeader
              }}
              position="relative"
              action={
                <div className={welcomeStyles.buttons}>
                  {props.isAuthenticated ? (
                    <>
                      <ProfilePictureHeader />
                      <DropdownHeaderMenu logoutUser={props.logoutUser} />
                    </>
                  ) : (
                    <>
                      <Button
                        color="primary"
                        onClick={() => handleNavigation('/register')}
                        className={welcomeStyles.signupButton}
                      >
                        Join us
                      </Button>
                      <Button
                        color="secondary"
                        variant="outlined"
                        onClick={() => handleNavigation('/login')}
                        className={welcomeStyles.loginButton}
                      >
                        Sign in
                      </Button>
                    </>
                  )}
                </div>
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Typography variant="h1">
              Start your blockchain journey
            </Typography>
            <Typography
              style={{ width: '70%' }}
              variant="body1"
              className={welcomeStyles.welcomeText}
            >
              Welcome to The Atrium, an interagency platform designed to foster
              and support learning, collaboration, and discussion across the UN
              community.
            </Typography>
            {props.isAuthenticated ? (
              <Button
                color="primary"
                onClick={() => handleNavigation('/create-projects')}
              >
                Add project
              </Button>
            ) : (
              <>
                <Button
                  color="primary"
                  onClick={() => handleNavigation('/register')}
                  className={welcomeStyles.signupButton}
                >
                  Join us
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => handleNavigation('/login')}
                  className={welcomeStyles.loginButton}
                >
                  Sign in
                </Button>
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <img
              alt="MainBackground"
              src={MainBackground}
              className={classes.image}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} className={whyJoinStyles.titleOfSection}>
          <Typography variant="h2" className={whyJoinStyles.textTitle}>
            Why should I join The Atrium?
          </Typography>
        </Grid>

        <Grid item container xs={12} className={classes.section}>
          <Grid item container xs={12} md={10} xl={6} justify="space-around">
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={5}
              alignItems="center"
              justify="center"
            >
              <Grid item xs="auto">
                <Typography className={classes.header} variant="subtitle1">
                  LEARNING
                </Typography>
                <Typography className={classes.descriptionHeader} variant="h3">
                  The Atrium is a UN-wide platform, enabled by blockchain
                </Typography>
                <div
                  className={[
                    welcomeStyles.description,
                    whyJoinStyles.description
                  ].join(' ')}
                >
                  <Typography
                    variant="body1"
                    className={classes.descriptionText}
                  >
                    By using The Atrium, you’ll earn blockchain-based badges!
                    Learn about the difference between blockchain and
                    cryptocurrency, explore the history of the technology and
                    browse use cases and focused on the use of blockchain for
                    social impact.
                  </Typography>
                  <Button
                    color="primary"
                    className={classes.borderButton}
                    onClick={() => handleNavigation('/learn')}
                  >
                    Start learning
                  </Button>
                </div>
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={12}
              sm={12}
              md={5}
              alignItems="center"
              justify="center"
            >
              <Box width="100%" maxWidth={615} height="100%" maxHeight={575}>
                <img
                  alt="AccelerateInnovation"
                  src={AccelerateInnovation}
                  className={classes.image}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={12}
          className={[classes.section, exploreStyles.section].join(' ')}
        >
          <Grid item container xs={12} md={10} xl={6} justify="space-around">
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={5}
              alignItems="center"
              justify="center"
            >
              <Box width="100%" maxWidth={615} height="100%" maxHeight={456}>
                <img
                  className={classes.image}
                  alt="ExplorePrototypes"
                  src={ExplorePrototypes}
                />
              </Box>
            </Grid>

            <Grid
              container
              item
              xs={12}
              sm={12}
              md={5}
              alignItems="center"
              justify="center"
            >
              <Grid item xs="auto">
                <Typography className={classes.header} variant="subtitle1">
                  EXPLORE
                </Typography>
                <Typography className={classes.descriptionHeader} variant="h3">
                  Explore prototypes and applications of blockchain across
                  entities
                </Typography>
                <div
                  className={[
                    welcomeStyles.description,
                    whyJoinStyles.description
                  ].join(' ')}
                >
                  <Typography
                    variant="body1"
                    className={classes.descriptionText}
                  >
                    Are you curious to learn about different UN use cases? Have
                    you ever wondered how your entity could apply blockchain? In
                    The Atrium, learn what projects and prototypes are being
                    launched within the UN system and get in direct contact with
                    the project owner. Working on a project you’d like to share?
                    The Atrium is the perfect destination to share your work and
                    collaborate with like-minded peers.
                  </Typography>
                  <Button
                    color="primary"
                    className={classes.borderButton}
                    onClick={() => handleNavigation('/projects')}
                  >
                    See projects
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={12}
          className={classes.section}
          style={{ marginTop: 92 }}
        >
          <Grid item container xs={12} md={10} xl={6} justify="space-around">
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={5}
              alignItems="center"
              justify="center"
            >
              <Grid item xs="auto">
                <Typography className={classes.header} variant="subtitle1">
                  ENGAGE
                </Typography>
                <Typography className={classes.descriptionHeader} variant="h3">
                  The Atrium is built with collaboration and community in-mind.
                </Typography>
                <div
                  className={[
                    welcomeStyles.description,
                    whyJoinStyles.description
                  ].join(' ')}
                >
                  <Typography
                    variant="body1"
                    className={classes.descriptionText}
                  >
                    To jumpstart this collaboration, members of The Atrium are
                    encouraged to engage with colleagues across the UN that are
                    also interested in blockchain as well as provide feedback on
                    the platform via the Forum section.
                  </Typography>
                  <Button
                    color="primary"
                    className={classes.borderButton}
                    onClick={() => handleNavigation('/engage')}
                  >
                    See forum
                  </Button>
                </div>
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={12}
              sm={12}
              md={5}
              alignItems="center"
              justify="center"
            >
              <Box width="100%" maxWidth={615} height="100%" maxHeight={418}>
                <img alt="DecisionMaking" src={DecisionMaking} />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={12}
          className={[classes.section, blockchainStyles.section]}
        >
          <Grid item container xs={12} md={10} xl={6} justify="space-around">
            <Grid
              container
              alignItems="center"
              justify="center"
              item
              xs={12}
              sm={12}
              md={5}
            >
              <div className={blockchainStyles.wrapper}>
                <div>
                  <img
                    alt="ReadingBackground"
                    className={blockchainStyles.readingBackground}
                    src={ReadingBackground}
                  />
                  <img
                    alt="ReadingBoy"
                    className={blockchainStyles.readingBoy}
                    src={ReadingBoy}
                  />
                </div>
                <Typography className={classes.header} variant="subtitle1">
                  BLOCKCHAIN ESSENTIALS
                </Typography>
                <Typography
                  className={[
                    blockchainStyles.descriptionHeader,
                    classes.descriptionHeader
                  ].join(' ')}
                  variant="h3"
                >
                  A Practical Guide to Using Blockchain within the United
                  Nations
                </Typography>
              </div>
            </Grid>

            <Grid
              container
              item
              xs={12}
              sm={12}
              md={5}
              alignItems="center"
              justify="center"
            >
              <div className={blockchainStyles.description}>
                <Box padding="51px 60px 50px 40px">
                  <Typography
                    variant="body1"
                    className={classes.descriptionText}
                  >
                    We have created an easy-to-use, practical guide for the UN
                    and public sector, complete with definitions,
                    decision-making tools and use cases, helping you to evaluate
                    if blockchain is the the correct tool for your next
                    solution.
                  </Typography>
                </Box>
                <div className={classes.line} />
                <Button
                  color="primary"
                  className={blockchainStyles.viewDocumentButton}
                >
                  View Document (PDF, 456 KB)
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container xs={12} className={whoBuildingStyles.section}>
          <Grid item container xs={12} md={10} xl={6} justify="space-around">
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={5}
              alignItems="center"
              justify="center"
            >
              <Box maxWidth={480}>
                <Typography className={classes.descriptionHeader} variant="h3">
                  {!props.isAuthenticated
                    ? 'Built Together'
                    : 'Build it Together'}
                </Typography>
                <Typography
                  variant="body1"
                  className={whoBuildingStyles.descriptionText}
                >
                  The Atrium has been established as a decentralised
                  collaboration tool by the United Nations Development Programme
                  (UNDP), UNICEF and the World Food Programme (WFP). The Atrium
                  has its own private, permissioned blockchain which any UN
                  entity can use to prototype. If you’re interested in joining
                  our blockchain and running a node, reach out!
                </Typography>
              </Box>
            </Grid>

            <Grid
              container
              item
              xs={12}
              sm={12}
              md={6}
              alignItems="flex-end"
              justify="center"
            >
              <Box width="100%" maxWidth={615} height="100%" maxHeight={501}>
                <img
                  style={{ width: '100%', height: '100%' }}
                  alt="ButterflyLogos"
                  src={ButterflyLogos}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <JoinAtrium
          LeftImageComponent={<SectionIcon iconName="butterflyLeft" />}
          RightImageComponent={<SectionIcon iconName="butterflyRight" />}
          isAuthenticated={props.isAuthenticated}
        />

        <SectionContainer
          id="atriumBlockchain"
          spacing={4}
          md={8}
          lg={6}
          style={{ justifyContent: 'center' }}
        >
          <Box width="100%">
            <Typography
              className={moreInfoStyles.descriptionHeader}
              variant="h2"
              align="center"
            >
              Want more information?
            </Typography>
            <Typography variant="h4" className={moreInfoStyles.descriptionText}>
              Here are some of our Frequently Asked Questions
            </Typography>
          </Box>

          <Grid item container xs={12}>
            {questions.map(question => (
              <CollapsableQuestion key={question.title} {...question} />
            ))}
          </Grid>
        </SectionContainer>
      </Grid>
    </MainContainer>
  )
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
})

export default connect(mapStateToProps, { logoutUser })(Landing)
