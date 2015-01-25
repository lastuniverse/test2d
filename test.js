WORLD = function(url,callback) {
    this.url = url;
};


WORLD.prototype.method = function() {
    say("WORLD.prototype.method() url: [" + this.subclass.url + "]");
    //this.subclass.method.call(this);
    //this.subclass.url = this.url;
};


/**********************************************************************************************/
//  Листинг 10
/*function B (x, y) {
  this.x = x;
  this.y = y;
};

B.prototype.z = 10;

B.prototype.foo = function () {
  return this.x + this.y + this.z;
};
B.prototype.set = function (n) {
		this.__proto__.z = n;
};

var b = new B(1, 1);
var c = new B(2, 2);
c.set(20);

console.log(b.x+', '+b.y+', '+b.z+', '+b.foo());  //  1, 2, 3
console.log(c.x+', '+c.y+', '+c.z+', '+c.foo());  //  1, 2, 3*/