import type { Nullable } from "@utils/utils"

export interface INode<T> {
  previousNode: Nullable<INode<T>>
  nextNode: Nullable<INode<T>>

  info: T
  index: number

  isFirst(): boolean
  isLast(): boolean
}

export interface IDoubleLinkedList<T> {
  get begin(): Nullable<INode<T>>
  get last(): Nullable<INode<T>>
  getFirst(): Nullable<INode<T>>
  getLast(): Nullable<INode<T>>
  getByIdx(idx: number): Nullable<INode<T>>

  set setFirst(info: T)
  set setLast(info: T)
  set addFromArray(info: T[])

  set setAfterFirst(info: T)
  set setBeforeLast(info: T)

  hollowOut(): number

  iter(): Generator<INode<T>, void, INode<T>>
  removeFirst(): Nullable<INode<T>>
  removeLast(): Nullable<INode<T>>
  removeByIdx(idx: number): INode<T>

  count(): number
  isEmpty(): boolean

  traverse(): INode<T>[]
  forEach(does: (node: INode<T>) => void): void
}