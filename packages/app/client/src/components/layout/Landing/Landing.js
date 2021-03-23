import React, {useState} from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { TextField } from '../../../ui'
import { Button } from '../../../ui'
import { LimitedHeader } from '../Header'
import { ExpansionList } from './components'
import {
  MainBackground,
  AccelerateInnovation,
  DecisionMaking,
  ExplorePrototypes,
  BuildBackground,
  ReadingBoy,
  ReadingBackground,
  ButterflyLeft,
  ButterflyRight,
  ButterflyLogos
} from '../assets'
import { ATRIUM_CONSTANTS } from '../../../unin-constants'

const theseAreBadVariableNamesThereIsNoReasonToSeparateThem = makeStyles(
  () => ({
    borderButton: {
      marginLeft: '10%',
      marginBottom: '-25px'
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
      marginBottom: '5%'
    },
    section: {
      display: 'flex',
      width: '100%',
      paddingTop: 119,
      '& > div': {
        maxWidth: 635
      },
      textAlign: 'left',
      paddingBottom: 100,
      justifyContent: 'center'
    },
    imgInSection: {
      width: '100%',
      maxWidth: '750px',
      margin: '0 10%'
    },
    line: {
      borderBottom: 'solid 1.2px',
      margin: '10% 0'
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
      margin: '10% 10% 0 10%',
      fontSize: 18
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
  description: {
    textAlign: 'left',
    margin: '10% 10% 0 0',
    fontSize: '18px',
    lineHeight: '180%'
  },
  buttons: {
    display: 'flex',
    textAlign: 'right'
  },
  loginButton: {
    width: '105px',
    height: '50px'
  },
  signupButton: {
    width: '105px',
    height: '50px',
    marginRight: '10px'
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
    backgroundImage: `url(${BuildBackground})`
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
    paddingBottom: 150,
    '& > div:first-child': {
      maxWidth: 795
    }
  },
  imgInSection: {
    width: '100%',
    maxWidth: '628px',
    margin: '10% 10% 0 0'
  }
}))

const useBlockchainSectionStyles = makeStyles(theme => ({
  viewDocumentButton: {
    width: '270px',
    height: '50px',
    margin: '0 10% 10%'
  },
  section: {
    marginTop: '10%',
    backgroundColor: '#DDFBF6'
  },
  descriptionHeader: {
    fontSize: '38px !important'
  },
  description: {
    border: 'solid 1.2px',
    borderRadius: 5,
    width: '80%',
    margin: '0 10% 0 10%',
    backgroundColor: 'white'
  },
  readingBoy: {
    margin: '-273px 0 10% 0'
  },
  readingBackground: {
    margin: '-120px 0 0 -21%'
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
    margin: '5%',
    fontSize: 18
  },
  container: {
    alignItems: 'center'
  }
}))

const useInviteStyles = makeStyles(theme => ({
  section: {
    backgroundColor: '#3592F1',
    alignItems: 'center'
  },
  sectionHeader: {
    textAlign: 'center',
    color: 'white'
  },
  container: {
    alignItems: 'center'
  },
  contactButton: {
    marginTop: '5%',
    backgroundColor: 'white',
    color: '#3592F1',
    width: '100%'
  },
  emailInput: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10%',
    border: 'solid 1.2px',
    borderColor: 'white',
    borderRadius: '3px',
    marginBottom: '5%'
  },
  textField: {
    width: '79%',
  },
  submitButton: {
    backgroundColor: '#3592F1',
    color: 'white',
    width: '19%',
    margin: 0,
  },
  descriptionText: {
    marginTop: '10%',
    marginLeft: '10%',
    width: '80%',
    color: 'white',
    fontWeight: '300',
    fontSize: '14px',
    textAlign: 'center'
  }
}))

const Landing = props => {
  const welcomeStyles = useWelcomeSectionStyles()
  const whyJoinStyles = useWhyJoinSectionStyles()
  const whoBuildingStyles = useWhoBuildingSectionStyles()
  const exploreStyles = useExploreSectionStyles()
  const moreInfoStyles = useMoreInfoStyles()
  const blockchainStyles = useBlockchainSectionStyles()
  const inviteStyles = useInviteStyles()
  const classes = theseAreBadVariableNamesThereIsNoReasonToSeparateThem()

  const [email, setEmail] = useState('')
  const handleRedirectToLogin = () => {
    props.history.push('/login')
  }

  const handleRedirectToAddProject = () => {
    props.history.push('/create-projects')
  }

  const handleRedirectToSignUp = () => {
    props.history.push('/register')
  }

  const handleRedirectToViewProjects = () => {
    props.history.push('/view-projects')
  }

  const handleRedirectToLearn = () => {
    props.history.push('/learn')
  }

  const handleRedirectToForum = () => {
    props.history.push('/engage')
  }

  return (
    <>
      {!props.isAuthenticated && (
        <LimitedHeader
          title="THE ATRIUM"
          titleProps={{
            component: 'span',
            variant: 'h6',
            className: welcomeStyles.titleOfHeader
          }}
          action={
            <div className={welcomeStyles.buttons}>
              <Button
                color="primary"
                onClick={handleRedirectToSignUp}
                className={welcomeStyles.signupButton}
              >
                Join us
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleRedirectToLogin}
                className={welcomeStyles.loginButton}
              >
                Sign in
              </Button>
            </div>
          }
        />
      )}
      <div className={classes.main}>
        <Grid container xs={12}>
          <Grid item container xs={12} className={classes.section}>
            <Grid item xs={12} sm={12} md={4}>
              <Typography className={welcomeStyles.header} variant="h2">
                Start your blockchain journey
              </Typography>
              <Typography variant="body1" className={welcomeStyles.description}>
                Welcome to The Atrium, an interagency platform designed to
                foster and support learning, collaboration, and discussion
                across the UN community.
              </Typography>
              {props.isAuthenticated ? (
                <Button
                  color="primary"
                  onClick={handleRedirectToAddProject}
                  className={welcomeStyles.signupButton}
                >
                  Add project
                </Button>
              ) : (
                <>
                  <Button
                    color="primary"
                    onClick={handleRedirectToSignUp}
                    className={welcomeStyles.signupButton}
                  >
                    Join us
                  </Button>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={handleRedirectToLogin}
                    className={welcomeStyles.loginButton}
                  >
                    Sign in
                  </Button>
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <img
                className={classes.imgInSection}
                alt="MainBackground"
                src={MainBackground}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} className={whyJoinStyles.titleOfSection}>
            <Typography variant="h2" className={whyJoinStyles.textTitle}>
              Why should I join The Atrium?
            </Typography>
          </Grid>

          <Grid item container xs={12} className={classes.section}>
            <Grid item xs={12} sm={12} md={4}>
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
                <Typography variant="body1" className={classes.descriptionText}>
                  By using The Atrium, you’ll earn blockchain-based badges!
                  Learn about the difference between blockchain and
                  cryptocurrency, explore the history of the technology and
                  browse use cases and focused on the use of blockchain for
                  social impact.
                </Typography>
                <Button
                  color="primary"
                  className={classes.borderButton}
                  onClick={handleRedirectToLearn}
                >
                  Start learning
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <img
                className={classes.imgInSection}
                alt="AccelerateInnovation"
                src={AccelerateInnovation}
              />
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={12}
            className={[classes.section, exploreStyles.section].join(' ')}
          >
            <Grid item xs={12} sm={12} md={8}>
              <img
                className={exploreStyles.imgInSection}
                alt="ExplorePrototypes"
                src={ExplorePrototypes}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
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
                <Typography variant="body1" className={classes.descriptionText}>
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
                  onClick={handleRedirectToViewProjects}
                >
                  See projects
                </Button>
              </div>
            </Grid>
          </Grid>

          <Grid item container xs={12} className={classes.section}>
            <Grid item xs={12} sm={12} md={4}>
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
                <Typography variant="body1" className={classes.descriptionText}>
                  To jumpstart this collaboration, members of The Atrium are
                  encouraged to engage with colleagues across the UN that are
                  also interested in blockchain as well as provide feedback on
                  the platform via the Forum section.
                </Typography>
                <Button
                  color="primary"
                  className={classes.borderButton}
                  onClick={handleRedirectToForum}
                >
                  See forum
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <img
                className={classes.imgInSection}
                alt="DecisionMaking"
                src={DecisionMaking}
              />
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={12}
            className={[classes.section, blockchainStyles.section]}
          >
            <Grid item xs={12} sm={12} md={6}>
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
            <Grid item xs={12} sm={12} md={6}>
              <div className={blockchainStyles.description}>
                <Typography variant="body1" className={classes.descriptionText}>
                  We have created an easy-to-use, practical guide for the UN and
                  public sector, complete with definitions, decision-making
                  tools and use cases, helping you to evaluate if blockchain is
                  the the correct tool for your next solution.
                </Typography>
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

          <Grid
            item
            container
            xs={12}
            className={[whoBuildingStyles.section, classes.section].join(' ')}
          >
            <Grid item xs={12} sm={12} md={4}>
              <Typography className={classes.descriptionHeader} variant="h3">
                {!props.isAuthenticated
                  ? 'Built Together'
                  : 'Build it Together'}
              </Typography>
              <Typography
                variant="body1"
                className={whoBuildingStyles.descriptionText}
              >
                The Atrium has been established as a decentralised collaboration
                tool by the United Nations Development Programme (UNDP), UNICEF
                and the World Food Programme (WFP). The Atrium has its own
                private, permissioned blockchain which any UN entity can use to
                prototype. If you’re interested in joining our blockchain and
                running a node, reach out!
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <img
                  className={classes.imgInSection}
                  style={{    marginBottom: '-105px'}}
                  alt="ButterflyLogos"
                  src={ButterflyLogos}
              />
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={12}
            className={[classes.section, inviteStyles.section].join(' ')}
          >
            <Grid item xs={12} md={4}>
              <img src={ButterflyLeft} />
            </Grid>

            <Grid item xs={12} md={4} className={inviteStyles.container}>
              <Typography className={inviteStyles.sectionHeader} variant="h2">
                {props.isAuthenticated ? 'Invite to Atrium' : 'Join Atrium now'}
              </Typography>
              <div className={inviteStyles.emailInput}>
                <TextField
                  InputProps={{
                    disableUnderline: true
                  }}
                  className={inviteStyles.textField}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="For example—janedoe@wfp.org"
                />
                <Button className={inviteStyles.submitButton}
                  onClick={() => (document.location.href = `mailto:${email}`)}
                >Submit</Button>
              </div>
              <div className={classes.separator}>
                <div className={classes.smallLine} />
                <Typography variant="body1" className={classes.separatorOr}>
                  OR
                </Typography>
                <div className={classes.smallLine} />
              </div>
              <Button
                className={inviteStyles.contactButton}
                onClick={() =>
                  (document.location.href = `mailto:${ATRIUM_CONSTANTS.ATRIUM_EMAIL_CONTACT}`)
                }
              >
                Contact us
              </Button>
              <Typography className={inviteStyles.descriptionText}>
                We are looking for other organizations that would be interested
                in setting up their own node, therefore, participating by
                increasing the resilience of the system. If interested, please
                contact blockchain@uninnovation.network.
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <img style={{width: '350px', marginLeft: '27%'}} src={ButterflyRight} />
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={12}
            className={[classes.section, moreInfoStyles.section]}
          >
            <Grid item xs={12} className={moreInfoStyles.container}>
              <Typography
                className={moreInfoStyles.descriptionHeader}
                variant="h2"
              >
                Want more information?
              </Typography>
              <Typography
                variant="h4"
                className={moreInfoStyles.descriptionText}
              >
                Here are some of our Frequently Asked Questions
              </Typography>
              <ExpansionList
                list={[
                  {
                    title: 'What kind of projects can I share on The Atrium?',
                    content: `Any distributed application (dApp) can be shared on The Atrium. In addition to uploading your project to the "Projects" page, you can also share in The Atrium's Github repository. This allows any user of The Atrium to access the code, increasing the opportunity for rapid innovation. As a note, although The Atrium uses a private Ethereum blockchain as the test network, the GitHub repository is agnostic to infrastructure.`
                  },
                  {
                    title:
                      'I am working on a project that is not public-facing. How secure is The Atrium to host my project?',
                    content:
                      'The Atrium is a tool which enables UN organisations to learn about and collaborate on blockchain projects. Hence keeping the platform restricted to UN personnel helps individuals to comfortably share their ideas and work in a secure environment.'
                  }
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)
