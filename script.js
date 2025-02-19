//on button click, grab url and then run it
const contentBox = document.getElementById('content-box');

function decryptUrl() {
    let encodedURL = document.getElementById("urlBox").value;
    fetch(encodedURL)
    .then(response => response.text())
    .then(html => {
        let parser = new DOMParser;
        let doc = parser.parseFromString(html, "text/html");
        
        //grab table from url
        let table = doc.querySelector("tbody");
        
        //for each row, get x, y, and char
        let rows = Array.from(table.querySelectorAll("tr"));
        rows.splice(0,1); //take out header row
        let blocks = [];
        let highestY = 0;
        let highestX = 0;


    rows.forEach(row => {
        let newBlock = [];
        let rowData = row.querySelectorAll("td p span");
        let xPos = rowData[0].innerHTML;
        if (xPos > highestX) {  
            highestX = xPos;
        }
        
        let char = rowData[1].innerHTML;
        let yPos = rowData[2].innerHTML;
        if (yPos > highestY) {  
            highestY = yPos;
        }
        newBlock.push(xPos, yPos, char);
        blocks.push(newBlock);
    });

    //create grid
    let i = highestY;
    let grid = [];
    while (i >= 0) {
        grid.push([]);
        i--;
    }
    
    grid.forEach(row => {
        let j = highestX;
        while (j >= 0) {
            row.push([]);
            j--;
        }
    });
    
    //add each char at their x and y in grid
    blocks.forEach(block => {
        let blockX = block[0];
        let blockY = block[1];
        let blockChar = block[2];
        grid[blockY][blockX].push(blockChar);
    });
    grid.reverse();
    
    //if nothing in column, add a space
    grid.forEach(row => {
        row.forEach(col => {
            if (col.length == 0) {
                col.push(" ");
            }
        });
    });

    grid.forEach(row => {
        let divRow = document.createElement('div');
        divRow.classList.add('row');
        row.forEach(col => {
            let newCol = document.createElement('p');
            newCol.textContent = col;
            divRow.appendChild(newCol);
        });
        contentBox.appendChild(divRow);
    });
});
}

console.log("Thank you for your consideration!");