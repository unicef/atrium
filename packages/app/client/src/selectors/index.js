export const getToast = state => state.toast
export const showFullPageLoader = state => state.loader.showLoader

// AUTH
export const isAuthenticated = state => state.auth.isAuthenticated
export const getUserId = state => state.auth.user.id

// PROJECTS MAIN
export const getSearchedProjects = state => state.projectsMain.main.projects
export const projectsSearchSelectedFilters = state => state.projectsMain.main.filters
export const getProjectsSearchFilter = (state, filterTitle) => state.projectsMain.main.filters[filterTitle]

// SEARCH
export const searchSort = state => state.search.sort
export const searchCurrentPage = state => state.search.page
export const getSearchText = state => state.search.searchText
export const searchIsLoading = state => state.search.isLoading
