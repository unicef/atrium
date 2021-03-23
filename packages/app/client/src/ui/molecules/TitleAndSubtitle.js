import React from 'react'
import PropTypes from 'prop-types'
import { Title, Subtitle } from '../atoms'

const TitleAndSubtitle = ({
  subtitle,
  title,
  subtitleProps,
  titleProps
}) => (
  <>
    <Title {...titleProps}>
      {title}
    </Title>
   {subtitle && 
      <Subtitle {...subtitleProps}>
        {subtitle}
      </Subtitle>
    }
  </>
)

TitleAndSubtitle.propTypes = {
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

TitleAndSubtitle.defaultProps = {
  subtitle: 'Subtitle',
  title: 'Title',
  subtitleProps: {
    align: 'center',
    alignMobile: 'center',
  },
  titleProps: {
    align: 'center',
    alignMobile: 'center'
  }
}

export default TitleAndSubtitle