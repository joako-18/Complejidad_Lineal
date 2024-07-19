// src/model/Array.mjs
export default class ArrayListMix {
    constructor() {
        this.items = [];
    }

    insert(item) {
        this.items.push(item);
    }

    toNumber(business) {
        if (typeof business !== 'string' || business === undefined) {
            return 0; // Devuelve un valor por defecto si el business no es una cadena
        }
        return business
            .split("")
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }

    linearSearch(target) {
        return this.items.find(item => item.business === target);
    }

    bubbleSort() {
        let len = this.items.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (this.items[j].business > this.items[j + 1].business) {
                    [this.items[j], this.items[j + 1]] = [this.items[j + 1], this.items[j]];
                }
            }
        }
        return this.items;
    }

    mergeSort(arr = this.items) {
        if (arr.length <= 1) {
            return arr;
        }
        const middle = Math.floor(arr.length / 2);
        const left = arr.slice(0, middle);
        const right = arr.slice(middle);

        return this.merge(this.mergeSort(left), this.mergeSort(right));
    }

    merge(left, right) {
        let resultArray = [], leftIndex = 0, rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex].business < right[rightIndex].business) {
                resultArray.push(left[leftIndex]);
                leftIndex++;
            } else {
                resultArray.push(right[rightIndex]);
                rightIndex++;
            }
        }

        return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
    }

    radixSort() {
        let maxLength = Math.max(...this.items.map(item => this.toNumber(item.business).toString().length));
        let buckets = Array.from({ length: 10 }, () => []);

        for (let i = 0; i < maxLength; i++) {
            while (this.items.length) {
                let temp = this.items.shift();
                let tempNumber = this.toNumber(temp.business);
                let digit = Math.floor(tempNumber / Math.pow(10, i)) % 10;
                buckets[digit].push(temp);
            }

            for (let j = 0; j < 10; j++) {
                while (buckets[j].length) {
                    this.items.push(buckets[j].shift());
                }
            }
        }

        return this.items;
    }
}