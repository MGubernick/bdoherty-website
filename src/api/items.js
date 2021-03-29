import apiUrl from '../apiConfig'
import axios from 'axios'

// Create a new item
export const addItem = (item, user) => {
  return axios({
    url: apiUrl + '/items',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { item: item }
  })
}

// Index ALL items
export const indexItems = () => {
  return axios({
    url: apiUrl + '/items/all',
    method: 'GET'
  })
}

// Show One Item
export const showItem = (id, user) => {
  return axios({
    url: apiUrl + '/items/' + id,
    method: 'GET'
  })
}

// Update an Item
export const updateItem = (id, item, user) => {
  return axios({
    url: apiUrl + '/items/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { item: item }
  })
}

// Delete An Item
export const deleteItem = (id, user) => {
  return axios({
    url: apiUrl + '/items/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
