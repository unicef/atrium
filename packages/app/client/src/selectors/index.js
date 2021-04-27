import { createSelector } from 'reselect'

export const getToast = state => state.toast
export const showFullPageLoader = state => state.loader.showLoader

// AUTH
export const isAuthenticated = state => state.auth.isAuthenticated
export const getUserId = state => state.auth.user.id

// PROJECTS MAIN
export const getSearchedProjects = state => state.projects.searchedProjects
export const projectsSearchSelectedFilters = state => state.projects.filters
export const getProjectsSearchFilter = (state, filterTitle) => state.projects.filters[filterTitle]
export const getSearchedProjectById = (state, id) => state.projects.searchedProjects.find(pjt => pjt.id === id)

// PROJECT VIEW
export const getCurrentProject = state => state.projects.selectedProject
export const currentUserIsTheOwner = createSelector(
  getUserId,
  getCurrentProject,
  (userId, project) => project.owner.id === userId
)
export const getHandledUpdates = state => state.projects.handledUpdates

// SEARCH
export const searchSort = state => state.search.sort
export const searchCurrentPage = state => state.search.page
export const getSearchText = state => state.search.searchText
export const searchIsLoading = state => state.search.isLoading
export const getSearchContext = state => state.search.context
