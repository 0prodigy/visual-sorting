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

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const swapIndex = (arr, i, j) => {
  let col = document.querySelectorAll(".row div");
  col[i].style.border = "5px solid red";
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
};

async function bubbelSort(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 1; j <= i; j++) {
      if (arr[j - 1] > arr[j]) {
        swapIndex(arr, j, j - 1);
        await renderArr(arr);
        await sleep(time);
      }
    }
  }
}

async function selectionSort(arr) {
  let minIdx;
  for (let i = 0; i < arr.length; i++) {
    minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    await swapIndex(arr, i, minIdx);
    await renderArr(arr);
    await sleep(time);
  }
  return arr;
}
