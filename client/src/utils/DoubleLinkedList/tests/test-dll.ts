import { DoubleLinkedList } from "../DoubleLinkedList";

const dll = new DoubleLinkedList([1, 2, 3, 4, 5])

const iterator = dll.iter()

let next = iterator.next().value

if (next) {
    console.log(next.info)
}

/* console.log(dll.begin?.info)
console.log(dll.begin?.index)

dll.removeFirst()

console.log()

console.log(dll.begin?.info)
console.log(dll.begin?.index) */

/* console.log("Info del penultimo: " + dll.last?.previousNode?.info)
console.log("Indice del penultimo: " + dll.last?.previousNode?.index)

dll.removeByIdx(3)

console.log()

console.log("Info del penultimo despues del borrado: " + dll.last?.previousNode?.info)
console.log("Indice del penultimo despues del borrado: " + dll.last?.previousNode?.index)

console.log()

console.log("Info del ultimo despues del borrado: " + dll.last?.info)
console.log("Indice del ultimo despues del borrado: " + dll.last?.index) */

console.log()

// index 1
//console.log(dll.begin.nextNode?.nextNode?.nextNode)

console.log()

// undefined
//console.log(dll.begin.nextNode?.nextNode?.nextNode?.nextNode?.nextNode?.info)

console.log()

// 4
//console.log(dll.begin.nextNode?.nextNode?.nextNode?.info)

// newline
console.log()

// 3
//console.log(dll.begin.nextNode?.nextNode?.previousNode?.nextNode?.info)