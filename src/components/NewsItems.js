import React, { Component } from 'react'

export class NewsItems extends Component {

  render() {
    let { title, description, imageURL, newsURL , author , date } = this.props
    return (
      <>
        <div className="card my-3" /*style={{ width: "18rem" }}*/>
          <img src={!imageURL ? "https://www.coindesk.com/resizer/eoXRG91wfa6JUJVSt9QI1cDGQLE=/1200x628/center/middle/cloudfront-us-east-1.images.arcpublishing.com/coindesk/F6IP7SYDDNH2NO3T6RCTIA3XVM.png" : imageURL} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">by {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsURL} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </>
    )
  }
}

export default NewsItems
