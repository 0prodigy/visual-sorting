let time = 200;
let Arr = [];
let inputArr = document.getElementById("arr");
inputArr.addEventListener("keydown", () => {
  if (event.keyCode == 13) {
    let arr = inputArr.value;
    arr = arr.trim().split(" ").map(Number);
    Arr = arr;
    renderArr(arr);
  }
});

function renderArr(arr) {
  let row = document.querySelector(".row");
  row.innerHTML = "";
  //   row.style.display = "flex";
  row.setAttribute("style", "display:flex; align-items:center;");
  for (let i = 0; i < arr.length; i++) {
    let colParent = document.createElement("div");
    let col = document.createElement("div");
    col.setAttribute(
      "style",
      `height:${arr[i]}px; postion:relative; padding: ${700 / arr.length / 2}px`
    );
    // col.style.order = i;
    // col.style.padding = `0px  ${700 / arr.length / 2}px`;
    // col.style.border = "2px solid #fff";
    colParent.append(col);
    row.append(colParent);
  }
  // console.log(arr);
}
