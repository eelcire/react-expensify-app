const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Eric',
            age: 24
        })
        // reject('Something went wrong!')
    }, 5000)
})

console.log('before') 

promise.then((data) => {
    console.log('1', data)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('This is my other promise')
        }, 5000)
    })
}).then((str) => {
    console.log('does this run?', str)
}).catch((error)=> {
    console.log('error: ', error)
});

console.log('after')