import React from 'react'
import PropTypes from 'prop-types'
import { CommentList } from '../'
import CommentInput from '../../components/CommentInput'

const CommentBox = ({ projectId, comments, onFormSubmit }) => {
  const [value, setValue] = React.useState('')

  const handleChange = e => {
    setValue(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()
    onFormSubmit(projectId, value)
    setValue('')
  }

  return (
    <>
      <CommentInput
        onClick={onSubmit}
        rows={4}
        commentContent={value}
        onChange={handleChange}
        labelText={'Comment'}
        commentText={value}
      />
      {comments && comments.length ? (
        <CommentList comments={comments} noBorders />
      ) : null}
    </>
  )
}

CommentBox.propTypes = {
  projectId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object),
  onFormSubmit: PropTypes.func
}

export default CommentBox
