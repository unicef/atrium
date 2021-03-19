import React from 'react'
import propTypes from 'prop-types'
import { Title, Subtitle } from '../atoms'

const TitleAndSubtitle = ({
  subtitle,
  title,
  subtitleAlign,
  subtitleAlignMobile,
  titleAlign,
  titleAlignMobile
}) => (
  <>
    <Title {...{ titleAlign, titleAlignMobile }}>
      {title}
    </Title>
   {subtitle && 
      <Subtitle {...{ subtitleAlign, subtitleAlignMobile }}>
        {subtitle}
      </Subtitle>
    }
  </>
)

TitleAndSubtitle.propTypes = {
  subtitle: propTypes.oneOfType([propTypes.string, propTypes.node]),
  title: propTypes.oneOfType([propTypes.string, propTypes.node]),
  subtitleAlign: propTypes.string,
  subtitleAlignMobile: propTypes.string,
  titleAlign: propTypes.string,
  titleAlignMobile: propTypes.string
}

TitleAndSubtitle.defaultProps = {
  subtitle: 'Subtitle',
  title: 'Title',
  subtitleAlign: 'center',
  subtitleAlignMobile: 'center',
  titleAlign: 'center',
  titleAlignMobile: 'center'
}

export default TitleAndSubtitle