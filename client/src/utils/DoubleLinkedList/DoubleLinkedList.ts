import { PreviousIsNullError } from "./errors/PreviousIsNull.js"
import type { INode, IDoubleLinkedList } from "./typings/DoubleLinkedListT.js"
import type { Nullable } from "@utils/utils"

/**
 * A node is a structure that contains the references
 * to his previous and next node.
 * 
 * In addition, a index that is used as a reference to found the node in a list of nodes
 */
export class Node<T> implements Node<T> {
  public index: number
  public info: T
  public previousNode: Nullable<Node<T>>
  public nextNode: Nullable<Node<T>>

  /**
   * Constructs a new node with the fields passed
   *
   * @param fields literal object containing the data of a node
   */
  public constructor(fields: {index?: number, info: T, previousNode: Nullable<Node<T>>, nextNode: Nullable<Node<T>>}) {
    this.index ??= 0
    this.info = fields.info
    this.previousNode = fields.previousNode
    this.nextNode = fields.nextNode
  }

  /**
   * Check if the node is the first in the list
   * @returns {boolean} true if is the first element in the list, false in other case
   */
  public isFirst(): boolean {
    return this.previousNode === null
  }

  /**
   * Check if the node is the last in the list
   * @returns {boolean} true if is the last element in the list, false in other case
   */
  public isLast(): boolean {
    return this.nextNode === null
  }
}

/**
 * In a DoubleLinkedList we have an initial node,
 * with that node we can advence or go back between nodes (if there are any)
 * 
 * Every Node contains data like, info of any type indicated,
 * An index where the first node in the list starts with the index 0
 * and the reference to the previous and next node
 * 
 * For be more explicit and understad better the double linked lists
 * In every node validation we are using explicit comparation with **not null**
 */
export class DoubleLinkedList<T> implements IDoubleLinkedList<T> {

  private doubleLinkedList: Nullable<Node<T>>

  /**
   * DoubleLinkedList constructor, passing an array will iterate it adding his elements, and incrementing the index
   * @param contents Array or value of `T` type 
   */
  public constructor(contents: T | T[]) {
    if (!Array.isArray(contents))
      this.doubleLinkedList = new Node({ index: 0, info: contents, previousNode: null, nextNode: null })
    else {
      if (contents.length === 0)
        this.doubleLinkedList = null
      else {
        this.doubleLinkedList = new Node({ info: contents[0], previousNode: null, nextNode: null })      
        let aux = this.doubleLinkedList
        const sliced = contents.slice(1)

        // Adds all the element from the array
        for (let i = 0; i < sliced.length; i++) {
          const newNode = new Node({ index: i, info: sliced[i], previousNode: aux, nextNode: null })
          aux.nextNode = newNode
          aux = newNode
        }

        // Increment the indexes
        let auxPtr: Nullable<Node<T>> = this.doubleLinkedList
        while (auxPtr !== null) {
          if (auxPtr.previousNode)
            auxPtr.index = auxPtr.previousNode.index + 1
            
          auxPtr = auxPtr.nextNode
        }
      }
    }
  }

  /**
   * Increment the `index` field of all the nodes in 1
   */
  private incrementIndexes(): void {
    let auxPtr = this.begin
    if (auxPtr) {
      while (auxPtr.nextNode !== null) {
        auxPtr = auxPtr.nextNode
        auxPtr.index++
      }
    }
  }

  /**
   * Set a node as the first of the list, moving the rest a position to right
   */
  public set setFirst(info: T) {
    const newNode = new Node({info, previousNode: null, nextNode: null})

    if (this.begin !== null) // If already are 1 node
      this.begin.previousNode = newNode // Change the previous node of the first element from null to the new created node

    // Sets the next node of the new first element to the actual state of list (that contains as previous node the new created node)
    newNode.nextNode = this.begin

    this.doubleLinkedList = newNode
    this.incrementIndexes()
  }

  /**
   * Set a node as the last value in the list
   */
  public set setLast(info: T) {
    if (this.doubleLinkedList === null)
      this.setFirst = info
    else {
      // In this case we assign the index, previousNode and nextNode later when we find the last node
      // Assigning this values according to these node
      const newNode = new Node({info, previousNode: null, nextNode: null})

      let auxNode = this.doubleLinkedList // At the end of the loop will represent the last node in the list
      while (auxNode.nextNode !== null)
        auxNode = auxNode.nextNode

      newNode.index = auxNode.index + 1
      newNode.previousNode = auxNode
      auxNode.nextNode = newNode
    }
  }

  /**
   * Appends the array data at the end of the list
   */
  public set addFromArray(infoArr: T[]) {
    for (const info of infoArr) {
      this.setLast = info;
    }
  }

  /**
   * Insert a new node after the first node moving the rest of nodes 1 position to the right
   */
  public set setAfterFirst(info: T) {
    if (this.doubleLinkedList === null)
      throw new PreviousIsNullError("Cannot add elements after the first element if the list is empty")


    const firstNode = this.doubleLinkedList
    /**
     *  * Index: We increment the index then, once the new node was added to the list
     *  * PreviousNode: Represents the first value in the list,
     *  * NexTNode: Represents the second value in the list, thats why we had checked if the list is empty at the begining of the method
     */
    const newNode = new Node({info, previousNode: firstNode, nextNode: firstNode})

    if (newNode.nextNode !== null)
      newNode.nextNode.previousNode = newNode

    firstNode.nextNode = newNode
    this.incrementIndexes()
  }

  /**
   * Adds a node that is added before the last node, moving the last node a position to right
   * @param info Info of the node inserted as penultimate node in the list
   */
  public set setBeforeLast(info: T) {
    throw new Error("Method not implemented.")
  }

  /***/
  public hollowOut(): number {
    throw new Error("Method not implemented.")
  }

  /**
   * Returns the node that match with the indicated index
   * @param {number} idx Index of searched node
   * @returns {INode<T>} Node that his index match with the passed index
   */
  public getByIdx(idx: number): Nullable<Node<T>> {
    let auxPtr = this.begin
    if (auxPtr) {
      while (auxPtr.nextNode !== null && auxPtr.index !== idx)
        auxPtr = auxPtr.nextNode
    }

    return auxPtr
  }

  /**
   * Remove the first node in the list moving all the nodes 1 position to the left
   * 
   * @returns The first node
   */
  public removeFirst(): Nullable<Node<T>> {
    const node = this.begin
    if (node === null)
      return node

    const next = node.nextNode
    this.doubleLinkedList = next

    return node
  }

  /**
   * Remove the last node in the list moving, setting the nextNode of penultimate to null
   * 
   * @returns
   */
  public removeLast(): Nullable<Node<T>> {
    let next = this.begin
    if (next !== null) {
      while (next.nextNode !== null)
        next = next.nextNode

      if (next.previousNode !== null)
        next.previousNode.nextNode = null
    }
    return next;
  }

  public removeByIdx(idx: number): Nullable<Node<T>> {
    const node = this.getByIdx(idx)
    if (node === null)
      return node

    const prev = node.previousNode
    const next = node.nextNode

    if (prev !== null)
      prev.nextNode = next

    if (next !== null)
      next.previousNode = prev

    return node
  }

  /**
   * Count the number of nodes in the list
   * @returns The number of nodes in the list
   */
  public count(): number {
    let nodesCounter = 0
    if (!this.isEmpty() && this.begin) {
      let nextNode = this.begin.nextNode
      for (; nextNode !== null; nodesCounter++)
        nextNode = nextNode.nextNode

      nodesCounter += 1 // Needs to plus 1 because we got 1 node outside the loop that was not counted
    }
    
    return nodesCounter
  }

  /**
   * Check if the list is empty
   * @returns {boolean} true, If the list is empty, false in other case
   */
  public isEmpty(): boolean {
    return this.doubleLinkedList === null
  }

  /**
   * Iter over the nodes in the list using a generator
   * @yields the first or next node in the list
   */
  public *iter(): Generator<Node<T>, void, Node<T>> {
    let actual = this.begin

    while (actual !== null) {
      yield actual
      actual = actual.nextNode
    }
  }

  /**
   * Iterate over the list collecting all the nodes into an array
   */
  public collect(): Node<T>[] {
    const contents: Node<T>[] = []
    let node = this.doubleLinkedList

    while (node !== null) {
      contents.push(node)
      node = node.nextNode
    }
    
    return contents;
  }

  public forEach(does: (node: Node<T>) => void): void {
    for (const node of this.collect())
      does(node)
  }

  /**
   * Returns the first element in the list
   * 
   * That is the same that returns the Linked List
   * 
   * @returns The first node
   */
  public get begin(): Nullable<Node<T>> {
    return this.doubleLinkedList
  }

  public get last(): Nullable<Node<T>> {
    let walker = this.begin
    if (walker) {
      while (walker.nextNode !== null) {
        walker = walker.nextNode
      }
    }
    return walker
  }

  /**
   * Shorthand method to `DoubleLinkedList.prototype.begin` getter
   * @returns
   */
  public getFirst(): Nullable<Node<T>> {
    return this.begin
  }

  /**
   * Iterate over all the list until finds the last node returning it
   * 
   * @returns The last node in the list
   */
  public getLast(): Nullable<Node<T>> {
    return this.last
  }
}