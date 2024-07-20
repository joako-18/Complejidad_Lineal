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
        const [sortedHead, newIterations] = this.mergeSortRecursive(this.head);
        this.head = sortedHead;
        iterations += newIterations;
        return iterations;
    }

    mergeSortRecursive(head) {
        if (!head || !head.next) {
            return [head, 0];
        }
        const middle = this.getMiddle(head);
        const nextOfMiddle = middle.next;
        middle.next = null;

        const [left, leftIterations] = this.mergeSortRecursive(head);
        const [right, rightIterations] = this.mergeSortRecursive(nextOfMiddle);

        const [sortedHead, mergeIterations] = this.sortedMerge(left, right);
        return [sortedHead, leftIterations + rightIterations + mergeIterations];
    }

    getMiddle(head) {
        if (!head) return head;
        let slow = head, fast = head;
        while (fast.next && fast.next.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    sortedMerge(a, b) {
        if (!a) return [b, 0];
        if (!b) return [a, 0];

        let result;
        let iterations = 0;
        if (a.data.id <= b.data.id) {
            result = a;
            const [next, newIterations] = this.sortedMerge(a.next, b);
            result.next = next;
            iterations += newIterations;
        } else {
            result = b;
            const [next, newIterations] = this.sortedMerge(a, b.next);
            result.next = next;
            iterations += newIterations;
        }
        iterations++;
        return [result, iterations];
    }

    getMax() {
        let max = this.head ? this.head.data.id : 0;
        let current = this.head;
        while (current) {
            if (current.data.id > max) {
                max = current.data.id;
            }
            current = current.next;
        }
        return max;
    }

    radixSort() {
        const max = this.getMax();
        let exp = 1;
        let iterations = 0;
        while (Math.floor(max / exp) > 0) {
            iterations += this.countSort(exp);
            exp *= 10;
        }
        return iterations;
    }

    countSort(exp) {
        const output = [];
        const count = Array(10).fill(0);
        let iterations = 0;

        let current = this.head;
        while (current) {
            const index = Math.floor(current.data.id / exp) % 10;
            count[index]++;
            current = current.next;
            iterations++;
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
            iterations++;
        }

        current = this.head;
        while (current) {
            const index = Math.floor(current.data.id / exp) % 10;
            output[count[index] - 1] = current.data;
            count[index]--;
            current = current.next;
            iterations++;
        }

        current = this.head;
        let i = 0;
        while (current) {
            current.data = output[i];
            current = current.next;
            i++;
            iterations++;
        }

        return iterations;
    }
}
