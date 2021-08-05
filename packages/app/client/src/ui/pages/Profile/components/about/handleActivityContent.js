import { ACTIVITY_ENUM } from '../../../../../unin-constants'
import { badgesData } from '../../../../utils'

const handleActivityContent = (type, data) => {

  switch(type) {
    case ACTIVITY_ENUM.JOIN_ATRIUM:
      return {
        text: 'joined the Atrium',
        dataKey: null
      }
    case ACTIVITY_ENUM.CREATE_PROJECT:
      return {
        text: 'created project',
        name: data.project && data.project.name,
        content: data.project && data.project.details,
        path: data.project && `/projects/view/${data.project.id}/about`
      }
    case ACTIVITY_ENUM.LIKE_PROJECT:
      return {
        text: 'liked',
        name: data.project && data.project.name,
        content: null,
        path: data.project && `/projects/view/${data.project.id}/about`
      }
    case ACTIVITY_ENUM.COMMENT_PROJECT:
      return {
        text: 'commented on',
        name: data.project && data.project.name,
        content: data.project && data.project.details,
        path: data.project && `/projects/view/${data.project.id}/about`
      }
    case ACTIVITY_ENUM.CREATE_POLL:
      return {
        text: 'created'
      }
    case ACTIVITY_ENUM.ANSWER_POLL:
      return {
        text: 'answered'
      }
    case ACTIVITY_ENUM.UPLOAD_LEARNING_RESOURCE:
      return {
        text: 'uploaded'
      }
    case ACTIVITY_ENUM.LIKE_LEARNING_RESOURCE:
      return {
        text: 'uploaded'
      }
    case ACTIVITY_ENUM.COMMENT_LEARNING_RESOURCE:
      return {
        text: 'commented on'
      }
    case ACTIVITY_ENUM.ISSUE_BADGE:
      return {
        text: 'earned',
        name: `Badge ${data.badgeIssued}`
      }
    case ACTIVITY_ENUM.CREATE_DISCUSSION:
      return {
        text: 'created'
      }
    case ACTIVITY_ENUM.PARTICIPATE_DISCUSSION:
      return {
        text: 'commented on'
      }
    case ACTIVITY_ENUM.LIKE_DISCUSSION:
      return {
        text: 'liked'
      }
    default:
      return {}
  }
}

export default handleActivityContent
