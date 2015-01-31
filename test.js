var make = require('./')
var test = require('tape')
var mat4 = require('gl-mat4')
var quat = require('gl-matrix').quat
var Fuzz = require('test-fuzzy-array')

test('testing skew', function(t) {
    var almost = Fuzz(t)

    var matrix = mat4.identity([])

    make(matrix, {
        skew: [20*Math.PI/180, 30*Math.PI/180]
    })
    almost(matrix, 
        [ 1, 0.577350269189626, 0, 0, 0.363970234266202, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
        'a combined skew(x,y) operation')

    make(matrix, {
        skew: [20*Math.PI/180]
    })
    var skewX = mat4.copy([], matrix)

    almost(matrix, 
        [ 1, 0, 0, 0, 0.363970234266202, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
        'a skew(x) operation')

    make(matrix, {
        skewX: 20*Math.PI/180
    })
    almost(matrix, 
        skewX,
        'a skewX(x) operation')

    make(matrix, {
        skewY: 30*Math.PI/180
    })
    almost(matrix, 
        [ 1, 0.577350269189626, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
        'a skewY(x) operation')

    make(matrix, {
        skew: [20*Math.PI/180, 30*Math.PI/180],
        skewX: 20*Math.PI/180,
        skewY: 30*Math.PI/180
    })
    almost(matrix, 
        [ 1.42027662546121, 1.27602394980132, 0, 0, 0.727940468532405, 1.2101383127306, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
        'should behave like css transform, combining skews')

    t.end()
})

test('makes a mat4 from translation, rotation, etc', function(t) {
    var matrix = mat4.identity([])

    make(matrix, {
        translate: [15, 25]
    })

    t.deepEquals(matrix, 
        [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 15, 25, 0, 1 ],
        'makes 2D translation')

    make(matrix)
    t.deepEquals(matrix, 
        [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
        'makes identity')

    make(matrix, {})
    t.deepEquals(matrix, 
        [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
        'makes identity')
    
    make(matrix, {
        translate: [-50, 25, 75],
    })
    t.deepEquals(matrix, 
        [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50, 25, 75, 1 ],
        'makes 3D translation')

    make(matrix, {
        scale: [-1, 0.5, 0.25],
        quaternion: [0, 1, 0.5, 1]
    })
    var expected = mat4.identity([])
    mat4.fromQuat(expected, [0, 1, 0.5, 1])
    mat4.scale(expected, expected, [-1, 0.5, 0.25])

    t.deepEquals(matrix, 
        expected,
        'makes 3D scale and quaternion')

    mat4.identity(expected)
    var rotation = quat.identity([])
    quat.rotateX(rotation,rotation, -Math.PI/4)
    quat.rotateY(rotation,rotation, Math.PI/8)
    quat.rotateZ(rotation,rotation, Math.PI/2)
    mat4.fromRotationTranslation(expected, rotation, [-5,-75,0])

    make(matrix, {
        rotate: [-Math.PI/4, Math.PI/8, Math.PI/2],
        translate: [-5, -75]
    })
    t.deepEquals(matrix, 
        expected,
        'makes 3D rotation translation')
    t.end()
})