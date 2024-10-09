let obj = {
    name: "jskbchsb",
    surname: "jkdnfjsd"
}

const modifiedObj = Object.fromEntries(
    Object.keys(obj).reduce((acc,key)=>{
        return [...acc,[obj[key],key]]
    },[])  
)

const modObj = Object.fromEntries(
    Object.keys(obj).map(key=>[])
)

console.log(modifiedObj)