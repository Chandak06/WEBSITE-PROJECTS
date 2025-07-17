// type Person={
//     name: string
// }

// const person:Person={
//     name:"john",
// }

// console.log(person.name)


// let num:number=7 ;
// console.log(num)


// let Myname:string="harshit";
// console.log(Myname)

// let isHard:boolean=true
// console.log(isHard)

// const mul=(x:number,y:number)=>x*y;
// console.log(mul(2,3))


// function greet(person:string="Harshit"){
//     console.log(`Hello ${person}`)
// }
// greet("Chandak")
// greet()


// function double(x:number):void{
//     console.log(x*x)
// }

// double(5)

// type User = {
//     name:string,
//     age:number,
//     location:string
// }

// const printUserInfo=(user:User)=>{
//     return `Name : ${user.name} Age : ${user.age} Location : ${user.location}`
// }

// const res=printUserInfo({name:"harshit",age:20,location:"india"})
// console.log(res)

// type User = {
//     name:string,
//     age:number,
//     location?:string
// }

// const printUserInfo=(user:User)=>{
//     return `Name : ${user.name} Age : ${user.age} Location : ${user.location}`
// }

// const res=printUserInfo({name:"harshit",age:20,location:"india"})
// const res1=printUserInfo({name:"chandak",age:22})
// console.log(res)
// console.log(res1)

// type UserInfo={
//     first:string,
//     last:string,
//     age:number
// }

// type AccountDetails={
//     email:string,
//     password:string
// }

// type UserDetails=UserInfo & AccountDetails

// const user:UserDetails={
//     first:"Harshit",
//     last:"Chandak",
//     age:20,
//     email:"chandakharshit@gmail.com",
//     password:"yoooo"
// }

// let color:"red"|"yellow"|"blue"
// color="red"
// color="blue"
// color="black" 
// console.log(color)


// class Person{
//     name:string;
//     age:number;

//     constructor(name:string,age:number){
//         this.name=name;
//         this.age=age
//     }
// }

// const p=new Person("john",20)
// console.log(p)

// function data<Type>(item:Type,value:Type):[Type,Type]{
//     return [item,value]
// }

// console.log(data(10,10))
// console.log(data("hello","world"))

// function randomKey<T>(obj:{[key:string]:T}):{key:string,value:T}{
//     const keys=Object.keys(obj);
//     const randkey=keys[Math.floor(Math.random()*keys.length)];

//     return {key:randkey,value:obj[randkey]}
// }

// const sobj={a:"aaple",b:"banana",c:"cat"};
// const res=randomKey<string>(sobj);
// console.log(res)

function filterArray<T>(arr:T[],conditon:(item:T)=>boolean){
    return arr.filter((item)=>conditon(item));
}

const arr=[1,2,3,4,5,6,7,8,9,10];
const evenArr=filterArray<number>(arr,(num)=>num%2==0)
console.log(evenArr)