export const handleItemSaving = ({ item, userId }) => {
  const likeIndex = item.likes.findIndex(like => like.id === userId)
  const userLiked = likeIndex >= 0
  return { ...item, userLiked }
}

export const onSaveUserProjects = ({ userId, registeredUser, projects }) => {
  if (!Array.isArray(projects)) {
    return []
  }

  if (!registeredUser) {
    return projects.filter(project => project.freeForAll)
  }
  return projects.map(item => handleItemSaving({ item, userId }))
}

export const onSaveUserComments = ({ userId, registeredUser, comments }) => {
  if (!Array.isArray(comments) || !registeredUser) {
    return []
  }
  return comments.map(item => handleItemSaving({ item, userId }))
}
