# react-glass-magnifier

> A React image magnifying glass component. [Example](https://amanulchowhury.github.io/react-magnifying-glass/)

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
    const zoomFactor = 3
    const glassWidth = 150
    const glassHeight = 150
    return (
      <Magnifier
        imageUrl="http://www.google.com/logos/2011/worldsfair11-hp.jpg"
        imgAlt="small image"
        zoomFactor={zoomFactor}
        glassHeight={glassHeight}
        glassWidth={glassWidth}
        largeImageUrl="https://s3.amazonaws.com/images.seroundtable.com/worldsfair11-hr-1304251656.jpg" />
    )
  }
}
```

## License

MIT © [amanulchowhury](https://github.com/amanulchowhury)
