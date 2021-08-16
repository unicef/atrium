import SECTIONS_NAME, { SECTIONS_ID } from '../sectionsName'
import debounce from 'lodash/debounce'

export const IDS = {
  [SECTIONS_NAME.PROJECT]: 'projectNav',
  [SECTIONS_NAME.CONTACT_PERSON]: 'contactNav',
  [SECTIONS_NAME.STORY]: 'storyNav',
  [SECTIONS_NAME.TEAM_DETAILS]: 'teamNav',
  [SECTIONS_NAME.LINKS]: 'linksNav',
  [SECTIONS_NAME.DOCUMENTS]: 'documentsNav'
}

const data = [
  {
    sectionId: SECTIONS_ID[SECTIONS_NAME.PROJECT],
    navId: IDS[SECTIONS_NAME.PROJECT]
  },
  {
    sectionId: SECTIONS_ID[SECTIONS_NAME.CONTACT_PERSON],
    navId: IDS[SECTIONS_NAME.CONTACT_PERSON]
  },
  {
    sectionId: SECTIONS_ID[SECTIONS_NAME.STORY],
    navId: IDS[SECTIONS_NAME.STORY]
  },
  {
    sectionId: SECTIONS_ID[SECTIONS_NAME.TEAM_DETAILS],
    navId: IDS[SECTIONS_NAME.TEAM_DETAILS]
  },
  {
    sectionId: SECTIONS_ID[SECTIONS_NAME.LINKS],
    navId: IDS[SECTIONS_NAME.LINKS]
  },
  {
    sectionId: SECTIONS_ID[SECTIONS_NAME.DOCUMENTS],
    navId: IDS[SECTIONS_NAME.DOCUMENTS]
  }
]

const unmark = () => {
  Object.entries(IDS).forEach(([_, id]) => {
    document.getElementById(id).setAttribute("data-marked", "false")
  })
}

const OFFSET_Y = 200
const THROTTLING_TIME = 300

const onScroll = debounce(() => {
  const scrollPosition = window.scrollY
  for(let [index, value] of data.entries()) {
    const position = document.getElementById(value.sectionId).offsetTop - OFFSET_Y
    const nextPosition = data[index + 1] && document.getElementById(data[index + 1].sectionId).offsetTop - OFFSET_Y
    const marked = document.getElementById(value.navId).getAttribute("data-marked") === "true"
    
    if (scrollPosition === 0) {
      unmark()
    }

    if (scrollPosition >= position) {
      if (nextPosition) {
        if (nextPosition > scrollPosition && !marked) {
          unmark()
          document.getElementById(value.navId).setAttribute("data-marked", "true")
          break
        }
      } else {
        unmark()
        document.getElementById(value.navId).setAttribute("data-marked", "true")
        break
      }
    }
  }
}, THROTTLING_TIME)

export default onScroll
