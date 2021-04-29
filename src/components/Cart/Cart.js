import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

// checkout imports
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// import { indexItems } from '../../api/items.js'
import { indexItems, updateCartItem } from '../../api/items.js'
import { removeFromMyCart } from '../../api/myCart.js'

// toast.configure()

class Cart extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: [],
      inCart: null,
      totalCartPrice: null
    }
  }

  handleSearchOne = (id, event) => {
    const { history } = this.props

    history.push(`/items/${id}`)
  }

  // With multiple items in cart, remove does not work
  async removeFromCart (event, id, item) {
    const { user, msgAlert, setUser } = this.props

    const thisItemInCart = user.myCart.filter(cartItem => {
      if (cartItem.itemId === id) {
        return cartItem._id
      }
    })
    // console.log('this is thisItemInCart:', thisItemInCart)

    // ensure the item exists for filter
    function itemExists (idOfItem) {
      return user.myCart.some((match) => {
        return match.itemId === idOfItem
      })
    }

    // change the status of inCart to false before sending the data to the API
    item.inCart = false

    try {
      const gone = await removeFromMyCart(thisItemInCart[0]._id, user)
      await setUser(gone.data.user)
      await updateCartItem(item._id, item)
      await this.setState({ inCart: false })
      const res = await indexItems()
      await this.setState({ items: res.data.item.filter(item => {
        return (item.inCart === true && itemExists(item._id) === true)
      }) })
      this.setState({ loaded: true })
      this.setState({ numsToAdd: [] })
    } catch (error) {
      msgAlert({
        message: `Couldn't load the cart because: ${error.message}`,
        variant: 'danger'
      })
    }
  }

  // fix the stripe API call

  async handleStripeToken (token, price) {
    // console.log('this is token', token)
    // console.log('this is price', price)
    const { msgAlert } = this.props
    const { items } = this.state

    // console.log('this is amont before axios', amount)
    const response = await axios.post(apiUrl + '/checkout', {
      token,
      price
    })
    const { status } = response.data
    if (status === 'success') {
      msgAlert({
        message: 'Success! Check your email for details!',
        variant: 'success'
      })
      items.forEach(item => {
        item.purchased = true
        item.inCart = false
        this.removeFromCart(event, item._id, item)
      })
    } else {
      msgAlert({
        message: 'Oops, that did not work!',
        variant: 'danger'
      })
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    console.log('this is user:', user)
    console.log('this is myCart:', user.myCart)
    function itemExists (itemId) {
      return user.myCart.some(function (match) {
        return match.itemId === itemId
      })
    }

    indexItems()
      .then(res => {
        this.setState({ items: res.data.item.filter(item => {
          return itemExists(item._id) === true
        })
        })
      })
      .then(this.setState({ loaded: true }))
      .then(this.setState({ numsToAdd: [] }))
      .catch(error => {
        msgAlert({
          message: `Couldn't load the cart because: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  render () {
    let cartJsx
    let subtotal
    let finalSum
    let finalTotal
    let processing = 500
    const showProcessing = '5.00'
    const { items, loaded, numsToAdd } = this.state

    // console.log('items:', items)

    const formatDollarsToCents = function (value) {
      value = (value + '').replace(/[^\d.-]/g, '')
      if (value && value.includes('.')) {
        value = value.substring(0, value.indexOf('.') + 3)
      }

      return value ? Math.round(parseFloat(value) * 100) : 0
    }

    items.map(item => {
      let sub = 0

      const newSub = sub += formatDollarsToCents(item.price)
      numsToAdd.push(newSub)
    })

    if (numsToAdd) {
      const sum = numsToAdd.reduce(function (a, b) {
        return a + b
      }, 0)

      const split = sum.toString().split('').reverse()

      split.splice(2, 0, '.')

      subtotal = split.reverse().join('')
      // console.log('subtotal: ', subtotal)

      finalSum = processing += formatDollarsToCents(subtotal)

      const finalSplit = finalSum.toString().split('').reverse()
      finalSplit.splice(2, 0, '.')

      finalTotal = finalSplit.reverse().join('')
    } else {
      return (
        <p>Loading...</p>
      )
    }

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
            <Button className="close" style={{ fontSize: '17px', height: '10', width: '20px', zIndex: '10000' }} type="button" onClick={(event) => this.removeFromCart(event, item._id, item)}>
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
      <div style={{ border: '1px solid black', display: 'flex', flexDirection: 'column', marginBottom: '200px', marginTop: '50px', paddingTop: '5px' }}>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontFamily: 'Satisfy, cursive', fontSize: '60px' }}><strong>Order Summery</strong></h2>
        </div>
        <ul style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'start', margin: '5px', whiteSpace: 'pre-wrap' }}>
            {cartJsx}
          </div>
        </ul>
        <div>
          <div style={{ alignItems: 'start', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px' }}>
            <h2 className='text-muted'>Subtotal:</h2>
            <h2 className='text-muted'>${items.length === 0 ? 0 : subtotal}</h2>
          </div>
          <div style={{ alignItems: 'start', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px' }}>
            <h5 className='text-muted'>Processing Fee:</h5>
            <h5 className='text-muted'>+ ${items.length === 0 ? 0 : showProcessing}</h5>
          </div>
          <div style={{ alignItems: 'start', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px' }}>
            <h1>Total:</h1>
            <h1>${items.length === 0 ? 0 : finalTotal}</h1>
          </div>
        </div>
        {items.length === 0 ? null : <StripeCheckout
          stripeKey='pk_test_51IcvQ1BhI8SMmaQRwum7L4zzxN76xhZYzxk44FjPAHR7r16Nuz8uzt3gjols2O2Kpt2aokUTwZxEwufaNi6p0HY600EYJ2MM15'
          token={(event) => this.handleStripeToken(event, finalSum)}
          amount={finalSum}
          label='Checkout Now'
          billingAddress
          shippingAddress
          name='Checkout!'
        />}
      </div>
    )
  }
}

export default withRouter(Cart)
