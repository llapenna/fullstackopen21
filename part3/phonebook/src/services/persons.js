import axios from 'axios'

const base = '/api/persons'

const getAll = () => {
  return axios
    .get(base)
    .then(response => response.data)
}

const create = person => {
  return axios
    .post(base, person)
    .then(response => response.data)
}

const update = (id, newPerson) => {
  return axios
    .put(`${base}/${id}`, newPerson)
    .then(response => response.data)
}

const remove = id => {
  return axios
    .delete(`${base}/${id}`)
    .then(response => response.data)
}

const personsService = { getAll, create, update, remove }

export default personsService