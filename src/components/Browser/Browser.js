import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

import { indexItems } from './../../api/items'

class IndexItems extends Component {
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
      // .then(() => msgAlert({
      //   message: 'Happy Shopping!',
      //   variant: 'success'
      // }))
      .catch(error => {
        msgAlert({
          message: `UhOh..Someting went wrong, couldn't load the page because ${error.message}`
        })
      })
  }

  render () {
    let itemsJsx

    const { items } = this.state

    if (!items) {
      itemsJsx = 'Loading...'
    }

    itemsJsx = items.map(item => (
      <Card key={item._id}
        onClick={(event) => {
          this.handleSearchOne(item._id, event)
        }}
        border="primary"
        className='index-bg style-card' style={{ alignItems: 'center', borderRadius: '5px', display: 'flex', height: '350px', margin: '40px', padding: '8px', marginTop: '10px', width: '330px' }}>
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Img variant="top" style={{ height: '170px', margin: '20px', width: '160px' }} src={item.imageURL} />
          {item.purchased === true ? <Card.Title className="mb-2" style={{ color: '#ff0000', fontSize: '15px' }}>SOLD OUT!</Card.Title> : null}
          <Card.Subtitle className="mb-2 text-muted">Measurements: {item.measurements}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted"><strong>${item.price}</strong></Card.Subtitle>
        </Card.Body>
      </Card>
    ))

    return (
      <div style={{ alignContent: 'center', display: 'flex', flexDirection: 'column' }}>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2>Happy Shopping!</h2>
          <p><small>(click on an item to see full details)</small></p>
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

export default withRouter(IndexItems)