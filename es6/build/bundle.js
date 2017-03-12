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


var blastoff = function blastoff() {
  console.log('blastofff');
};

blastoff();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);