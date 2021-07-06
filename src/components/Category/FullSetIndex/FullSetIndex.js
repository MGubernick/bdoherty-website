import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

import { indexItems } from './../../../api/items'

class SetIndex extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: []
    }
  }

  handleSearchOne = (id, event) => {
    const { history } = this.props

    history.push(`/items/${id}`)
  }

  componentDidMount () {
    const { msgAlert } = this.props

    indexItems()
      .then(res => {
        this.setState({ items: res.data.item })
      })
      .catch(error => {
        msgAlert({
          message: `Couldn't load Full-Sets because: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  render () {
    // let itemsJsx
    // console.log('this is workouts before map: ', this.state.workouts)
    const { items } = this.state

    if (!items) {
      return 'Loading Full-Sets...'
      // itemsJsx = <img style={{ width: '80%' }} src="https://media.giphy.com/media/11T6LuIxeHtJJu/giphy.gif" alt="loading gif" />
    }

    const setItems = items.filter(item => item.category === 'Full-Set')

    const itemsJsx = setItems.map(item => (
      <Card key={item._id}
        onClick={(event) => {
          this.handleSearchOne(item._id, event)
        }}
        border="primary"
        className='index-bg style-card' style={{ alignItems: 'center', borderRadius: '5px', boxShadow: '-1px 3px #919191', display: 'flex', height: '350px', margin: '40px', padding: '8px', marginTop: '10px', width: '330px' }}>
        <Card.Body className="card-b-style">
          <Card.Title className="card-title-font">{item.name}</Card.Title>
          <Card.Img className="card-img-style" variant="top" style={{ height: '170px', margin: '10px 10px 20px 10px', width: '160px' }} src={item.imageURL} />
          {item.purchased === true ? <Card.Title className="mb-2" style={{ color: '#ff0000', fontSize: '15px' }}>SOLD OUT!</Card.Title> : null}
          <Card.Subtitle className="mb-2 text-muted">Measurements: {item.measurements}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted"><strong>${item.price}</strong></Card.Subtitle>
        </Card.Body>
      </Card>
    ))

    return (
      <div style={{ alignContent: 'center', display: 'flex', flexDirection: 'column' }}>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontFamily: 'Satisfy, cursive', fontSize: '60px' }}>Full-Sets!</h2>
          <p><small>(click on an image to see full details)</small></p>
        </div>
        <ul>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', margin: '10px', whiteSpace: 'pre-wrap' }}>
            {itemsJsx.reverse()}
          </div>
        </ul>
      </div>
    )
  }
}

export default withRouter(SetIndex)
