export default class LinkedListMix {
    constructor() {
        this.head = null;
    }

    insert(business) {
        const newNode = { data: business, next: null };
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    linearSearch(id) {
        let current = this.head;
        while (current) {
            if (current.data.id === id) {
                return current.data;
            }
            current = current.next;
        }
        return null;
    }

    bubbleSort() {
        let iterations = 0;
        let swapped;
        do {
            swapped = false;
            let current = this.head;
            while (current && current.next) {
                iterations++;
                if (current.data.id > current.next.data.id) {
                    [current.data, current.next.data] = [current.next.data, current.data];
                    swapped = true;
                }
                current = current.next;
            }
        } while (swapped);
        return iterations;
    }

    mergeSort() {
        let iterations = 0;

        const merge = (left, right) => {
            let result = null;

            if (!left) return right;
            if (!right) return left;

            iterations++;

            if (left.data.id <= right.data.id) {
                result = left;
                result.next = merge(left.next, right);
            } else {
                result = right;
                result.next = merge(left, right.next);
            }

            return result;
        };

        const mergeSortRecursive = (node) => {
            if (!node || !node.next) {
                return node;
            }

            let middle = getMiddle(node);
            let nextToMiddle = middle.next;

            middle.next = null;

            let left = mergeSortRecursive(node);
            let right = mergeSortRecursive(nextToMiddle);

            return merge(left, right);
        };

        const getMiddle = (node) => {
            if (!node) return node;
            let slow = node;
            let fast = node.next;

            while (fast !== null) {
                fast = fast.next;
                if (fast !== null) {
                    slow = slow.next;
                    fast = fast.next;
                }
            }
            return slow;
        };

        this.head = mergeSortRecursive(this.head);
        return iterations;
    }

    radixSort() {
        // Radix sort is generally not implemented for linked lists due to its complexity with non-array structures.
        return 0;
    }
}