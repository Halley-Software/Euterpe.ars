import { DoubleLinkedList } from "../DoubleLinkedList/DoubleLinkedList.js"

const list = new DoubleLinkedList<string>("primero", "segundo")

list.setLast = "wtf2"
list.setFirst = "tercero"
list.setFirst = "cuarto"
//list.setFirst = "primero"
//list.setFirst = "wtf3"
//list.setAfterFirst = "wtf4"

//const bruh = list.getLast.previousNode?.previousNode?.previousNode?.nextNode?.nextNode?.previousNode?.nextNode?.nextNode
const bruh = list.getFirst

console.log(list.getFirst)

console.log(bruh?.info)
