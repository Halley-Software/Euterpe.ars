export interface Node<T> {
  previousNode: Node<T> | null
  nextNode: Node<T> | null

  info: T
  index: number
}

export interface IDoubleLinkedList<T> {
  get getFirst(): Node<T>
  get getLast(): Node<T>
  get begin(): Node<T>
  getByIdx(idx: number): Node<T>

  set setFirst(info: T)
  set setLast(info: T)

  set setAfterFirst(info: T)
  set setBeforeLast(info: T)

  removeFirst(): Node<T>
  removeLast(): Node<T>

  removeByIdx(idx: number): Node<T>
  count(): number

  isEmpty(): boolean
  isFirst(node: Node<T>): boolean
  isLast(node: Node<T>): boolean
  traverse(): T[]
  recurseTraverse(): T[]
}