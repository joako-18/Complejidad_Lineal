export default class ArrayListMix {
    constructor() {
        this.array = [];
    }

    insert(business) {
        this.array.push(business);
    }

    linearSearch(id) {
        for (const business of this.array) {
            if (business.id === id) {
                return business;
            }
        }
        return null;
    }

    bubbleSort() {
        let iterations = 0;
        let n = this.array.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < n - 1; i++) {
                iterations++;
                if (this.array[i].id > this.array[i + 1].id) {
                    [this.array[i], this.array[i + 1]] = [this.array[i + 1], this.array[i]];
                    swapped = true;
                }
            }
            n--;
        } while (swapped);
        return iterations;
    }

    mergeSort() {
        let iterations = 0;

        const merge = (left, right) => {
            let result = [];
            let leftIndex = 0;
            let rightIndex = 0;

            while (leftIndex < left.length && rightIndex < right.length) {
                iterations++;
                if (left[leftIndex].id < right[rightIndex].id) {
                    result.push(left[leftIndex]);
                    leftIndex++;
                } else {
                    result.push(right[rightIndex]);
                    rightIndex++;
                }
            }

            return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
        };

        const mergeSortRecursive = (array) => {
            if (array.length <= 1) {
                return array;
            }

            const middle = Math.floor(array.length / 2);
            const left = array.slice(0, middle);
            const right = array.slice(middle);

            return merge(mergeSortRecursive(left), mergeSortRecursive(right));
        };

        this.array = mergeSortRecursive(this.array);
        return iterations;
    }

    radixSort() {
        let iterations = 0;
        const getMax = (arr) => {
            let max = arr[0].id;
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].id > max) {
                    max = arr[i].id;
                }
            }
            return max;
        };

        const countingSort = (arr, exp) => {
            let output = new Array(arr.length).fill(0);
            let count = new Array(10).fill(0);

            for (let i = 0; i < arr.length; i++) {
                iterations++;
                count[Math.floor(arr[i].id / exp) % 10]++;
            }

            for (let i = 1; i < 10; i++) {
                count[i] += count[i - 1];
            }

            for (let i = arr.length - 1; i >= 0; i--) {
                iterations++;
                output[count[Math.floor(arr[i].id / exp) % 10] - 1] = arr[i];
                count[Math.floor(arr[i].id / exp) % 10]--;
            }

            for (let i = 0; i < arr.length; i++) {
                arr[i] = output[i];
            }
        };

        let max = getMax(this.array);

        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            countingSort(this.array, exp);
        }

        return iterations;
    }
}