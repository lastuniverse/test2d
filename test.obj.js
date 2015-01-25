var Grandfather = function () {}; // Конструктор Grandfather 
Grandfather.prototype.color = 'green';

var Father = function () {}; // Конструктор Father 
Father.prototype = new Grandfather(); // Это простой, но не самый лучший вариант протитипного наследования

var Son = function () {}; // Конструктор Son 
Son.prototype = new Father(); // Аналогично

var u = new Grandfather(); // Экземпляр "класса" Grandfather
var f = new Father(); // Экземпляр "класса" Father
var s = new Son(); // Экземпляр "класса" Son

// Изначально все зеленые
console.log([u.color, f.color, s.color]); // ["green", "green", "green"]

// Дед решил поменять свой цвет и цвет потомства
Grandfather.prototype.color = 'blue';
console.log([u.color, f.color, s.color]); // ["blue", "blue", "blue"]

// Отец решил все вернуть для себя и своего потомства
Father.prototype.color = 'green';
// Хотя мог исделать и так:
// Grandfather.prototype.color = 'green';
console.log([u.color, f.color, s.color]); // ["blue", "green", "green"]

// Смысла нет
Grandfather.prototype.color = 'blue';
console.log([u.color, f.color, s.color]); // ["blue", "green", "green"]

// Сын решил не брать пример с Деда и поменял только собственное свойство
s.color = 'black'; // Меняем собственное свойство, которое не затрагивает цепочку прототипов
console.log([u.color, f.color, s.color]); // ["blue", "green", "black"]

var SonsSon = function () {}; // Конструктор SonsSon
SonsSon.prototype = new Son(); // Аналогично

var ss = new SonsSon(); // Экземпляр "класса" SonsSon
// Сын сына унаследовал от Отца
console.log([u.color, f.color, s.color, ss.color]); // ["blue", "green", "black", "green"]