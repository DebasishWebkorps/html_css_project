const students = [{ name: "Alice", scores: { math: 85, english: 90, science: 88 } }, { name: "Bob", scores: { math: 75, english: 80, science: 82 } }, { name: "Charlie", scores: { math: 90, english: 85, science: 92 } }];

// function getTopStudents(students, course) {
//     const arr = students.sort((a,b)=>b.scores[course]-a.scores[course])
//     return arr
// }
// console.log(getTopStudents(students,'math'));
// console.log(students)


for(let i = 0;i<students.length;i++){
    
}


// })

const nestedNumbers = [[1, 2, 3], [4, 5, 2], [6, 7, 1]]; 
function flattenAndUnique(numbers) { 
    const arr = nestedNumbers.flat()
    return [...new Set(arr)]
    } 
    console.log(flattenAndUnique(nestedNumbers));







    ///////////////

    const students = [ { name: "Alice", scores: { math: 85, english: 90, science: 88 } }, { name: "Bob", scores: { math: 75, english: 80, science: 82 } }, { name: "Charlie", scores: { math: 90, english: 85, science: 92 } } ]; 

for(let s of students){
    let sum = Object.values(s.scores).reduce((acc,val)=>acc+=val,0)
    s.scores =sum
}

const data = students.sort((a,b)=>
b.scores-a.scores)
console.log(data)
