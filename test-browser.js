var test = require('tape')
var prefix = require('prefix-style')
var compose = require('./')
var stringify = require('mat4-css-stringify')
var parse = require('mat4-css-parse')
var Fuzz = require('test-fuzzy-array')

test('testing browser rotation', function(t) {
    var almost = Fuzz(t, 0.0001)
    var prefixed = prefix('transform')
    var div = document.createElement('div')
    document.body.appendChild(div)

    var matrix = []
    var style = stringify(compose(matrix, {
        rotate: [1.45, 0.62, 0.2],
        translate: [5, 10]
    }))
    div.style[prefixed] = style
    var parsed = parse(get())
    almost(matrix, parsed, 'computed style matches input')

    div.style[prefixed] = 'none'
    div.style[prefixed] = 'translateX(5px) translateY(10px) rotateX(1.45rad) rotateY(0.62rad) rotateZ(0.2rad)'
    parsed = parse(get())
    almost(matrix, parsed, 'almost equal arrays')

    function get() {
        return window.getComputedStyle(div, null)[prefixed]
    }

    document.body.removeChild(div)
    t.end()
})

