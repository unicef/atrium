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
  },
  container: {
    padding: 80,
    [theme.breakpoints.down("xs")]: {
      padding: 20
    },
  }
}))

const SectionWithBorderedText = ({ reverse, boxTitle, boxDescription, actionLabel, bgColor, otherComponent, onClick }) => {
  const classes = useStyles()
  const isMobileView = useIsMobileViewPort()

  return (
    <TwoPartySection
      bgColor={bgColor}
      reverse={reverse && !isMobileView}
      partiesContainerProps={[
        {
          sm: 12,
          justify: 'flex-end'
        },
        {
          sm: 12
        }
      ]}
      containerProps={{ className: classes.container }}
    >
      <Grid item container justify="center" xs={12} sm={12} md={10} lg={8}>
        {otherComponent}
      </Grid>
      <Grid direction="column" justify="center" container item xs={12} sm={12} md={10} lg={6}>
        <Typography className={classes.title} variant="h3">
          {boxTitle}
        </Typography>

        <BorderedTextBoxWithButton gridProps={{ xs: 'auto' }}  onClick={onClick} buttonLabel={actionLabel}>
          {boxDescription}
        </BorderedTextBoxWithButton>
      </Grid>
    </TwoPartySection>
  )
}

export default SectionWithBorderedText
