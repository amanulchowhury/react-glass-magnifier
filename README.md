# react-glass-magnifier

> A React image magnifying glass component. [Example](https://amanulchowhury.github.io/react-glass-magnifier/)

[![NPM](https://img.shields.io/npm/v/react-magnifying-glass.svg)](https://www.npmjs.com/package/react-magnifying-glass) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-glass-magnifier
```

## Usage

```tsx
import * as React from 'react'

import Magnifier from 'react-glass-magnifier'

class Example extends React.Component {
  render () {
    return (
      <div className="image-container">
        <Magnifier
          imageUrl="images/daylight-environment-forest-small.jpg"
          imgAlt="small image"
          zoomFactor={3}
          glassDimension={200}
          largeImageUrl="images/daylight-environment-forest-large.jpg"
          glassBorderColor="red"
          glassBorderWidth={2} />
      </div>
    )
  }
}
```

## License

MIT © [amanulchowhury](https://github.com/amanulchowhury)
