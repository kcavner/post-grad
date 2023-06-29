class Node {
    constructor(value){
        this.value = value
        this.next = null
    }
}
class LinkedList {
    constructor() {
        this.head = null
        this.size = 0
    }
    isEmpty() {
       return this.size === 0
    }
    getSize(){
        return this.size
    }
    prepend(value){
        const node = new Node(value)
        if(this.isEmpty()){
            this.head = node
        } else{
            node.next = this.head
            this.head = node
        }
        this.size++
    
    }
    arrayPrepend(array){
        const list = new LinkedList()
        for (let i=0;i<array.length;i++){
            
            list.prepend(array[i])
        }
        list.print()
    }
    print(){
        if(this.isEmpty()){
            console.log('empty')
        }else {
            let curr = this.head
            let listValues = ''
            while(curr){
                listValues += `${curr.value} `
                curr = curr.next
            }
            console.log(listValues)
        }
    }
}
const list =  new LinkedList()

const nodeArray = [1,2,3,4]
console.log(list.arrayPrepend(nodeArray))

module.exports = {LinkedList,Node}
