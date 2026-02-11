import axios from 'axios'
const BASEURL = '/api/users'

const getAllUsers = async () => {
  const response = await axios.get(BASEURL)
  return response.data
}

export { getAllUsers }