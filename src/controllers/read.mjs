let root = document.getElementById("list-bussines")
fetch("./bussines.json")
.then(response => response.json())
.then(data => {
    for (let x=0;x<100;x++) {
        let item = document.createElement("li");
        item.textContent = data[x].name;
        root.appendChild(item)
    }
})
.catch(err => console.log(err))