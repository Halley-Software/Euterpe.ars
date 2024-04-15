function test(): Promise<number> {
    return new Promise((resolve, reject) => {
        resolve(10)
        reject("Alto mamahuevo")
    })
}

let number = 5

function setNumber(newValue: number) {
    number = newValue
}

console.log(number)

test()
.then(newNumber => setNumber(newNumber))

console.log(number)