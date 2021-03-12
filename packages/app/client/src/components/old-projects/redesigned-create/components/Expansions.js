import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

const useStyles = makeStyles(theme => ({
  expansionsContainer: {
    marginBottom: theme.spacing(15)
  },
  expansion: {
    marginBottom: theme.spacing(1),
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.colors['black']}`,
    borderRadius: '0 !important',
    '&::before': {
      display: 'none'
    }
  },
  expansionHead: {
    padding: 0
  },
  icon: {
    color: theme.colors['black']
  }
}))

const Panel = ({ title, content }) => {
  const classes = useStyles()
  return (
    <ExpansionPanel className={classes.expansion}>
      <ExpansionPanelSummary
        className={classes.expansionHead}
        expandIcon={<ExpandMoreIcon className={classes.icon} />}
      >
        <Typography>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>{content}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

const Expansions = () => {
  const classes = useStyles()
  return (
    <div className={classes.expansionsContainer}>
      <Panel
        title="How do I invite The Atrium to my Github project?"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
        sit amet blandit leo lobortis eget."
      />
      <Panel
        title="Why do I need to invite The Atrium to my Github project"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
        sit amet blandit leo lobortis eget."
      />
    </div>
  )
}

export default Expansions
