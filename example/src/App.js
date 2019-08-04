import React, { Component } from 'react'

import Magnifier from 'react-magnifying-glass'

export default class App extends Component {
  zoomFactor = 3;
  glassWidth = 150;
  glassHeight = 150;
  render () {
    return (
      <div className="image-container">
        <Magnifier
          imageUrl="images/daylight-environment-forest-small.jpg"
          imgAlt="small image"
          zoomFactor={this.zoomFactor}
          glassHeight={this.glassHeight}
          glassWidth={this.glassWidth}
          largeImageUrl="images/daylight-environment-forest-large.jpg" />
      </div>
    )
  }
}
