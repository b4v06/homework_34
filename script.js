const canvas = document.querySelector(".canvas");
const contextMenu = document.forms.contextMenu;
const updateButton = document.querySelector("#update");
const cancelButton = document.querySelector("#cancel");
let selectedCircle = null;

function createCircle(parent) {
    const circle = document.createElement("div");
    circle.className = "circle";
    parent.append(circle);

    circle.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        contextMenu.style.display = "flex";
        contextMenu.style.top = event.clientY + 10 + "px";
        contextMenu.style.left = event.clientX + 10 + "px";
        selectedCircle = circle;
    });

    circle.addEventListener("click", (event) => {
        selectedCircle = circle;
        tempSize = selectedCircle.style.width;
        tempSize = parseInt(tempSize);
        selectedCircle.style.opacity = 0.6;
        selectedCircle.addEventListener("mousemove", (event) => {
            selectedCircle.style.top = event.clientY - tempSize / 2 + 'px';
            selectedCircle.style.left = event.clientX - tempSize / 2 + 'px';
        });

        selectedCircle.addEventListener("click", (event) => {
            selectedCircle = null;
        });

        canvas.addEventListener("keydown", (event) => {
            if (event.key === 'Escape') {
                selectedCircle = null;
            }
        });
        
    })

    return circle;
}

canvas.addEventListener("dblclick", (event) => {
    const randomSize = Math.floor(Math.random() * 400) + 25;
    const randomColor = "#" + Math.floor(Math.random() * 999999);
    const circle = createCircle(canvas);
    circle.style.position = 'absolute';
    circle.style.top = event.clientY - randomSize / 2 + 'px';
    circle.style.left = event.clientX - randomSize / 2 + 'px';
    circle.style.height = randomSize + 'px';
    circle.style.width = randomSize + 'px';
    circle.style.backgroundColor = randomColor;
    console.log("Circle has been created!");
})

updateButton.addEventListener("click", (event) => {
    event.preventDefault();
    const userSize = contextMenu.querySelector("#size").value;
    const userColor = contextMenu.querySelector("#color").value;
    selectedCircle.style.height = userSize + 'px';
    selectedCircle.style.width = userSize + 'px';
    selectedCircle.style.backgroundColor = "#" + userColor;
    contextMenu.style.display = "none";
    selectedCircle = null;
});

cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    contextMenu.querySelector("#size").value = "";
    contextMenu.querySelector("#color").value = "";
});

canvas.addEventListener("keydown", (event) => {
    if (event.key === 'Escape') {
        contextMenu.style.display = "none";
    }
});

contextMenu.addEventListener("keydown", (event) => {
    if (event.key === 'Escape') {
        contextMenu.style.display = "none";
    }
});

