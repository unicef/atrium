import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { TextField } from '../../../ui'
import UNICEFLogo from './imgs/UNICEF_logo.png'
import WFPLogo from './imgs/WFP_logo.png'
import UNDPLogo from './imgs/UNDP_logo.png'
import sectionBreak from '../assets/section-line.svg'
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
  ReadingBackground
} from '../assets'

const theseAreBadVariableNamesThereIsNoReasonToSeparateThem = makeStyles(
  () => ({
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
      marginRight: '10px',
    },
    borderButton: {
      marginLeft: '10%',
      marginBottom: '-25px'
    },
    descriptionHeader: {
      textAlign: 'left',
      fontWeight: 'bold',
      fontSize: 36,
      letterSpacing: 1.4
    },
    header: {
      color: '#178FE2',
      marginBottom: '5%',
      fontWeight: 'bold',
      fontSize: 15
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
    textAlign: 'left',
    fontWeight: 'bold'
  },
  main: {
    height: '100%',
    minHeight: '100vh',
    width: '80%',
    margin: 'auto'
  },
  section: {
    display: 'flex',
    width: '100%',
    '& > div': {
      paddingTop: 119,
      maxWidth: 635
    },
    textAlign: 'left'
  },
  imgInSection: {
    width: '834px',
    height: '481px',
    margin: '0 auto'
  },
  description: {
    textAlign: 'left',
    marginTop: '10%',
    // marginBottom: '10%',
    fontSize: 19
  }
}))

const useWhyJoinSectionStyles = makeStyles(theme => ({
  section: {
    paddingBottom: 100,
    backgroundColor: 'DDFBF6'
  },
  titleOfSection: {
    marginTop: '10%',
    textAlign: 'center'
  },
  textTitle: {
    fontWeight: 'bold'
  },
  description: {
    marginTop: '10%',
    border: 'solid 1.2px',
    borderRadius: 5,
    width: '80%',
    backgroundColor: 'white'
  },
  descriptionText: {
    margin: '10%',
    marginBottom: '15%',
    fontSize: 18
  },
}))

const useWhoBuildingSectionStyles = makeStyles(theme => ({
  section: {
    backgroundImage: `url(${BuildBackground})`
  },
  descriptionText: {
    fontSize: 21,
    marginTop: '10%',
    marginBottom: 30,
    '@media (max-width:600px)': {
      fontSize: 18
    }
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
  }
}))

const useBlockchainSectionStyles = makeStyles(theme => ({
  viewdocumentButton: {
    width: '270px',
    color: 'white',
    height: '50px',
    margin: '10%',
    borderRadius: '3px',
    textTransform: 'none',
    backgroundColor: 'rgb(1, 206, 75)'
  },
  section: {
    backgroundColor: '#DDFBF6'
  },
  description: {
    border: 'solid 1.2px',
    borderRadius: 5,
    width: '80%',
    marginTop: '10%',
    marginLeft: '10%',
    marginRight: '10%',
    backgroundColor: 'white'
  },
  descriptionText: {
    fontSize: 18,
    margin: '10%'
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

const useMoreInfoStyles = makeStyles(theme => ({
  descriptionHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 36,
    letterSpacing: 1.4
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
    fontWeight: 'bold',
    fontSize: 36,
    letterSpacing: 1.4,
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
  submitButton: {
    backgroundColor: '#3592F1',
    color: 'white',
    width: '20%'
  },
  emailInput: {
    marginTop: '10%',
    border: 'solid 1.2px',
    borderColor: 'white',
    borderRadius: '3px',
    marginBottom: '5%'
  },
  textField: {
    width: '80%',
    color: '#3592F1'
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

  const handleRedirectToLogin = () => {
    props.history.push('/login')
  }

  const handleRedirectToaddproject = () => {
    props.history.push('/create-projects')
  }

  const handleRedirectToSignUp = () => {
    props.history.push('/login#register')
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
          // actionInlineStyle={{ marginRight: 0 }}
          action={
            <div className={classes.buttons}>
              <Button
                color="primary"
                onClick={handleRedirectToSignUp}
                className={classes.signupButton}
              >
                Join us
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleRedirectToLogin}
                className={classes.loginButton}
              >
                Sign in
              </Button>
            </div>
          }
        />
      )}
      <div className={welcomeStyles.main}>
        <Grid container xs={12}>
          <Grid item container xs={12} className={welcomeStyles.section}>
            <Grid item xs={12} sm={12} md={4}>
              <Typography
                className={welcomeStyles.header}
                component="h2"
                variant="h2"
                color="secondary"
              >
                Start your blockchain journey
              </Typography>
              <Typography component="h5" className={welcomeStyles.description}>
                Welcome to The Atrium, an interagency platform designed to
                foster and support learning, collaboration, and discussion
                across the UN community.
              </Typography>
              {props.isAuthenticated ? (
                <Button
                  color="primary"
                  onClick={handleRedirectToaddproject}
                  className={classes.signupButton}
                >
                  Add project
                </Button>
              ) : (
                <>
                  <Button
                    color="primary"
                    onClick={handleRedirectToSignUp}
                    className={classes.signupButton}
                  >
                    Join us
                  </Button>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={handleRedirectToLogin}
                    className={classes.loginButton}
                  >
                    Sign in
                  </Button>
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <div className={welcomeStyles.imgInSection}>
                <img
                  alt="MainBackground"
                  style={{ width: 750 }}
                  src={MainBackground}
                />
              </div>
            </Grid>
          </Grid>

          <div className={whyJoinStyles.titleOfSection}>
            <Typography
              component="h1"
              variant="h2"
              color="secondary"
              className={whyJoinStyles.textTitle}
            >
              Why should I join The Atrium?
            </Typography>
          </div>

          <Grid
            item
            container
            xs={12}
            className={[welcomeStyles.section, whyJoinStyles.section]}
          >
            <Grid item xs={12} sm={12} md={4}>
              <Typography
                className={classes.header}
                component="h5"
                variant="h5"
                color="secondary"
              >
                LEARNING
              </Typography>
              <Typography
                className={classes.descriptionHeader}
                component="h2"
                variant="h2"
                color="secondary"
              >
                The Atrium is a UN-wide platform, enabled by blockchain
              </Typography>
              <div className={whyJoinStyles.description}>
                <Typography
                  component="h5"
                  className={whyJoinStyles.descriptionText}
                >
                  By using The Atrium, you’ll earn blockchain-based badges!
                  Learn about the difference between blockchain and
                  cryptocurrency, explore the history of the technology and
                  browse use cases and focused on the use of blockchain for
                  social impact.
                </Typography>
                <Button color="primary" className={classes.borderButton}>
                  Start learning
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <div className={welcomeStyles.imgInSection}>
                <img alt="AccelerateInnovation" src={AccelerateInnovation}/>
              </div>
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={12}
            className={[
              whyJoinStyles.section,
              welcomeStyles.section,
              exploreStyles.section
            ]}
          >
            <Grid item xs={12} sm={12} md={8}>
              <div className={welcomeStyles.rightsection}>
                <img alt="ExplorePrototypes" src={ExplorePrototypes} />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography
                className={classes.header}
                component="h5"
                variant="h5"
                color="secondary"
              >
                EXPLORE
              </Typography>
              <Typography
                className={classes.descriptionHeader}
                component="h2"
                variant="h2"
                color="secondary"
              >
                Explore prototypes and applications of blockchain across
                entities
              </Typography>
              <div className={whyJoinStyles.description}>
                <Typography
                  component="h5"
                  className={whyJoinStyles.descriptionText}
                >
                  Are you curious to learn about different UN use cases? Have
                  you ever wondered how your entity could apply blockchain? In
                  The Atrium, learn what projects and prototypes are being
                  launched within the UN system and get in direct contact with
                  the project owner. Working on a project you’d like to share?
                  The Atrium is the perfect destination to share your work and
                  collaborate with like-minded peers.
                </Typography>
              </div>
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={12}
            className={[whyJoinStyles.section, welcomeStyles.section]}
          >
            <Grid item xs={12} sm={12} md={4}>
              <Typography
                className={classes.header}
                component="h5"
                variant="h5"
                color="secondary"
              >
                ENGAGE
              </Typography>
              <Typography
                className={classes.descriptionHeader}
                component="h2"
                variant="h2"
                color="secondary"
              >
                The Atrium is built with collaboration and community in-mind.
              </Typography>
              <div className={whyJoinStyles.description}>
                <Typography
                  component="h5"
                  className={whyJoinStyles.descriptionText}
                >
                  To jumpstart this collaboration, members of The Atrium are
                  encouraged to engage with colleagues across the UN that are
                  also interested in blockchain as well as provide feedback on
                  the platform via the Forum section.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <div className={welcomeStyles.rightsection}>
                <img alt="DecisionMaking" src={DecisionMaking} />
              </div>
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={12}
            className={[
              whyJoinStyles.section,
              welcomeStyles.section,
              blockchainStyles.section
            ]}
          >
            <Grid item xs={12} sm={12} md={6}>
              <div>
                <img alt="ReadingBoy" style={{ zIndex: 2 }} src={ReadingBoy} />{' '}
                <img
                  alt="ReadingBackground"
                  style={{ zIndex: 5 }}
                  src={ReadingBackground}
                />
              </div>
              <Typography
                className={classes.header}
                component="h5"
                variant="h5"
                color="secondary"
              >
                BLOCKCHAIN ESSENTIALS
              </Typography>
              <Typography
                className={classes.descriptionHeader}
                component="h2"
                variant="h2"
                color="secondary"
              >
                A Practical Guide to Using Blockchain within the United Nations
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              style={{ paddingTop: 0 }}
              className={blockchainStyles.description}
            >
              <Typography
                component="h5"
                className={blockchainStyles.descriptionText}
              >
                We have created an easy-to-use, practical guide for the UN and
                public sector, complete with definitions, decision-making tools
                and use cases, helping you to evaluate if blockchain is the
                correct tool for your next solution.
              </Typography>
              <div>----line----</div>
              <Button
                type="button"
                className={blockchainStyles.viewdocumentButton}
              >
                View Document (PDF, 456 KB)
              </Button>
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={12}
            className={[
              whoBuildingStyles.section,
              whyJoinStyles.section,
              welcomeStyles.section
            ]}
          >
            <Grid item xs={12} sm={12} md={4}>
              <Typography
                className={classes.descriptionHeader}
                component="h2"
                variant="h2"
                color="secondary"
              >
                Build Together
              </Typography>
              <Typography
                component="p"
                variant="body1"
                className={whoBuildingStyles.descriptionText}
                style={{ textAlign: 'left' }}
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
              <div>
                <Grid item xs={4}>
                  <img alt="UNDPLogo" src={UNDPLogo} style={{ width: 54 }} />
                </Grid>
                <Grid item xs={4}>
                  <img alt="UNICEFLogo" src={UNICEFLogo} style={{ width: 170 }} />
                </Grid>
                <Grid item xs={4}>
                  <img alt="WFPLogo" src={WFPLogo} style={{ width: 100 }} />
                </Grid>
              </div>
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={12}
            className={[
              whyJoinStyles.section,
              welcomeStyles.section,
              inviteStyles.section
            ]}
          >
            <Grid item xs={12} className={inviteStyles.container}>
              <Typography
                className={inviteStyles.sectionHeader}
                component="h2"
                variant="h2"
                color="secondary"
              >
                {props.isAuthenticated ? 'Invite to Atrium' : 'Join Atrium now'}
              </Typography>
              <div className={inviteStyles.emailInput}>
                <TextField
                  className={inviteStyles.textField}
                  placeholder="For example—janedoe@wfp.org"
                />
                <Button className={inviteStyles.submitButton}>Submit</Button>
              </div>
              <div>----line OR line----</div>
              <Button className={inviteStyles.contactButton}>Contact us</Button>
              <Typography className={inviteStyles.descriptionText}>
                We are looking for other organizations that would be interested
                in setting up their own node, therefore, participating by
                increasing the resilience of the system. If interested, please
                contact blockchain@uninnovation.network.
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={12}
            className={[
              whyJoinStyles.section,
              welcomeStyles.section,
              moreInfoStyles.section
            ]}
          >
            <Grid
              item
              xs={12}
              className={moreInfoStyles.container}>
              <Typography
                className={moreInfoStyles.descriptionHeader}
                component="h2"
                variant="h2"
                color="secondary"
              >
                Want more information?
              </Typography>
              <Typography
                component="h3"
                variant="h4"
                color="secondary"
                className={moreInfoStyles.descriptionText}
              >
                Here are some of our Frequently Asked Questions
              </Typography>
              <ExpansionList
                classname={moreInfoStyles.expansionList}
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
