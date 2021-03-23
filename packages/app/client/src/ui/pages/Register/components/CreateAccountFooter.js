import React from 'react'
import Grid from '@material-ui/core/Grid'
import { TextWithLinks } from '../../../molecules'
import { Divider } from '../../../atoms'
import { ButterflySVG, TalkBubble } from '../../../assets/'
import { Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import { useIsMobileViewPort } from '../../../hooks'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  message: {
    marginBottom: 50
  }
})

const ColumnWithLink = ({ to, text, Icon }) => (
  <Grid item container spacing={2} xs={5} justify="center" alignItems="center">
    <Grid item container justify="center" alignItems="center" xs={12}>
      <Icon />
    </Grid>
    <Grid item xs={9}>
      <Typography variant="body2" align="center">
        {text}
      </Typography>
    </Grid>
    <Link
      component={RouterLink}
      variant="body2"
      to={to}
    >
      See more
    </Link>
  </Grid>
)

const CreateAccountFooter = () => {
  const isMobileViewPort = useIsMobileViewPort()
  const classes = useStyles()

  return (
    <Grid container justify="center">
      <Grid
        item
        container
        justify={isMobileViewPort ? "flex-start" :  "center"}
        alignItems="center"
      >
        <TextWithLinks
          links={[
            {
              to: '/login',
              str: 'Log in',
              variant: 'body2'
            }
          ]}
          mt={36}
        >
          You already have an account? Log in
        </TextWithLinks>
      </Grid>

      <Grid item xs={12}>
        <Divider mt={31} mb={27} />
      </Grid>
      
      <Grid item xs={12} sm={6} className={classes.message}>
        <Typography align="center">
          If you work outside of the UN, you can still
        </Typography>
      </Grid>

      <Grid
        item
        container
        xs={12}
        justify="center"
      >

        <ColumnWithLink
          text=" Find out more about Atrium"
          to="/learn"
          Icon={TalkBubble}
        />

        <Divider orientation="vertical" flexItem />

        <ColumnWithLink
          text="Learn about blockchain"
          to="/learn"
          Icon={ButterflySVG}
        />
      </Grid>
    </Grid>
  )
}

export default CreateAccountFooter