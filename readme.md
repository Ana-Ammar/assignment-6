 ## Answer the following questions:

## 1. What is the difference between var, let, and const?


 - var : Function-scoped, hoisted (initialized but undefined), reassignable and redeclarable.
   
 - let & const : Block-scoped, hoisted (not initialized)

 - const & let : not redeclarable but let is reassignable and const not.


---

## 2.  What is the difference between map(), forEach(), and filter()?


  - forEach() : Do something and nothing returns
  - map() : Transform and returns new array
  - filter: Select elements based on condition and returns new array


---

## 3. What are arrow functions in ES6?

- A shorter way to write functions in JavaScript (ES6)
  Example :- const add = (a, b) => a + b;

---

## 4. How does destructuring assignment work in ES6?
  
- It takes values from arrays or objects and assign them to variables in a single line.
  Examples : - const [a, b] = [1, 2];
               console.log([a, b])
               result = [ 1, 2 ]


---

## 5. Explain template literals in ES6. How are they different from string concatenation?
   

 - It makes a string or multi-line string using backticks ` instead of quotes and allows dynamic expressions using ${...}.
  