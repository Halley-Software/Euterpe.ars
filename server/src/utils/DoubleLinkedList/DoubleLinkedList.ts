import { PreviousIsNullError } from "./errors/PreviousIsNull.js"
import { INode, IDoubleLinkedList } from "./types/DoubleLinkedListT.js"

/**
 * A node is a structure that contains the references
 * to a previous and next node.
 * 
 * In addition, a index that is used as a refenrence to found the node in a list of nodes
 */
export class Node<T> implements INode<T> {
  public index: number
  public info: T
  public previousNode: INode<T> | null
  public nextNode: INode<T> | null


  public constructor(fields: {index?: number, info: T, previousNode: INode<T> | null, nextNode: INode<T>  | null}) {
    this.index ??= 0
    this.info = fields.info
    this.previousNode = fields.previousNode
    this.nextNode = fields.nextNode
  }

  public isFirst(): boolean {
    return this.previousNode == null
  }

  public isLast(): boolean {
    return this.nextNode == null
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
 * In every node validation we are using explicit comparation with not null
 */
export class DoubleLinkedList<T> implements IDoubleLinkedList<T> {

  private doubleLinkedList: INode<T>

  /**
   * DoubleLinkedList constructor
   * If any parameter is passed, the constructor will replicate the model of {@link DoubleLinkedList#setFirst}
   * @param {T[]} contents Starting values
   */
  public constructor(...contents: T[]) {
    for (const content of contents) {
      const newNode = new Node({info: content, previousNode: null, nextNode: null})

      if (this.doubleLinkedList != null) // If already are 1 node
        this.doubleLinkedList.previousNode = newNode

      newNode.nextNode = this.doubleLinkedList

      this.doubleLinkedList = newNode
      this.incrementIndexes()
    }
  }

  /**
   * Increment the `index` field of all the nodes in 1
   */
  private incrementIndexes(): void {
    let auxPtr = this.doubleLinkedList
    while (auxPtr.nextNode != null) {
      auxPtr = auxPtr.nextNode
      auxPtr.index++
    }
  }

  /**
   * Set a node as the first of the list, moving the rest a position to right
   */
  public set setFirst(info: T) {
    const newNode = new Node({info, previousNode: null, nextNode: null})

    if (this.doubleLinkedList != null) // If already are 1 node
      this.doubleLinkedList.previousNode = newNode // Change the previous node of the first element from null to the new created node

    // Sets the next node of the new first element to the actual state of list (that contains as previous node the new created node)
    newNode.nextNode = this.doubleLinkedList

    this.doubleLinkedList = newNode
    this.incrementIndexes()
  }

  /**
   * Set a node as the last value in the list
   */
  public set setLast(info: T) {
    if (this.isEmpty())
      this.setFirst = info
    else {
      // In this case we assign the index, previousNode and nextNode later when we find the last node
      // Assigning this values according to these node
      const newNode = new Node({info, previousNode: null, nextNode: null})

      let auxNode = this.doubleLinkedList // At the end of the loop will represent the last node in the list
      while (auxNode.nextNode != null)
        auxNode = auxNode.nextNode

      newNode.index = auxNode.index + 1
      newNode.previousNode = auxNode
      auxNode.nextNode = newNode
    }
  }

  /**
   * Insert a new node after the first node moving the rest of nodes 1 position to the right
   */
  public set setAfterFirst(info: T) {
    if (this.isEmpty())
      throw new PreviousIsNullError("Cannot add elements after the first element if the list is empty")

    /**
     *  * Index: We increment the index then, once the new node was added to the list
     *  * PreviousNode: Represents the first value in the list,
     *  * NexTNode: Represents the second value in the list, thats why we had checked if the list is empty at the begining of the method
     */
    const newNode = new Node({info, previousNode: this.doubleLinkedList, nextNode: this.doubleLinkedList.nextNode})

    if (newNode.nextNode != null)
      newNode.nextNode.previousNode = newNode

    this.doubleLinkedList.nextNode = newNode
    this.incrementIndexes()
  }

  public set setBeforeLast(info: T) {
    throw new Error("Method not implemented.")
  }

  /**
   * Returns the node that match with the indicated index
   * @param idx 
   * @returns 
   */
  public getByIdx(idx: number): INode<T> {
    let auxPtr = this.begin
    while (auxPtr.nextNode != null && auxPtr.index != idx)
      auxPtr = auxPtr.nextNode

    return auxPtr
  }

  public removeFirst(): INode<T> {
    throw new Error("Method not implemented.")
  }

  public removeLast(): INode<T> {
    throw new Error("Method not implemented.")
  }

  public removeByIdx(idx: number): INode<T> {
    throw new Error("Method not implemented.")
  }

  public count(): number {
    let nodesCounter = 0
    if (!this.isEmpty()) {
      let nextNode = this.begin.nextNode
      for (; nextNode != null; nodesCounter++)
        nextNode = nextNode.nextNode

      nodesCounter += 1 // Needs to plus 1 because we got 1 node outside the loop that was not counted
    }
    
    return nodesCounter
  }

  public isEmpty(): boolean {
    return this.doubleLinkedList == undefined
  }

  public isFirst(node: INode<T>): boolean {
    return node.previousNode == null
  }

  public isLast(node: INode<T>): boolean {
    return node.nextNode == null
  }

  public traverse(): T[] {
    throw new Error("Method not implemented.")
  }

  recurseTraverse(): T[] {
    throw new Error("Method not implemented.")
  }

  /**
   * Shorthand method to `DoubleLinkedList.prototype.start`
   */
  public get getFirst(): INode<T> {
    return this.begin
  }

  /**
   * Iterate over all the list until finds the last node returning it
   */
  public get getLast(): INode<T> {
    let lastNode = this.doubleLinkedList
    while (lastNode.nextNode) {
      lastNode = lastNode.nextNode
    }
    
    return lastNode
  }

  /**
   * Returns the first element in the list
   * 
   * That is the same that returns the Linked List
   */
  public get begin(): INode<T> {
    return this.doubleLinkedList
  }
}