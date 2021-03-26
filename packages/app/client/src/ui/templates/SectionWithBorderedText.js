import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TwoPartySection from './TwoPartySection' 
import { BorderedTextBoxWithButton } from '../molecules'
import { makeStyles } from '@material-ui/core/styles'
import { useIsMobileViewPort } from '../hooks'

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: 20,
    [theme.breakpoints.down("xs")]: {
      fontSize: 18,
      marginLeft: 0,
      marginBottom: 5,
    }
  }
}))

const SectionWithBorderedText = ({ reverse, boxTitle, boxDescription, actionLabel, bgColor, otherComponent, onClick, hideBorder }) => {
  const classes = useStyles()
  const isMobileView = useIsMobileViewPort()

  return (
    <TwoPartySection
      bgColor={bgColor}
      reverse={reverse && !isMobileView}
    >
      <Grid item container justify="center" xs={12} lg={8}>
        {otherComponent}
      </Grid>
      <Grid direction="column" justify="center" container item xs={12} lg={8}>
        <Typography className={classes.title} variant="h3">
          {boxTitle}
        </Typography>

        <BorderedTextBoxWithButton gridProps={{ xs: 'auto' }} hideBorder={hideBorder} onClick={onClick} buttonLabel={actionLabel}>
          {boxDescription}
        </BorderedTextBoxWithButton>
      </Grid>
    </TwoPartySection>
  )
}

export default SectionWithBorderedText
