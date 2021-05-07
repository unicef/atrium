import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { getRelativeTime } from '../../utils/timeManipulation'
import { dateFormatter } from '../utils'

const styles = (theme) => ({
  root: props => ({
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '13px',
    lineHeight: '140%',
    color: theme.colors[props.color]
  })
})

const DateText = withStyles(styles)(Typography)

DateText.defaultProps = {
  color: 'black-three'
}

export const RelativeDate = ({ date, color }) => {
  const dateExists = date !== undefined

  const relativeDate = React.useMemo(() => dateExists && getRelativeTime(date), [date])

  if (!dateExists) return null

  return (
    <DateText color={color}>
      {relativeDate} ago
    </DateText>
  )
}

export const AbsoluteDate = ({ date, color }) => {
  const dateExists = date !== undefined

  const completeDate = React.useMemo(() => dateExists && dateFormatter({ date, separator: '.'}), [date])

  if (!dateExists) return null

  return (
    <DateText color={color}>
      {completeDate}
    </DateText>
  )
}
