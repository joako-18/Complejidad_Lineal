import ArrayListMix from '../models/Array.mjs';
import ArrayListMix from '../models/Array.mjs';
import Business from '../models/Business.mjs';

const rootElement = document.getElementById("list-bussines");

const arrayListInstance = new ArrayListMix();
const linkedListInstance = new LinkedListMix();

fetch("/bussines.json")
    .then((response) => response.json())
    .then((businessData) => {
        console.log("Starting ArrayList insertion...");
        const arrayStartTime = performance.now();
        const slicedData = businessData.slice(0, 20000);
        for (const item of slicedData) {
            const businessEntity = new Business(item.business, item.name, item.address, item.city, item.state);
            arrayListInstance.insert(businessEntity);
        }
        const arrayEndTime = performance.now();
        console.log(`ArrayList insertion time: ${arrayEndTime - arrayStartTime} ms`);

        console.log("Starting LinkedList insertion...");
        const linkedListStartTime = performance.now();
        for (const item of slicedData) {
            const businessEntity = new Business(item.business, item.name, item.address, item.city, item.state);
            linkedListInstance.insert(businessEntity);
        }
        const linkedListEndTime = performance.now();
        console.log(`LinkedList insertion time: ${linkedListEndTime - linkedListStartTime} ms`);

        for (let i = 0; i < 100; i++) {
            const listItem = document.createElement("li");
            listItem.textContent = businessData[i].name;
            rootElement.appendChild(listItem);
        }

        const searchTarget = "mWMc6_wTdE0EUBKIGXDVfA";
        console.log("Linear search in ArrayList:", arrayListInstance.linearSearch(searchTarget));
        console.log("Linear search in LinkedList:", linkedListInstance.linearSearch(searchTarget));

        console.log("Bubble Sort Array:", arrayListInstance.bubbleSort());
        console.log("Bubble Sort LinkedList:", linkedListInstance.bubbleSort());

        console.log("Merge Sort ArrayListMix:", arrayListInstance.mergeSort());
        console.log("Merge Sort LinkedListMix:", linkedListInstance.mergeSort());

        console.log("Radix Sort Array:", arrayListInstance.radixSort());
        console.log("Radix Sort LinkedList:", linkedListInstance.radixSort());
    })
    .catch((error) => console.error("Error loading or processing data:", error));