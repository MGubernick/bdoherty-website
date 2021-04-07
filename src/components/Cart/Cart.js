import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { indexItems } from './../../api/items.js'

class Cart extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: [],
      inCart: null
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
        this.setState({ items: res.data.item.filter(item => {
          return (item.inCart === true)
        }) })
      })
      .then(this.setState({ loaded: true }))
      .catch(error => {
        msgAlert({
          message: `Couldn't load the cart because: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  render () {
    let cartJsx
    const { items, loaded } = this.state

    console.log('items:', items)

    const paymentSub = items.map(item => {
      let sub = 0

      sub = Math.abs(sub += item.price)
      return sub
    })

    const paymentTotal = items.map(item => {
      let total = 0
      const tax = 2.00
      total = Math.abs(total += (item.price + tax))
      return total
    })

    if (items.length === 0 && loaded === true) {
      // return 'Loading...'
      cartJsx = (
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '30px' }}>
          <h4>Looks like your cart is empty!!</h4>
        </div>
      )
    } else {
      cartJsx = items.map(item => (
        <Card key={item._id}
          border="primary"
          className='index-bg style-card' style={{ borderRadius: '12px', height: '250px', padding: '8px', width: '800px', marginTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Card.Title style={{ marginLeft: '5px' }}>{item.name}</Card.Title>
            <Button className="close" style={{ fontSize: '17px', height: '10', width: '20px', zIndex: '10000' }} type="button" onClick={(event) => this.removeFromCart(item, event)}>
              X
            </Button>
          </div>
          <Card.Body onClick={(event) => {
            this.handleSearchOne(item._id, event)
          }} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Card.Img variant="top" style={{ height: '150px', margin: '5px 40px 5px 5px', width: '130px' }} src={item.imageURL} />
              <Card.Text style={{ alignSelf: 'flex-end', display: 'felx', fontSize: '20px' }}>{item.measurements}
                <br/>
              Category: {item.category}
              </Card.Text>
            </div>
            <Card.Text style={{ alignSelf: 'center', fontSize: '30px' }}>Price: ${item.price}</Card.Text>
          </Card.Body>
        </Card>
      ))
    }

    return (
      <div style={{ border: '1px solid black', display: 'flex', flexDirection: 'column', marginBottom: '50px', marginTop: '50px', paddingTop: '5px' }}>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2><strong>Order Summery</strong></h2>
        </div>
        <ul style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'start', margin: '5px', whiteSpace: 'pre-wrap' }}>
            {cartJsx}
          </div>
        </ul>
        <div>
          <div style={{ alignItems: 'start', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px' }}>
            <h2>Subtotal:</h2>
            <h2>${paymentSub}</h2>
          </div>
          <div style={{ alignItems: 'start', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px' }}>
            <h1>Total:</h1>
            <h1>${paymentTotal}</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Cart)
