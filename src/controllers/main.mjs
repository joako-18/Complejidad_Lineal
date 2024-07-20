import ArrayListMix from '../models/Array.mjs';
import LinkedListMix from '../models/LinkedList.mjs';
import Business from '../models/Business.mjs';

document.addEventListener('DOMContentLoaded', (event) => {
    const arrayListInstance = new ArrayListMix();
    const linkedListInstance = new LinkedListMix();

    let arrayListData = [];
    let linkedListData = [];

    fetch("/bussines.json")
        .then((response) => response.json())
        .then((businessData) => {
            const slicedData = businessData.slice(0, 20000);

            document.getElementById("list-business").addEventListener("click", () => {
                arrayListData = [];
                linkedListData = [];
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
                    arrayListData.push(businessEntity); // Store in array
                }
                const arrayEndTime = performance.now();
                const arrayInsertionTime = arrayEndTime - arrayStartTime;
                console.log(`ArrayList insertion time: ${arrayInsertionTime} ms`);

                console.log("Starting LinkedList insertion...");
                const linkedListStartTime = performance.now();
                for (const item of data) {
                    const businessEntity = new Business(item.business, item.name, item.address, item.city, item.state);
                    linkedListInstance.insert(businessEntity);
                    linkedListData.push(businessEntity); // Store in linked list
                }
                const linkedListEndTime = performance.now();
                const linkedListInsertionTime = linkedListEndTime - linkedListStartTime;
                console.log(`LinkedList insertion time: ${linkedListInsertionTime} ms`);

                updateChart('myChart', 'Insertion Time', [linkedListInsertionTime, arrayInsertionTime]);
            }

            function searchById(id) {
                console.log("Starting search...");
                const resultContainer = document.getElementById('search-results');
                resultContainer.innerHTML = ''; // Clear previous results

                const arraySearchStartTime = performance.now();
                const arrayResult = arrayListData.find(item => item.id === id);
                const arraySearchEndTime = performance.now();
                const arraySearchTime = arraySearchEndTime - arraySearchStartTime;
                console.log(`ArrayList search time: ${arraySearchTime} ms`);

                const linkedListSearchStartTime = performance.now();
                const linkedListResult = linkedListData.find(item => item.id === id);
                const linkedListSearchEndTime = performance.now();
                const linkedListSearchTime = linkedListSearchEndTime - linkedListSearchStartTime;
                console.log(`LinkedList search time: ${linkedListSearchTime} ms`);

                // Display search results
                if (arrayResult) {
                    resultContainer.innerHTML += `<div><h2>ArrayList Result:</h2><p>ID: ${arrayResult.id}</p><p>Name: ${arrayResult.name}</p><p>Address: ${arrayResult.address}</p><p>City: ${arrayResult.city}</p><p>State: ${arrayResult.state}</p></div>`;
                } else {
                    resultContainer.innerHTML += '<div><p>No result found in ArrayList.</p></div>';
                }

                if (linkedListResult) {
                    resultContainer.innerHTML += `<div><h2>LinkedList Result:</h2><p>ID: ${linkedListResult.id}</p><p>Name: ${linkedListResult.name}</p><p>Address: ${linkedListResult.address}</p><p>City: ${linkedListResult.city}</p><p>State: ${linkedListResult.state}</p></div>`;
                } else {
                    resultContainer.innerHTML += '<div><p>No result found in LinkedList.</p></div>';
                }

                updateChart('secondChart', 'Search Time', [linkedListSearchTime, arraySearchTime]);
            }

            function sortDatasets(algorithm) {
                switch (algorithm) {
                    case 'bubble':
                        console.log("Starting bubble sort...");

                        const arrayBubbleSortStartTime = performance.now();
                        const arrayBubbleSortIterations = arrayListInstance.bubbleSort();
                        const arrayBubbleSortEndTime = performance.now();
                        const arrayBubbleSortTime = arrayBubbleSortEndTime - arrayBubbleSortStartTime;
                        console.log(`ArrayList bubble sort time: ${arrayBubbleSortTime} ms`);

                        const linkedListBubbleSortStartTime = performance.now();
                        const linkedListBubbleSortIterations = linkedListInstance.bubbleSort();
                        const linkedListBubbleSortEndTime = performance.now();
                        const linkedListBubbleSortTime = linkedListBubbleSortEndTime - linkedListBubbleSortStartTime;
                        console.log(`LinkedList bubble sort time: ${linkedListBubbleSortTime} ms`);

                        updateChart('bubbleSortChart', 'Bubble Sort Time', [linkedListBubbleSortTime, arrayBubbleSortTime]);
                        updateChart('bubbleSortIterationsChart', 'Bubble Sort Iterations', [linkedListBubbleSortIterations, arrayBubbleSortIterations]);
                        break;

                    case 'merge':
                        console.log("Starting merge sort...");

                        const arrayMergeSortStartTime = performance.now();
                        const arrayMergeSortIterations = arrayListInstance.mergeSort();
                        const arrayMergeSortEndTime = performance.now();
                        const arrayMergeSortTime = arrayMergeSortEndTime - arrayMergeSortStartTime;
                        console.log(`ArrayList merge sort time: ${arrayMergeSortTime} ms`);

                        const linkedListMergeSortStartTime = performance.now();
                        const linkedListMergeSortIterations = linkedListInstance.mergeSort();
                        const linkedListMergeSortEndTime = performance.now();
                        const linkedListMergeSortTime = linkedListMergeSortEndTime - linkedListMergeSortStartTime;
                        console.log(`LinkedList merge sort time: ${linkedListMergeSortTime} ms`);

                        updateChart('mergeSortChart', 'Merge Sort Time', [linkedListMergeSortTime, arrayMergeSortTime]);
                        updateChart('mergeSortIterationsChart', 'Merge Sort Iterations', [linkedListMergeSortIterations, arrayMergeSortIterations]);
                        break;

                    case 'radix':
                        console.log("Starting radix sort...");

                        const arrayRadixSortStartTime = performance.now();
                        const arrayRadixSortIterations = arrayListInstance.radixSort();
                        const arrayRadixSortEndTime = performance.now();
                        const arrayRadixSortTime = arrayRadixSortEndTime - arrayRadixSortStartTime;
                        console.log(`ArrayList radix sort time: ${arrayRadixSortTime} ms`);

                        // Note: Radix sort is not implemented for linked lists in this example
                        const linkedListRadixSortTime = 0;
                        const linkedListRadixSortIterations = 0;

                        updateChart('radixSortChart', 'Radix Sort Time', [linkedListRadixSortTime, arrayRadixSortTime]);
                        updateChart('radixSortIterationsChart', 'Radix Sort Iterations', [linkedListRadixSortIterations, arrayRadixSortIterations]);
                        break;

                    default:
                        console.error(`Unknown sorting algorithm: ${algorithm}`);
                }
            }

            function updateChart(chartId, chartLabel, data) {
                const ctx = document.getElementById(chartId).getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['LinkedList', 'ArrayList'],
                        datasets: [{
                            label: chartLabel,
                            data: data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        })
        .catch((error) => {
            console.error('Error fetching business data:', error);
        });
});