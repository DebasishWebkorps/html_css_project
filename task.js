//que 5 

// Question: Write a function that merges two objects. If a key exists in both objects, it should resolve the conflict based on a provided strategy (e.g., "overwrite", "array"). The "array" strategy should create an array of values.

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

const ans = {}

for(let key of Object.keys(obj1)){
    if(obj2.hasOwnProperty(key)){
        ans[key]=[obj1[key],obj2[key]]
    }else{
        ans[key]=obj1[key]
    }
}

for(let key of Object.keys(obj2)){
    if(!ans.hasOwnProperty(key)){
        ans[key]=obj2[key]
    }
}

console.log(ans)


//que 4
// Flatten Nested Objects:
// Question: Create a function that takes a nested object and flattens it into a single-level object. The keys should represent the path to each value, using a separator (e.g., a dot).
let ob ={
    a: { b: { c: 1 } },
    d: 2,
    e: { f: 3 }
};


function flattenObj(obj){
    let result = {}
    
    for(let k in obj){
        if(typeof obj[k]==='object'){
            let temp = flattenObj(obj[k])
            for(let key in temp){
                result[k+'.'+key] = temp[key]
            }
        }else{
            result[k]=obj[k]
        }
    }
    return result
}

console.log(flattenObj(ob))


//que 3

const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { b: 3, c: 3, d: 4 };
// Output:
// javascript
// {
//     added: { d: 4 },
//     removed: { a: 1 },
//     changed: { b: { from: 2, to: 3 } }
// }

const result = {}

Object.keys(obj2).map(key=>{
 if(!obj1.hasOwnProperty(key)){
        result.added = {[key]:obj2[key]}
 }
 if(!obj1.hasOwnProperty(key)){
        result.removed = {[key]:obj2[key]}
 }
 }
)

Object.keys(obj1).map(key=>{
    if(obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]){
        result.changed = {...result.changed,[key]:{"from":obj1[key],"to":obj2[key]}}
    }
})


console.log(result)



//que 2 


const obj = { name: "John", age: "25", tags: [1, 2, 3] };
const schema = {
    name: "string",
    age: "number",
    tags: "array"
};
// Output:
// javascript
// ["age should be a number"]
let ans = []
for(let key of Object.keys(obj)){
    if(typeof obj[key] !==  schema[key]){
        if(Array.isArray(obj[key]) && (schema[key]==='array')) continue
        let msg = `${key} should be a ${schema[key]}`
        ans.push(msg)
    }
}
console.log(ans)



//que 1

const obj = {
    a: 1,
    b: { c: 2, d: [3, 4] },
    e: null,
    f: () => {},
    g: {}
};


console.log(JSON.stringify(obj,((key,val)=>
    typeof val === 'function' ? '[Function]' : val
)))




/////////////////


const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const op = {}

// Output:
// javascript
// {
//     a: 1,
//     b: [2, 3],
//     c: 4
// }

for(let k of Object.keys(obj1)){
    if(obj2.hasOwnProperty(k)){
        op[k]=[obj1[k],obj2[k]]
    }else{
        op[k]=obj1[k]
    }
}

for(let k of Object.keys(obj2)){
    if(obj1.hasOwnProperty(k)){
        op[k]=[obj1[k],obj2[k]]
    }else{
        op[k]=obj2[k]
    }
}

console.log(op)