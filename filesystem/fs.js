const fs = require('fs')

try {
    // fs.writeFile('new.txt','good morning',(err)=>{
    //     if(err) throw err
    // })


    // fs.readFile('new.txt', 'utf-8', (err, data) => {
    //     if (err) throw err
    //     console.log(data) // <Buffer 67 6f 6f 64 20 6d 6f 72 6e 69 6e 67>
    //     //due to 'utf-8' data encode to string else it'll be buffer
    // })


    // fs.appendFile('new.txt', 'i am good', (err, data) => {
    //     if (err) throw err
    //     console.log(data)
    // })

    // fs.open('new.txt','w',(err,file)=>{
    //     if(err) throw err
    //     console.log(file)
    // })

    // fs.unlink('new.txt',(err)=>{
    //     if(err) throw err
    // })

    // fs.writeFile('new.txt','hello000',(err,data)=>{
    //     if(err) throw err
    // })

    // fs.rename('new.txt','updated.txt',(err)=>{
    //     if(err) throw err
    // })

    // fs.readFile('files.pdf',(err,data)=>{
    //     if(err) throw err
    //     console.log(data) // buffer
    // })



    // fs.readFile('testing.xlsx',(err,data)=>{
    //     if(err) throw err
    //     console.log(data) //Buffer
    // })

    fs.open('new.txt','r',(err)=>{
        if(err) throw err
    })

} catch (error) {
    console.log(error.message)
}
