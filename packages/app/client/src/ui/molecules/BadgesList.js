import React from 'react'
import Badge from './Badge'
import {
  GreenBadge1,
  GreenBadge2,
  GreenBadge3,
  GreenBadge4,
  GreenBadge5,
  GreenBadge6,
  GreenBadge7,
  GreyBadge1,
  GreyBadge2,
  GreyBadge3,
  GreyBadge4,
  GreyBadge5,
  GreyBadge6,
  GreyBadge7
} from '../pages/Account/assets'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Image } from '../atoms'

const badges = [
  {
    level: 1,
    value: 10,
    greyImg: GreyBadge1,
    greenImg: GreenBadge1,
    title: 'Seed'
  },
  {
    level: 2,
    value: 25,
    greyImg: GreyBadge2,
    greenImg: GreenBadge2,
    title: 'Sprout'
  },
  {
    level: 3,
    value: 50,
    greyImg: GreyBadge3,
    greenImg: GreenBadge3,
    title: 'Budding'
  },
  {
    level: 4,
    value: 100,
    greyImg: GreyBadge4,
    greenImg: GreenBadge4,
    title: 'Flowering'
  },
  {
    level: 5,
    value: 250,
    greyImg: GreyBadge5,
    greenImg: GreenBadge5,
    title: 'Bunch of Flowers'
  },
  {
    level: 6,
    value: 500,
    greyImg: GreyBadge6,
    greenImg: GreenBadge6,
    title: 'Growing Tree'
  },
  {
    level: 7,
    value: 1000,
    greyImg: GreyBadge7,
    greenImg: GreenBadge7,
    title: 'Forest'
  }
]

function BadgesList({ start, end, earned, profilePage }) {
  return (
    <>
      {start === end && earned ? (
        <Grid item xs={12}>
          <Typography variant="body1">You haven’t earned badges yet</Typography>
        </Grid>
      ) : start === end ? (
        <Grid item xs={12}>
          <Typography variant="body1">
            There is no more badges to earn
          </Typography>
        </Grid>
      ) : (
        badges.slice(start, end).map(badge =>
          profilePage ? (
            <Grid item xs={12}>
              <Image height="62px" width="62px" src={badge.greenImg} />
            </Grid>
          ) : (
            <Badge
              badge={badge.value}
              level={badge.level}
              title={badge.title}
              last={+badge.level === end}
              img={earned ? badge.greenImg : badge.greyImg}
            />
          )
        )
      )}
    </>
  )
}

export default BadgesList
