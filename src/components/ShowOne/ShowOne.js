import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import { showItem, deleteItem, updateCartItem } from '../../api/items'
import { addToMyCart, removeFromMyCart } from '../../api/myCart'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

class OneItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      item: null,
      inCart: false,
      exists: true,
      deleted: false,
      clickUpdateItem: false
    }
  }

  async addToCart (event, item) {
    // const { item } = this.state
    const { user, setUser } = this.props
    // console.log('this is user: ', user)
    // console.log('this is item: ', item)

    item.inCart = true
    try {
      await updateCartItem(item._id, item)
      await this.setState({ inCart: true })
      // await addToMyCart(item, user)
      const res = await addToMyCart(item, user)
      // res.data.user.myCart[0]._id = res.data.user.myCart[0].itemId
      await setUser(res.data.user)
    } catch (error) {
      console.log('this is why it failed: ', error.message)
    }
  }

  async removeFromCart (event, id, item) {
    const { user, msgAlert, setUser } = this.props
    const thisItemInCart = user.myCart.map(cartItem => {
      if (cartItem.itemId === item._id) {
        return cartItem._id
      }
    })
    // console.log('this is thisItemInCart:', thisItemInCart)

    item.inCart = false
    try {
      await updateCartItem(item._id, item)
      await this.setState({ inCart: false })
      // include remove from the user's myCart as well
      const gone = await removeFromMyCart(thisItemInCart, user)
      await setUser(gone.data.user)
    } catch (error) {
      msgAlert({
        message: `Couldn't load the cart because: ${error.message}`,
        variant: 'danger'
      })
    }
  }

  handleChange = event => {
    event.persist()
    this.setState((state) => {
      return {
        content: { ...state.content, [event.target.name]: event.target.value }
      }
    })
  }

  updateItemClicked = event => {
    this.setState({ clickUpdateItem: true })
  }

  onDeleteItem = () => {
    const { user, match, history, msgAlert } = this.props
    deleteItem(match.params.id, user)
      .then(this.setState({ exists: false }))
      // .then(() => msgAlert({
      //   message: 'Deleted the item!',
      //   variant: 'success'
      // }))
      .then(() => history.push('/shop'))
      .catch(error => {
        msgAlert({
          message: `That didn't work...because: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props

    showItem(match.params.id, user)
      .then(res => {
        this.setState({ item: res.data.item })
        return res
      })
      .then(res => {
        this.setState({ inCart: res.data.item.inCart })
      })
      .catch(error => msgAlert({
        message: `Uh Oh..that didn't work because..${error.message}`,
        variant: 'danger'
      }))
  }

  render () {
    const { item, clickUpdateItem } = this.state
    const { user } = this.props
    let admin

    function itemExists (idOfItem) {
      return user.myCart.some(match => {
        return match.itemId === idOfItem
      })
    }

    // console.log('this is item', item)

    if (!item) {
      return 'Loading...'
    }

    if (clickUpdateItem) {
      return (
        <Redirect to={`/update-item/${item._id}`} />
      )
    }

    let itemDisplay

    if (user) {
      admin = user.email
      if (admin !== 'bdoherty@bdoh.com') {
        itemDisplay = (
          <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
            <Card key={item._id}
              className="index-bg"
              style={{ border: '1px solid', borderRadius: '12px', boxShadow: ' -.3px .5px 0px .5px grey', display: 'flex', marginLeft: '5px', marginRight: '5px', marginBottom: '20px', marginTop: '20px', adding: '10px', width: '600px' }} >
              <Card.Body className="card-body" style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', overflow: 'auto' }}>
                <div>
                  <div style={{ width: '200px' }}>
                    <Card.Title style={{ fontSize: '40px' }}>{item.name}</Card.Title>
                    <Card.Img variant="top" style={{ alignContent: 'center', display: 'flex', justifyContent: 'center', height: '400px', margin: '20px', width: '370px' }} src={item.imageURL} />
                    {item.purchased === true ? <Card.Title className="mb-2" style={{ color: '#ff0000', fontSize: '20px' }}>SOLD OUT!</Card.Title> : null}
                    <Card.Subtitle style={{ fontSize: '15px', margin: '13px 0px 13px 0px' }}>Measurements: {item.measurements}</Card.Subtitle>
                    <Card.Text style={{ fontSize: '15px' }}><strong>${item.price}</strong></Card.Text>
                  </div>
                  <div style={{ border: '1px solid', borderRadius: '9px', margin: '15px', padding: '20px', width: '475px' }}>
                    <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
                      {item.description}
                    </Card.Text>
                  </div>
                </div>
              </Card.Body>
              {item.purchased === true ? null : <div>
                {itemExists(item._id) === false ? <Button className="close" style={{ alignContent: 'center', alignSelf: 'flex-end', border: '1px solid black', background: '#28d3ee', color: '#ee4328', display: 'flex', fontSize: '25px', justifyContent: 'center', margin: '0px 15px 15px 15px', padding: '5px', zIndex: '10000' }} type="button" onClick={(event) => this.addToCart(event, item)}>
                Add To Cart
                </Button> : <Button className="close" style={{ alignContent: 'center', alignSelf: 'flex-end', border: '1px solid black', background: '#28d3ee', color: '#ee4328', display: 'flex', fontSize: '25px', justifyContent: 'center', margin: '0px 15px 15px 15px', padding: '5px', zIndex: '10000' }} type="button" onClick={(event) => this.removeFromCart(event, item._id, item)}>
                Remove From Cart
                </Button>}
              </div>}
            </Card>
          </div>
        )
      } else {
        itemDisplay = (
          <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
            <Card key={item._id}
              className="index-bg"
              style={{ border: '1px solid', borderRadius: '12px', boxShadow: ' -.3px .5px 0px .5px grey', display: 'flex', marginLeft: '5px', marginRight: '5px', marginBottom: '20px', marginTop: '20px', padding: '10px', width: '600px' }} >
              <Card.Body className="card-body" style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', overflow: 'auto' }}>
                <div>
                  <div style={{ width: '200px' }}>
                    <Card.Title style={{ fontSize: '40px' }}>{item.name}</Card.Title>
                    <Button onClick={this.updateItemClicked} >Update</Button>
                    <Button style={{ marginLeft: '10px' }} onClick={this.onDeleteItem} variant="secondary">Delete</Button>
                    <Card.Img variant="top" style={{ alignContent: 'center', display: 'flex', justifyContent: 'center', height: '400px', margin: '20px', width: '370px' }} src={item.imageURL} />
                    {item.purchased === true ? <Card.Title className="mb-2" style={{ color: '#ff0000', fontSize: '20px' }}>SOLD OUT!</Card.Title> : null}
                    <Card.Subtitle style={{ fontSize: '15px', margin: '13px 0px 13px 0px' }}>Measurements: {item.measurements}</Card.Subtitle>
                    <Card.Text style={{ fontSize: '15px' }}><strong>${item.price}</strong></Card.Text>
                  </div>
                  <div style={{ border: '1px solid', borderRadius: '9px', margin: '15px', padding: '20px', width: '475px' }}>
                    <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
                      {item.description}
                    </Card.Text>
                  </div>
                </div>
              </Card.Body>
              {item.purchased === true ? null : <div>
                {itemExists(item._id) === false ? <Button className="close" style={{ alignContent: 'center', alignSelf: 'flex-end', border: '1px solid black', background: '#28d3ee', color: '#ee4328', display: 'flex', fontSize: '25px', justifyContent: 'center', margin: '0px 15px 15px 15px', padding: '5px', zIndex: '10000' }} type="button" onClick={(event) => this.addToCart(event, item)}>
                Add To Cart
                </Button> : <Button className="close" style={{ alignContent: 'center', alignSelf: 'flex-end', border: '1px solid black', background: '#28d3ee', color: '#ee4328', display: 'flex', fontSize: '25px', justifyContent: 'center', margin: '0px 15px 15px 15px', padding: '5px', zIndex: '10000' }} type="button" onClick={(event) => this.removeFromCart(event, item._id, item)}>
                Remove From Cart
                </Button>}
              </div>}
            </Card>
          </div>
        )
      }
    } else {
      itemDisplay = (
        <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
          <Card key={item._id}
            className="index-bg"
            style={{ border: '1px solid', borderRadius: '12px', boxShadow: ' -.3px .5px 0px .5px grey', display: 'flex', marginLeft: '5px', marginRight: '5px', marginBottom: '20px', marginTop: '20px', padding: '10px', width: '600px' }} >
            <Card.Body className="card-body" style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', overflow: 'auto' }}>
              <div>
                <div style={{ width: '200px' }}>
                  <Card.Title style={{ fontSize: '40px' }}>{item.name}</Card.Title>
                  <Card.Subtitle style={{ color: '#ca2323', fontSize: '12px', width: '400px' }}>(Sign Up/Sign In to add items to your cart!)</Card.Subtitle>
                  <Card.Img variant="top" style={{ alignContent: 'center', display: 'flex', justifyContent: 'center', height: '400px', margin: '20px', width: '370px' }} src={item.imageURL} />
                  {item.purchased === true ? <Card.Title className="mb-2" style={{ color: '#ff0000', fontSize: '20px' }}>SOLD OUT!</Card.Title> : null}
                  <Card.Subtitle style={{ fontSize: '15px', margin: '13px 0px 13px 0px' }}>Measurements: {item.measurements}</Card.Subtitle>
                  <Card.Text style={{ fontSize: '15px' }}><strong>${item.price}</strong></Card.Text>
                </div>
                <div style={{ border: '1px solid', borderRadius: '9px', margin: '15px', padding: '20px', width: '475px' }}>
                  <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
                    {item.description}
                  </Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      )
    }

    return (
      <div>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        </div>
        <div>
          {itemDisplay}
        </div>
      </div>
    )
  }
}

export default withRouter(OneItem)
