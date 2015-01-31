# css-mat4

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Build a 4x4 matrix from 3D rotation, translation, scale and 2D skew according to the [CSS3 transforms spec](http://www.w3.org/TR/css3-transforms). 

```js
var compose = require('css-mat4')
var matrix = compose([], {
    translate: [25, 15, 25],
    rotate: [0, Math.PI/2, -Math.PI],
    scale: [0.25, 0.4, 1.0],
    skewX: Math.PI/2,
    skewY: Math.PI/2
})

//now you can do something with the 16-float matrix array...
```

Components default to zero (or one in the case of `scale`) to allow for 2D vectors:

```js
compose(out, {
    translate: [50, 15],
    scale: [0.25, 0.4]
})
```

## Usage

[![NPM](https://nodei.co/npm/css-mat4.png)](https://www.npmjs.com/package/css-mat4)

#### `matrix = compose(out[, opt])`

Composes a matrix from the given components, storing the result in `out` and returning it. If `opt` is not specified, an identity matrix is returned.

The options:

- `translate` an array of `[x, y]` or `[x, y, z]` in pixels
- `rotate` an array of `[x, y, z]` in radians
- `scale` an array of `[x, y]` or `[x, y, z]` (z component defaults to 1)
- `quaternion` can be specified if `rotate` is undefined; it's an array of `[x, y, z, w]` components
- `skew` an array of `[x, y]` in radians, akin to the CSS skew(x,y) operation, which applies the skew together
- `skewX`, `skewY` numbers in radians, allowing the skews to be applied independently

The order of operations: 

Builds a translation matrix, then applies the quaternion rotation. The matrix is then multiplied a 2D skew(x,y) matrix, and then multiplied by the independent X and Y skew matrices. Finally multiplied by scale to get the resulting recomposed matrix.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/css-mat4/blob/master/LICENSE.md) for details.
