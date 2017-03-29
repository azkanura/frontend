/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// let hello="haaalllooow";
// console.log(hello);
//
// {
//   let hello="goodbye";
//   let salary= 99999;
//   console.log(hello);
// }
//
// console.log(hello);
// console.log(salary);

// const array =[1,2,3];
// array.push(4);
// console.log(array);
// let a ='hello';
// let b= 'world';
//
// console.log(`${a} ${b}`);
//
// function print(...z){
//   console.log(z);
// }
//
// let z =[1,2,3];
// let y = [0,...z,4,5];
// print(...y);
// print(1,"huwala",3);
//
// let fellowship =["frodo","gandalf","aragon"];
// let [a,b,c] = fellowship;
// console.log(a,b,c);

// let c = [1,2,3,4,5,6];
// let [a,...b]=c;
// console.log(a,b);
// let magical = false;
// let power = 9;
// let wizard = {magical: true, power: 100};
// ({magical,power} = wizard);
// console.log(magical,power);
// function blastoff(){
//   console.log('blastofffff');
// }
// blastoff();

// setTimeout(()=>{
//   console.log('blastoff');
// },1000);


// const blastoff = ()=>{
//   console.log('blastofff');
// }
//
// blastoff();

// this.a = 25;
// let print = function(){
//   this.a=50;
//   console.log('this.a', this.a);
// }
//
// print();


// let arrowPrint = ()=>{
//   console.log('test');
// }
//
// arrowPrint();

// let points = [10,20,20];
//
// // let addOne = function(element){
// //   return element+1;
// // }
//
// // let addOne = (element)=>{
// //   return element+1;
// // }
// // points = points.map((element)=>{return element+1});
// points = points.map(element=> element+1);
// console.log(points);
// let scores = [78,56,90,87,54,65,12,100,98,50,78,70,61,72,90];
// // let isPassing = (grade)=>{
// //   return grade >=70;
// // }
//
// let passed = scores.filter(element => element>=70);
// console.log(passed);
//
// let found = scores.find(element=>element>=70);
// console.log(found);
// import students from './students';
// console.log(students);

var Entity = function () {
  function Entity(name, height) {
    _classCallCheck(this, Entity);

    this.name = name;
    this.height = height;
  }

  _createClass(Entity, [{
    key: 'greet',
    value: function greet() {
      console.log('hallo, i\'m ' + this.name + ', I\'m ' + this.height + ' tall');
    }
  }]);

  return Entity;
}();

new Entity('marry', 123);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);