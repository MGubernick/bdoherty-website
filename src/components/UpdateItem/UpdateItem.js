import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import UpdateForm from '../UpdateForm/UpdateForm'

import { updateItem, showItem } from '../../api/items'

class UpdateItem extends Component {
  constructor (props) {
    super(props)

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
      createId: null,
      updated: false,
      showUpdateModal: true
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

  componentDidMount () {
    const { user, match, msgAlert } = this.props

    const id = match.params.id
    showItem(id, user)
      .then(res => this.setState({ item: res.data.item }))
      .catch(error => {
        msgAlert({
          message: `Couldn't Show Because: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { user, match, msgAlert } = this.props
    const { item } = this.state

    const id = match.params.id

    updateItem(id, item, user)
      .then(res => {
        this.setState({ updated: true })
        return res
      })
      .catch(error => msgAlert({
        message: `Failed to update due to this error: ${error.message}`,
        variant: 'danger'
      }))
  }

  render () {
    const { item, updated } = this.state

    if (updated) {
      return <Redirect to={`/items/${this.props.match.params.id}`} />
    }

    return (
      <div>
        <UpdateForm
          item={item}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default withRouter(UpdateItem)
