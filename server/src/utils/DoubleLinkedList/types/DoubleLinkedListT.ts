export interface INode<T> {
  previousNode: INode<T> | null
  nextNode: INode<T> | null

  info: T
  index: number

  isFirst(): boolean
  isLast(): boolean
}

export interface IDoubleLinkedList<T> {
  get getFirst(): INode<T>
  get getLast(): INode<T>
  get begin(): INode<T>
  getByIdx(idx: number): INode<T>

  set setFirst(info: T)
  set setLast(info: T)
  set addFromArray(info: T[])

  set setAfterFirst(info: T)
  set setBeforeLast(info: T)

  iter(): Generator<INode<T>, void, INode<T>>
  removeFirst(): INode<T>
  removeLast(): INode<T>
  removeByIdx(idx: number): INode<T>

  count(): number
  isEmpty(): boolean

  traverse(): T[]
}