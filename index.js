let input = document.querySelector('.circle');
let overlay = document.querySelector('.overlay');
let createBtn = document.querySelector(".create");
let inputFileds = document.querySelectorAll('input');
let cancelBtn = document.querySelector('.cancle');
let container = document.querySelector('.container');
let containerDiv = '';
let deleteBtn = [];
// function create
function createBox() {
    containerDiv = document.querySelectorAll('.container > div');
    let name = '';
    let link = '';
    for (let i = 0; i < containerDiv.length - 1;i++){
        containerDiv[i].remove();
    }
    let listValue = JSON.parse(window.localStorage.getItem('list'));
    for (let i = 0; i < window.localStorage.length-1; i++){
        name = listValue[i];
        link = window.localStorage.getItem(name);
        let div = document.createElement('div');
        let h1 = document.createElement('h1');
        let a = document.createElement('a');
        let trash = document.createElement('i');
        h1.innerText = name;
        a.innerText = 'الرابط';
        a.href = link;
        a.target = '_blank';
        trash.className = "fa-regular fa-trash-can";
        container.prepend(div);
        div.append(h1);
        div.append(a);
        div.append(trash);
    }
    deleteBtn = document.querySelectorAll("i");
    containerDiv = document.querySelectorAll(".container > div");

}

// onclicking the plus button (adding a student)
input.onclick = function () {
    overlay.style.display = 'block';
    document.body.style.overflow = "hidden";
}
if (!window.localStorage.getItem('list')) {
    window.localStorage.setItem("list", JSON.stringify([]));
}
else {
    createBox();
}
// onclicking create button
createBtn.onclick = function () {
    let x = '';
    let array = JSON.parse(window.localStorage.getItem("list"));
    inputFileds.forEach(function (e) {
        if (e.value == '') {
            x = false;
        }
        else {
            x = true;
        }
    })
    if (x) {
        array.push(inputFileds[0].value);
        let newValue = [...new Set(array)];
        window.localStorage.setItem('list', JSON.stringify(newValue));
        window.localStorage.setItem(`${inputFileds[0].value}`, `${inputFileds[1].value}`);
        createBox();
        overlay.style.display = 'none';
        document.body.style.overflow = "auto";
        location.reload();
    }
    else {
        createBtn.style.animationName = "reject";
        setTimeout(() => (createBtn.style.animationName = ""), 300);
    }
}

// onclicking cancel button

cancelBtn.onclick = function () {
    overlay.style.display = 'none';
    document.body.style.overflow = "auto";
}
let h1 = document.querySelectorAll('div > h1');
// trash Btn click
deleteBtn.forEach(function (e, i) {
    e.onclick = function () {
        let array = JSON.parse(window.localStorage.getItem("list"));
        let indexNum = array.indexOf(h1[i].innerText);
        array.splice(indexNum, 1);
        window.localStorage.setItem("list", JSON.stringify(array));
        window.localStorage.removeItem(h1[i].innerText);
        createBox();
        location.reload();
    }
})
