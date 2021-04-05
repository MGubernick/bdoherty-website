import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import { showItem, deleteItem, updateCartItem } from '../../api/items'

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

  addToCart = () => {
    const { item } = this.state
    // const { user, match } = this.props
    item.inCart = true

    updateCartItem(item._id, item)
      .then(this.setState({ inCart: true }))

    // showItem(match.params.id, user)
    //   .then(res => {
    //     this.setState({ item: res.data.item })
    //     return res
    //   })
      .then(console.log(item))
  }

  removeFromCart = () => {
    const { item } = this.state
    // const { user, match } = this.props
    item.inCart = false

    updateCartItem(item._id, item)
      .then(this.setState({ inCart: false }))

    // showItem(match.params.id, user)
    //   .then(res => {
    //     this.setState({ item: res.data.item })
    //     return res
    //   })
      .then(console.log(item))
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
      .then(() => history.push('/'))
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
      // .then(res => msgAlert({
      //   message: `Here is ${res.data.item.name}!`,
      //   variant: 'success'
      // }))
      .catch(error => msgAlert({
        message: `Uh Oh..that didn't work because..${error.message}`,
        variant: 'danger'
      }))
  }

  render () {
    const { item, clickUpdateItem } = this.state
    const { user } = this.props
    let admin

    // console.log('this is item', item)

    if (!item) {
      return 'Loading...'
    }

    if (clickUpdateItem) {
      return (
        <Redirect to={`/update-item/${item._id}`} />
      )
    }

    if (user) {
      admin = user.email
    }

    let itemDisplay

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
                  {item.purchased === true ? <Card.Subtitle className="mb-2">SOLD!</Card.Subtitle> : null}
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
            {item.inCart === false ? <Button className="close" style={{ alignContent: 'center', alignSelf: 'flex-end', border: '1px solid black', background: '#28d3ee', color: '#ee4328', display: 'flex', fontSize: '25px', justifyContent: 'center', margin: '0px 15px 15px 15px', padding: '5px', zIndex: '10000' }} type="button" onClick={this.addToCart}>
            Add To Cart
            </Button> : <Button className="close" style={{ alignContent: 'center', alignSelf: 'flex-end', border: '1px solid black', background: '#28d3ee', color: '#ee4328', display: 'flex', fontSize: '25px', justifyContent: 'center', margin: '0px 15px 15px 15px', padding: '5px', zIndex: '10000' }} type="button" onClick={this.removeFromCart}>
            Remove From Cart
            </Button>}
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
                  {item.purchased === true ? <Card.Subtitle className="mb-2">SOLD!</Card.Subtitle> : null}
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
            {item.inCart === false ? <Button className="close" style={{ alignContent: 'center', alignSelf: 'flex-end', border: '1px solid black', background: '#28d3ee', color: '#ee4328', display: 'flex', fontSize: '25px', justifyContent: 'center', margin: '0px 15px 15px 15px', padding: '5px', zIndex: '10000' }} type="button" onClick={this.addToCart}>
            Add To Cart
            </Button> : <Button className="close" style={{ alignContent: 'center', alignSelf: 'flex-end', border: '1px solid black', background: '#28d3ee', color: '#ee4328', display: 'flex', fontSize: '25px', justifyContent: 'center', margin: '0px 15px 15px 15px', padding: '5px', zIndex: '10000' }} type="button" onClick={this.removeFromCart}>
            Remove From Cart
            </Button>}
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
