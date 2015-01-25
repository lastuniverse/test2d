/**
 * @author Roman Surmanidze / https://github.com/lastuniverse
 */

// MyTextures = function () {
// 	this.images = {};

// };

// MyTextute.prototype.load = function(opt) {
// 	var scope = this;
// 	if( opt.url && !scope.images[opt.url] ){
// 		scope.images[opt.url] = THREE.ImageUtils.loadTexture( opt.url);
// 	}
// };



// //THREE.BlendCharacter.prototype = Object.create( THREE.SkinnedMesh.prototype );

// //THREE.BlendCharacter.prototype.getForward = function() {


// MyObject = function () {
// 	this.images = {};
// }




THREE.Object2dContainer = function () {
	this.withCredentials = false;
	this.objects = {};
	this.images = {};
	this.materials = {};
	//this.current = "";
	this.animations = {};





	this.update = function( dt ) {
		// for ( var i = this.weightSchedule.length - 1; i >= 0; --i ) {
		// 	var data = this.weightSchedule[ i ];
		// 	data.timeElapsed += dt;
		// 	// If the transition is complete, remove it from the schedule
		// 	if ( data.timeElapsed > data.duration ) {
		// 		data.anim.weight = data.endWeight;
		// 		this.weightSchedule.splice( i, 1 );
		// 		// If we've faded out completely, stop the animation
		// 		if ( data.anim.weight == 0 ) {
		// 			data.anim.stop( 0 );
		// 		}
		// 	} else {
		// 		// interpolate the weight for the current time
		// 		data.anim.weight = data.startWeight + (data.endWeight - data.startWeight) * data.timeElapsed / data.duration;
		// 	}
		// }
		// this.updateWarps( dt );
		// this.skeletonHelper.update();
	};

	this.play = function(animName, weight) {
		// this.animations[ animName ].play( 0, weight );
	};


	this.pause = function() {
		// for ( var a in this.animations ) {
		// 	if ( this.animations[ a ].isPlaying ) {
		// 		this.animations[ a ].stop();
		// 	}
		// }
	};

	this.unPause = function() {
		// for ( var a in this.animations ) {
		// 	if ( this.animations[ a ].isPlaying && this.animations[ a ].isPaused ) {
		// 		this.animations[ a ].pause();
		// 	}
		// }
	};


	this.stop = function() {
		// for ( a in this.animations ) {
		// 	if ( this.animations[ a ].isPlaying ) {
		// 		this.animations[ a ].stop(0);
		// 	}
		// 	this.animations[ a ].weight = 0;
		// }
		// this.weightSchedule.length = 0;
		// this.warpSchedule.length = 0;
	}

	this.show = function( boolean ) {
		// this.visible = boolean;
	}

};



THREE.Object2dContainer.prototype.load = function ( url, onLoad ) {
	var scope = this;
	this.loadAjaxJSON( url, function(json){
		for (var key in json.animations) {
			scope.animations = json.animations;
			var obj = json.animations[key];
			if( !scope.images.hasOwnProperty(obj.img) ){
				var path = url.replace(/\.[^\.]+$/, "");
				scope.images[obj.img] = THREE.ImageUtils.loadTexture( path+'/'+obj.img );
				//scope.images[obj.img].anisotropy = renderer.getMaxAnisotropy();
			}
		}
		if ( onLoad !== undefined ) onLoad();
	});
};


THREE.Object2dContainer.prototype.create = function ( name, renderer ) {
	var scope = this;
	scope.objects[name] = {
		materials: {},
		animations: {}
	};
	var obj = scope.objects[name];
	for (var key in scope.animations) {
		var anim = scope.animations[key];
		//scope.images[obj.img].anisotropy = renderer.getMaxAnisotropy();
		obj.materials[key] = new THREE.MeshBasicMaterial( { 
			map: scope.images[anim.img],
			transparent: anim.transparent, 
			opacity: anim.opacity
		});
		obj.animations[key] = {};
		obj.animations[key].PlaneGeometry = new THREE.PlaneGeometry( anim.geometry.w, anim.geometry.h );
		obj.animations[key].Plane = new THREE.Mesh( obj.animations[key].PlaneGeometry, obj.materials[key]) ;
		obj.animations[key].Plane.castShadow = anim.shadow.cast;
	}
	return scope.objects[name];
};

THREE.Object2dContainer.prototype.loadAjaxJSON = function ( url, callback, callbackProgress ) {
	var xhr = new XMLHttpRequest();
	var length = 0;
	xhr.onreadystatechange = function () {
		if ( xhr.readyState === xhr.DONE ) {
			if ( xhr.status === 200 || xhr.status === 0 ) {
				if ( xhr.responseText ) {
					var json = JSON.parse( xhr.responseText );
					if ( json.metadata !== undefined && json.metadata.type !== 'Object2dContainer' ) {
						console.error( 'THREE.Objects2d.loadAjaxJSON: "' + url + '" this is not Object2dContainer.' );
						return;
					}
					callback( json );
				} else {
					console.error( 'THREE.JSONLoader: "' + url + '" seems to be unreachable or the file is empty.' );
				}
			} else {
				console.error( 'THREE.Objects2d.loadAjaxJSON: Couldn\'t load "' + url + '" (' + xhr.status + ')' );
			}
		} else if ( xhr.readyState === xhr.LOADING ) {
			if ( callbackProgress ) {
				if ( length === 0 ) {
					length = xhr.getResponseHeader( 'Content-Length' );
				}
				callbackProgress( { total: length, loaded: xhr.responseText.length } );
			}
		} else if ( xhr.readyState === xhr.HEADERS_RECEIVED ) {
			if ( callbackProgress !== undefined ) {
				length = xhr.getResponseHeader( 'Content-Length' );
			}
		}

	};
	xhr.open( 'GET', url, true );
	xhr.withCredentials = this.withCredentials;
	xhr.send( null );
};
