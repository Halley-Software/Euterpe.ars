import { DoubleLinkedList } from "../DoubleLinkedList";

const dll = new DoubleLinkedList([1, 2, 3, 4, 5])

console.log(dll.last?.index)

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