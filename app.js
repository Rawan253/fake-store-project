

// let colors = ["red", "green", "blue"];

// for(let [index, color] of colors.entries()){
//     console.log(`${color} is at index ${index}`);
// }


// const ratings = [
//     {user: 'John',score: 3},
//     {user: 'Jane',score: 4},
//     {user: 'David',score: 5},
//     {user: 'Peter',score: 2},
// ];

// let tot = 0;
// for(const {score} of ratings){
//     tot += score;
// }

// console.log( `Total score = ${tot}`)


// let str = 'abc';
//  for( const c of str){
//     console.log(c);
//  }


// let colors1 = new Map();

// colors.set('red', '#ff0000');
// colors.set('green', '#00ff00');
// colors.set('blue', '#0000ff');

// for(let color of colors1){
//     console.log(color);
// }

// const person = {
//     firstName: 'John',
//     lastName: 'Doe',
//     key: 'testkey'
// };

// person.age = 25;

// Object.defineProperty(person, 'ssn', {
//     enumerable: false,
//     value: '123-456-7890'
// });

// for (const key in person) {
//     console.log(person[key]);
// }

// let a = 051;
// console.log(a);

let display = (person) => console.log(`${person.firstName} ${person.lastName}`);

let person = {
    firstName: 'John',
    lastName: 'Doe'
};

display(person);