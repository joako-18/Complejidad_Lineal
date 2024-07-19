import ArrayListMix from '../models/Array.mjs';
import LinkedListMix from '../models/LinkedList.mjs';
import Business from '../models/Business.mjs';

document.addEventListener('DOMContentLoaded', (event) => {
    const arrayListInstance = new ArrayListMix();
    const linkedListInstance = new LinkedListMix();

    fetch("/bussines.json")
        .then((response) => response.json())
        .then((businessData) => {
            const slicedData = businessData.slice(0, 20000);

            document.getElementById("list-business").addEventListener("click", () => {
                insertDataset(slicedData);
            });

            document.getElementById("search-button").addEventListener("click", () => {
                const searchId = document.getElementById("search-id").value;
                searchById(searchId);
            });

            document.getElementById("bubble-sort-button").addEventListener("click", () => {
                sortDatasets('bubble');
            });

            document.getElementById("merge-sort-button").addEventListener("click", () => {
                sortDatasets('merge');
            });

            document.getElementById("radix-sort-button").addEventListener("click", () => {
                sortDatasets('radix');
            });

            function insertDataset(data) {
                console.log("Starting ArrayList insertion...");
                const arrayStartTime = performance.now();
                for (const item of data) {
                    const businessEntity = new Business(item.business, item.name, item.address, item.city, item.state);
                    arrayListInstance.insert(businessEntity);
                }
                const arrayEndTime = performance.now();
                const arrayInsertionTime = arrayEndTime - arrayStartTime;
                console.log(`ArrayList insertion time: ${arrayInsertionTime} ms`);

                console.log("Starting LinkedList insertion...");
                const linkedListStartTime = performance.now();
                for (const item of data) {
                    const businessEntity = new Business(item.business, item.name, item.address, item.city, item.state);
                    linkedListInstance.insert(businessEntity);
                }
                const linkedListEndTime = performance.now();
                const linkedListInsertionTime = linkedListEndTime - linkedListStartTime;
                console.log(`LinkedList insertion time: ${linkedListInsertionTime} ms`);

                updateChart('myChart', 'Insertion Time', [linkedListInsertionTime, arrayInsertionTime]);
            }

            function searchById(id) {
                console.log("Starting search...");
                const arraySearchStartTime = performance.now();
                const arrayResult = arrayListInstance.linearSearch(id);
                const arraySearchEndTime = performance.now();
                const arraySearchTime = arraySearchEndTime - arraySearchStartTime;
                console.log(`ArrayList search time: ${arraySearchTime} ms`);

                const linkedListSearchStartTime = performance.now();
                const linkedListResult = linkedListInstance.linearSearch(id);
                const linkedListSearchEndTime = performance.now();
                const linkedListSearchTime = linkedListSearchEndTime - linkedListSearchStartTime;
                console.log(`LinkedList search time: ${linkedListSearchTime} ms`);

                updateChart('secondChart', 'Search Time', [linkedListSearchTime, arraySearchTime]);
            }

            function sortDatasets(algorithm) {
                switch (algorithm) {
                    case 'bubble':
                        console.log("Starting bubble sort...");

                        const arrayBubbleSortStartTime = performance.now();
                        arrayListInstance.bubbleSort();
                        const arrayBubbleSortEndTime = performance.now();
                        const arrayBubbleSortTime = arrayBubbleSortEndTime - arrayBubbleSortStartTime;
                        console.log(`ArrayList bubble sort time: ${arrayBubbleSortTime} ms`);

                        const linkedListBubbleSortStartTime = performance.now();
                        linkedListInstance.bubbleSort();
                        const linkedListBubbleSortEndTime = performance.now();
                        const linkedListBubbleSortTime = linkedListBubbleSortEndTime - linkedListBubbleSortStartTime;
                        console.log(`LinkedList bubble sort time: ${linkedListBubbleSortTime} ms`);

                        updateChart('bubbleSortChart', 'Bubble Sort Time', [linkedListBubbleSortTime, arrayBubbleSortTime]);
                        break;

                    case 'merge':
                        console.log("Starting merge sort...");

                        const arrayMergeSortStartTime = performance.now();
                        arrayListInstance.mergeSort();
                        const arrayMergeSortEndTime = performance.now();
                        const arrayMergeSortTime = arrayMergeSortEndTime - arrayMergeSortStartTime;
                        console.log(`ArrayList merge sort time: ${arrayMergeSortTime} ms`);

                        const linkedListMergeSortStartTime = performance.now();
                        linkedListInstance.mergeSort();
                        const linkedListMergeSortEndTime = performance.now();
                        const linkedListMergeSortTime = linkedListMergeSortEndTime - linkedListMergeSortStartTime;
                        console.log(`LinkedList merge sort time: ${linkedListMergeSortTime} ms`);

                        updateChart('mergeSortChart', 'Merge Sort Time', [linkedListMergeSortTime, arrayMergeSortTime]);
                        break;

                    case 'radix':
                        console.log("Starting radix sort...");

                        const arrayRadixSortStartTime = performance.now();
                        arrayListInstance.radixSort();
                        const arrayRadixSortEndTime = performance.now();
                        const arrayRadixSortTime = arrayRadixSortEndTime - arrayRadixSortStartTime;
                        console.log(`ArrayList radix sort time: ${arrayRadixSortTime} ms`);

                        // Note: Radix sort is not implemented for linked lists in this example
                        const linkedListRadixSortTime = NaN;

                        updateChart('radixSortChart', 'Radix Sort Time', [linkedListRadixSortTime, arrayRadixSortTime]);
                        break;

                    default:
                        console.error('Unknown sorting algorithm:', algorithm);
                }
            }

            function updateChart(chartId, label, data) {
                const ctx = document.getElementById(chartId).getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['LinkedList', 'Array'],
                        datasets: [{
                            label: label,
                            data: data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)'
                            ],
                            borderWidth: 1.5
                        }]
                    }
                });
            }
        })
        .catch((error) => console.error("Error loading or processing data:", error));
});
