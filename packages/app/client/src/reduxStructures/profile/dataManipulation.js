export const onSaveInfos = (state, payload) => {
  const { activityList, user, userBadges } = payload

  return {
    ...state,
    info: user,
    activities: activityList,
    badges: userBadges
  }
}
// TODO: MAKE THE FUNCTIONS BELOW AN UTILITY BECAUSE THEIR LOGIC HAVE BEEN USED ON PROJECT REDUCER AS WELL
export const onToggleLike = (state, project) => {
  const prevList = state.projects
  const projectIndex = prevList.findIndex(pjt => project.id === pjt.id)
  const userLiked = prevList[projectIndex].userLiked

  const updatedProject = { ...project, userLiked: !userLiked }
  
  const newList = [...prevList]
  newList[projectIndex] = updatedProject

  return {
    ...state,
    projects: newList
  }
}

const handleProjectSaving = ({ project, profileId }) => {
  const likeIndex = project.likes.findIndex(like => like.id === profileId)
  const userLiked = likeIndex >= 0
  return { ...project, userLiked }
}

export const onSaveProjects = ({ profileId, registeredUser, projects }) => {

  if (!Array.isArray(projects)) {
    return []
  }

  if (!registeredUser) {
    return projects.filter(project => project.freeForAll)
  }

  return projects.map(project => handleProjectSaving({ project, profileId }))
}

// ---------------- END OF TODO MENTION ------------------>