import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

const useStyles = makeStyles(theme => ({
  expansionsContainer: {
    marginTop: theme.spacing(10),

    '@global': {
      '.MuiExpansionPanel-root': {
        marginBottom: theme.spacing(1),
        color: theme.colors['warm-gray'],
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.colors['warm-gray']}`,
        borderRadius: '0 !important',
        backgroundColor: 'transparent',
        '&::before': {
          display: 'none'
        }
      },
      '.MuiExpansionPanelSummary-expandIcon': {
        color: theme.colors['warm-gray']
      },
      '.Mui-expanded': {
        color: theme.colors['dark-forest-green']
      },
      '.Mui-expanded + .MuiExpansionPanelSummary-expandIcon': {
        color: theme.colors['dark-forest-green']
      },
      '.MuiExpansionPanelSummary-root': {
        padding: 0
      },
      '.MuiExpansionPanelDetails-root': {
        padding: '11px 0 24px 0'
      }
    }
  },
  typography: {
    fontSize: 21
  }
}))

const Panel = ({ title, content }) => {
  const classes = useStyles()
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.typography}>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography className={classes.typography}>{content}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

const ExpansionList = ({ list }) => {
  const classes = useStyles()

  const renderList = list.map((obj, k) => <Panel key={k} {...obj} />)

  return <div className={classes.expansionsContainer}>{renderList}</div>
}

ExpansionList.propTypes = {
  list: PropTypes.array.isRequired
}

export default ExpansionList
