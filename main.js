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
let sortBtn = document.getElementById("sort");
sortBtn.addEventListener("click", () => {
  let arr = inputArr.value;
  arr = arr.trim().split(" ").map(Number);
  Arr = arr;
  renderArr(arr);
});

function renderArr(arr) {
  let row = document.querySelector(".row");
  row.innerHTML = "";
  //   row.style.display = "flex";
  row.setAttribute("style", "display:flex; align-items:center;");
  for (let i = 0; i < arr.length; i++) {
    let colParent = document.createElement("div");
    let col = document.createElement("div");
    col.setAttribute("style", `height:${arr[i]}px; postion:relative; `);
    // col.style.order = i;
    if (arr.length > 15) {
      col.style.padding = `${(700 / arr.length) % 10}px`;
      // col.style.border = "2px solid #fff";
    } else {
      col.style.padding = `${(700 / arr.length) % 20}px`;
      col.textContent = arr[i];
    }
    col.style.fontSize = "10px";
    col.style.color = "#fff";
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

async function quickSort(arr) {
  await sort(arr, 0, arr.length - 1);

  async function sort(arr, low, high) {
    if (low < high) {
      await renderArr(arr);
      let index = await partition(arr, low, high);
      await sort(arr, low, index - 1);
      await sort(arr, index + 1, high);
    }
    await renderArr(arr);
    return Promise.resolve();
  }

  async function partition(arr, low, high) {
    let i = low;
    let j = high;
    let pivot = arr[high];
    while (i < j) {
      while (arr[j] >= pivot && j > 0) {
        j--;
      }
      while (arr[i] < pivot && i < high) {
        i++;
      }
      if (i < j) {
        await swapIndex(arr, i, j);
        await renderArr(arr);
        await sleep(time);
      }
    }

    await swapIndex(arr, i, high);
    await renderArr(arr);
    await sleep(time);
    return Promise.resolve(i);
  }
}
