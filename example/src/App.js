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
          imageUrl="http://www.google.com/logos/2011/worldsfair11-hp.jpg"
          imgAlt="small image"
          zoomFactor={this.zoomFactor}
          glassHeight={this.glassHeight}
          glassWidth={this.glassWidth}
          largeImageUrl="https://s3.amazonaws.com/images.seroundtable.com/worldsfair11-hr-1304251656.jpg" />
      </div>
    )
  }
}
