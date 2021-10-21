// core
import axios from 'axios'

const url = 'https://restcountries.com/v3.1/name/'
const params = 'fullText=true'

const get = async name => {
  const res = await axios.get(`${url}/${name}?${params}`)

  return res.data[0]
}

const service = {
  get,
}

export default service