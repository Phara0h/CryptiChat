//Array.prototype.remove = function(e) {
//  for (var i = 0; i < this.length; i++)
//    if (e == this[i]) return this.splice(i, 1);
//};
//
//Array.prototype.each = function(fn) {
//  for (var i = 0; i < this.length; i++) fn(this[i]);
//};
//
//Array.prototype.compact = function(fn) {
//  for (var i = 0; i < this.length; i++)
//    if (this[i] == null) {
//      this.splice(i, 1);
//    }
//  return this;
//};
window.clear = clear; // for clear();

function sizeOfObject( object ) {

    var objectList = [];

    var recurse = function( value )
    {
        var bytes = 0;

        if ( typeof value === 'boolean' ) {
            bytes = 4;
        }
        else if ( typeof value === 'string' ) {
            bytes = value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes = 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList[ objectList.length ] = value;

            for( i in value ) {
                bytes+= 8; // an assumed existence overhead
                bytes+= recurse( value[i] )
            }
        }
        
      
        return bytes;
    }

    return recurse( object );
}

function uvmap (geometry, face, x, y, w, h, rotateBy, tileUvWidth, tileUvHeight) {
	if(!rotateBy) rotateBy = 0;
	var uvs = geometry.faceVertexUvs[0][face];
	var tileU = x;
	var tileV = y;
	
	uvs[ (0 + rotateBy) % 4 ].x = tileU * tileUvWidth;
	uvs[ (0 + rotateBy) % 4 ].y = tileV * tileUvHeight;
	
	uvs[ (1 + rotateBy) % 4 ].x = tileU * tileUvWidth;
	uvs[ (1 + rotateBy) % 4 ].y = tileV * tileUvHeight + h * tileUvHeight;
	
	uvs[ (2 + rotateBy) % 4 ].x = tileU * tileUvWidth + w * tileUvWidth;
	uvs[ (2 + rotateBy) % 4 ].y = tileV * tileUvHeight + h * tileUvHeight;
	
	uvs[ (3 + rotateBy) % 4 ].x = tileU * tileUvWidth + w * tileUvWidth;
	uvs[ (3 + rotateBy) % 4 ].y = tileV * tileUvHeight;
};


function getMaterial (img, trans) {
	var material = new THREE.MeshBasicMaterial({
		map: new THREE.Texture(
			img,
			new THREE.UVMapping(),
			THREE.ClampToEdgeWrapping,
			THREE.ClampToEdgeWrapping,
			THREE.NearestFilter,
			THREE.NearestFilter,
			(trans? THREE.RGBAFormat : THREE.RGBFormat)
		),
		transparent: !!trans
	});
	material.map.needsUpdate = true;
	return material;
};

var sin = new SimplexNoise();
