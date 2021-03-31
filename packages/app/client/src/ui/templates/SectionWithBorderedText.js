import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import SectionContainer from './SectionContainer' 
import { BorderedTextBoxWithButton } from '../molecules'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles, useTheme } from '@material-ui/core/styles'

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

const SectionWithBorderedText = ({
  boxTitle,
  boxDescription,
  actionLabel,
  bgColor,
  otherComponent,
  onClick,
  hideBorder,
  borderedTextFirst,
  id
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const isPrimary = !borderedTextFirst || matches
  const isSecondary = borderedTextFirst && !matches

  const wrappedComponent = (
    <Grid item container xs={12} sm={10} md={5} lg={5}>
      {otherComponent}
    </Grid>
  )
 
  return (
    <SectionContainer id={id} bgColor={bgColor} justify={matches ? 'center' : "space-between" } alignItems="center">
      {isPrimary && wrappedComponent}
      <Grid item container xs={12} sm={10} md={5} lg={5}>
        <div>
          <Typography className={classes.title} variant="h3">
            {boxTitle}
          </Typography>
        </div>

        <BorderedTextBoxWithButton hideBorder={hideBorder} onClick={onClick} buttonLabel={actionLabel}>
          {boxDescription}
        </BorderedTextBoxWithButton>
      </Grid>
      {isSecondary && wrappedComponent}
    </SectionContainer>
  )
}

export default SectionWithBorderedText
