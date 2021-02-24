import axios from 'axios'

/**
 * Call api to get learning resources
 */
export function getLearningResources() {
  return axios.get('learning/')
}
