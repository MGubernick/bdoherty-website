import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AddForm from '../AddForm/AddForm.js'

import { addItem } from '../../api/items'

class AddItem extends Component {
  constructor (props) {
    super(props)

    // const { user } = this.props
    this.state = {
      item: {
        name: '',
        purchased: false,
        price: Number,
        measurements: '',
        category: '',
        description: '',
        imageURL: ''
      },
      createdId: null
    }
  }

  handleChange = event => {
    event.persist()

    this.setState((state) => {
      return {
        item: { ...state.item, [event.target.name]: event.target.value }
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { user, msgAlert } = this.props
    const { item } = this.state

    addItem(item, user)
      .then(res => {
        this.setState({ createdId: res.data.item._id })
        return res
      })
      .then(res => msgAlert({
        message: `Successfully Created ${res.data.item.name}!`,
        variant: 'success'
      }))
      .catch(error => msgAlert({
        message: `Uh Oh, That didn't work, because error: ${error.message}`,
        variant: 'danger'
      }))
  }

  render () {
    const { item, createdId } = this.state

    if (createdId) {
      return <Redirect to={`/items/${createdId}`} />
    }

    return (
      <div>
        <AddForm
          item={item}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default AddItem
