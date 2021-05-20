export const onSaveInfos = (state, payload) => {
  const { activityList, user, userBadges } = payload

  return {
    ...state,
    info: user,
    activities: activityList,
    badges: userBadges
  }
}
