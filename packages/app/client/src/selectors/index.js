import { createSelector } from 'reselect'

export const getToast = state => state.toast
export const showFullPageLoader = state => state.loader.showLoader

// AUTH
export const isAuthenticated = state => state.auth.isAuthenticated
export const getUserId = state => state.auth.user.id
export const getUser = state => state.auth.user

// PROJECTS MAIN
export const getSearchedProjects = state => state.projects.searchedProjects
export const projectsSearchSelectedFilters = state => state.projects.filters
export const getProjectsSearchFilter = (state, filterTitle) =>
  state.projects.filters[filterTitle]
export const getSearchedProjectById = (state, id) =>
  state.projects.searchedProjects.find(pjt => pjt.id === id)

// PROJECT VIEW
export const getCurrentProject = state => state.projects.selectedProject
export const getCurrentProjectId = createSelector(
  getCurrentProject,
  project => project.id
)
export const currentUserIsTheOwner = createSelector(
  getUserId,
  getCurrentProject,
  (userId, project) => project.owner.id === userId
)
export const getHandledUpdates = state => state.projects.handledUpdates
export const getProjectComments = state => state.projects.comments
export const getProjectCommentsLength = state =>
  state.projects.selectedProject &&
  Array.isArray(state.projects.selectedProject.comments)
    ? state.projects.selectedProject.comments.length
    : 0
export const getProjectCommentsPageCount = state => state.projects.commentsPages
export const getCurrentProjectMembers = createSelector(
  getCurrentProject,
  project => project.team
)
export const getCurrentProjectContact = createSelector(
  getCurrentProject,
  project => project.contactPerson
)

// SEARCH
export const searchSort = state => state.search.sort
export const searchCurrentPage = state => state.search.page
export const getSearchText = state => state.search.searchText
export const searchIsLoading = state => state.search.isLoading
export const getSearchContext = state => state.search.context
export const getNumberOfPages = state => state.search.numberOfPages

// USER
export const getSearchedUserProjects = state => state.user.searchedProjects
export const getSearchedUserComments = state => state.user.searchedComments
export const getSearchedUserBookmarks = state => state.user.searchedBookmarks
export const getSearchedUserLikes = state => state.user.likes
export const getSearchedUserLatestProject = state => state.user.latestProject
export const getUserBadges = state => state.auth.user.badges

// PROFILE
export const getProfileBadges = state => state.profile.badges
export const getProfileName = state =>
  state.profile.info && state.profile.info.name
export const getProfileAvatar = state =>
  state.profile.info && state.profile.info.avatar
export const getProfileId = state => state.profile.info && state.profile.info.id
export const getProfileProjecs = state => state.profile.projects
export const getProfileProjectById = (state, id) =>
  state.profile.projects.find(pjt => pjt.id === id)
export const getProfileProjecsPageCounter = state =>
  state.profile.projectsPageCounter
export const getProfileUserInfo = state => state.profile.info
export const getProfileUserActivities = state => state.profile.activities
export const getLoadMoreActivitiesFlag = state => state.profile.loadActivitiesFlag

// REPORTS
export const getSearchedReportedProjects = state =>
  state.reports.searchedProjects
export const getSearchedReportedComments = state =>
  state.reports.searchedComments
export const getSearchedReportedUpdates = state => state.reports.searchedUpdates
