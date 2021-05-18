import { dateFormatter } from '../../ui/utils'

export const handleProjectSaving = ({ project, userId }) => {
  const likeIndex = project.likes.findIndex(like => like.id === userId)
  const userLiked = likeIndex >= 0
  return { ...project, userLiked }
}

export const onAddFilter = (filters, { option, filterName }) => {
  const filterFromState = filters[filterName]
  const filterExists = filterFromState !== undefined && filterFromState !== null
  
  if (filterExists) {
    return { ...filters, [filterName]: [...filterFromState, option] }
  }

  return { ...filters, [filterName]: [option] }
}

export const onRemoveFilter = (filters, { option, filterName }) => {
  const filterFromState = filters[filterName]
  const filterExists = filterFromState !== undefined && filterFromState !== null

  if (filterExists && filterFromState.length === 1) {
    return {...filters, [filterName]: undefined }
  }

  return { ...filters, [filterName]: filterFromState.filter(opt => opt !== option )}
}

export const onSaveProjects = ({ userId, registeredUser, projects }) => {

  if (!Array.isArray(projects)) {
    return []
  }

  if (!registeredUser) {
    return projects.filter(project => project.freeForAll)
  }

  return projects.map(project => handleProjectSaving({ project, userId }))
}

export const onToggleLike = (state, project) => {
  const prevList = state.searchedProjects
  const projectIndex = prevList.findIndex(pjt => project.id === pjt.id)
  const userLiked = prevList[projectIndex].userLiked

  const updatedProject = { ...project, userLiked: !userLiked }
  
  const newList = [...prevList]
  newList[projectIndex] = updatedProject
  const selectedProjectId = state.selectedProject && state.selectedProject.id

  if (selectedProjectId === project.id) {
    return {
      ...state,
      searchedProjects: newList,
      selectedProject: updatedProject
    }
  }

  return {
    ...state,
    searchedProjects: newList
  }
}

/**
 * 
 * @param {*} updates 
 * @returns 
 *  {
 *     year: {
 *        month: [{ year, month, ...updateData }]
 *      }
 *   }
 * 
 */
export const handleUpdates = (updates) => {
  
  return updates.reverse().reduce((acc, update) => {
    const parsedDateArray = dateFormatter({ date: update.date, formatOptions: [{month: 'long'}, {year: 'numeric'}, {month: 'numeric'}] })
    const month = parsedDateArray[0]
    const year = parsedDateArray[1]
    const existingDateYear = acc[year]
    const newMonthItem = {...update, month, year }
    const newData = {...acc}

    if (existingDateYear) {
      const existingDateMonth = existingDateYear[month]

      if (existingDateMonth) {
        newData[year][month] = [...existingDateMonth, newMonthItem]
      } else {
        newData[year][month] = [newMonthItem]
      }
    } else {
      newData[year] = { [month]: [newMonthItem] }
    }

    return newData
  }, {})
}

export const onEditUpdate = ({ updates, year, month, id, text }) => {
  const changedUpdates = { ...updates }
  const targetMonthData = changedUpdates[year][month]

  changedUpdates[year][month] = targetMonthData.map((update) => {
    if (update.id === id) {
      return { ...update, text }
    }

    return update
  })

  return changedUpdates
}
