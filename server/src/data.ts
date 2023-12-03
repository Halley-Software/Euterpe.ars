import { ISong } from "./types/ISong.js";
import { DoubleLinkedList } from "./utils/DoubleLinkedList/DoubleLinkedList.js";

const data: DoubleLinkedList<ISong> = new DoubleLinkedList({
  name: "Like you do the gogij",
  artist: ["Gogij"],
  time: 300
}, {
  name: "Lemon Tree",
  artist: ["Post Malone"],
  time: 194
}, {
  name: "El violador",
  artist: ["Piter-G"],
  time: 10000000000
})

export default data