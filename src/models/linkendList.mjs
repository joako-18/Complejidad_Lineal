import Node from "./node.mjs";
import City from "./City.mjs";

export default class LinkedList{
    #head
    #count
    constructor(){
        this.#head = null
        this.#count = 0
    }

    push(city, distance){
        let city = new City(city,distance)
        let node = new Node(city)
        if(this.#head == null)
            this.#head = node
        else{
            let current = this.#head
            while(current.next != null){
                current = current.next
                current.next = node
            }
        }
        this.#count++
    }

    size(){
        return this.#count
    }

    inEmpty(){
        return (this.#head == null) ? true : false
    }

    getElementAt(index){
        if(index >= 0 && index < this.#count){
            let node = this.#head;
            for(let i=0; i<index && node != null;i++){
                node = node.next;
                return node;
            }
            return null;
        }
    }
}