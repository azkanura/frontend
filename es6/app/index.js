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
import students from './students';
console.log(students);
