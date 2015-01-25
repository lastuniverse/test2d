// var GAME = { REVISION: '0' };



// // browserify support

// if ( typeof module === 'object' ) {

// 	module.exports = GAME;

// }

/*****************************************************************************/
var GAME = function (){

	console.log("constructor GAME");

    var my = {};
	my.loader = new GAME.loader();
	my.images = new GAME.images(my);
	my.animations = new GAME.animations(my);
	my.objects =  new GAME.objects(my);

    // my.moduleMethod = function () {
    //     //return rivateVariable;
    //     console.log("MODULE: OLD moduleMethod: moduleProperty:["+this.moduleProperty+"] privateVariable:["+privateVariable+"]")
    // };

    return my;	
};

GAME.prototype = {

	constructor: GAME

};

/*****************************************************************************/
GAME.loader = function (parent){
	console.log("constructor GAME.loader");
};

GAME.loader.prototype = {
	constructor: GAME.loader,
	count: 0,
	loadAjaxJSON: function ( url, callback, callbackProgress ) {
		var xhr = new XMLHttpRequest();
		var length = 0;
		xhr.onreadystatechange = function () {
			if ( xhr.readyState === xhr.DONE ) {
				if ( xhr.status === 200 || xhr.status === 0 ) {
					if ( xhr.responseText ) {
						var json = JSON.parse( xhr.responseText );
						// if ( json.metadata !== undefined && json.metadata.type !== 'Object2dContainer' ) {
						// 	console.error( 'THREE.Objects2d.loadAjaxJSON: "' + url + '" this is not Object2dContainer.' );
						// 	return;
						// }
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
	}
};

/*****************************************************************************/
GAME.images = function (parent){
	this.parent = parent;
	console.log("constructor GAME.images");
};

GAME.images.prototype = {
	constructor: GAME.images,
	list: {},
	load: function ( url, onLoad ) {
		if ( url in this.list ) {
			onLoad(); 
			return;
		} 
		this.list[url] = THREE.ImageUtils.loadTexture( url, onLoad );
	}
};

/*****************************************************************************/
GAME.animations = function (parent){
	this.parent = parent;
	console.log("constructor GAME.animation");
};

GAME.animations.prototype = {
	constructor: GAME.animations,
	load: function ( url, callback ) {
		this.parent.loader.loadAjaxJSON( url+'.json', function(json) {
			this.parent.images.load(url+'.png',callback(json));
		});
	},
	create: function ( url, callback ) {
	}
};

/*****************************************************************************/
GAME.objects = function (parent){
	this.parent = parent;
	console.log("constructor GAME.objects");
};

GAME.objects.prototype = {
	constructor: GAME.objects,
	list: {},
	load: function ( name, callback) {
		if ( name in this.list ) callback(this.list[name]);
		this.parent.loader.count++;
		this.parent.loader.loadAjaxJSON( 'objects/'+name+'/object.json', function(json) {
			var anim = this.animations = json.animations;
			for (var key in anim) {
				this.parent.loader.count++;
				this.parent.animations.load('objects/'+name+'/animations/'+key, function(ret){
					anim[key]=ret;
					this.parent.loader.count--;
				});
			}
			this.parent.loader.count--;
		});
	},
	create: function (name) {
		load( name, callback) {
		var obj = {};
		obj.
	}
};




var game = new GAME();


// game.animations.load({
// 		name: 'walk',
// 		url: '../animations/zombie02.walk01.json'
// 	},
// 	function () {
// 		console.log('animations loaded!');
// 	}
// );

game.objects.load('zombie02');