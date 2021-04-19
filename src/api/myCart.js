import apiUrl from '../apiConfig'
import axios from 'axios'

export const addToMyCart = async (item, user) => {
  return axios({
    url: apiUrl + '/toMyCart',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      cartItem: {
        itemId: item._id,
        shopper: user._id
      }
    }
  })
}

export const removeFromMyCart = async (cartItemId, user) => {
  return axios({
    url: apiUrl + '/fromMyCart/' + cartItemId,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
