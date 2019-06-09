import axios from 'axios'

const URL = 'http://localhost:8888'

export function getSources() {
  return axios.get(`${URL}/source`)
}

export function getSourceInfo(id: string) {
  return axios.get(`${URL}/source/${id}`)
}