//ZYX order
module.exports.fromEuler = function(quaternion, euler) {
    var x = euler[0], y = euler[1], z = euler[2]

    var sx = Math.sin(x/2), sy = Math.sin(y/2),
        sz = Math.sin(z/2), cx = Math.cos(x/2),
        cy = Math.cos(y/2), cz = Math.cos(z/2)

    quaternion[3] = cx*cy*cz - sx*sy*sz
    quaternion[0] = sx*cy*cz + cx*sy*sz
    quaternion[1] = cx*sy*cz - sx*cy*sz
    quaternion[2] = cx*cy*sz + sx*sy*cz
    return quaternion
}

module.exports.identity = function(out) {
    out[0] = 0
    out[1] = 0
    out[2] = 0
    out[3] = 1
    return out
}