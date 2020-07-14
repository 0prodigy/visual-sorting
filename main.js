let time = 20;
let Arr = [];
let delay = document.getElementById("delay");
let delayTime = document.getElementById("delayTime");

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

delay.oninput = function () {
  time = delay.value;
  delayTime.innerHTML = time;
};

function renderArr(arr) {
  let row = document.querySelector(".row");
  row.innerHTML = "";
  //   row.style.display = "flex";
  row.setAttribute("style", "display:flex;");
  for (let i = 0; i < arr.length; i++) {
    let colParent = document.createElement("div");
    let col = document.createElement("div");
    col.setAttribute("style", `height:${arr[i] + 10}px; postion:relative; `);
    // col.style.order = i;
    col.style.width = `${(1000 / arr.length) % 80}px`;
    // col.style.border = "2px solid #fff";
    // col.textContent = arr[i];
    // col.style.fontSize = "10px";
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

async function bubbleSort(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 1; j <= i; j++) {
      if (arr[j - 1] > arr[j]) {
        swapIndex(arr, j, j - 1);
        renderArr(arr);
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
    renderArr(arr);
    await sleep(time);
  }
  return arr;
}

async function quickSort(arr) {
  await sort(arr, 0, arr.length - 1);

  async function sort(arr, low, high) {
    if (low < high) {
      renderArr(arr);
      let index = await partition(arr, low, high);
      await sort(arr, low, index - 1);
      await sort(arr, index + 1, high);
    }
    renderArr(arr);
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
        renderArr(arr);
        await sleep(time);
      }
    }

    await swapIndex(arr, i, high);
    renderArr(arr);
    await sleep(time);
    return Promise.resolve(i);
  }
}

async function mergeSort(arr) {
  await sort(arr, 0, arr.length);
  async function sort(arr, low, high) {
    if (low < high) {
      let mid = Math.floor((low + high) / 2);
      await sort(arr, low, mid);
      await sort(arr, mid + 1, high);
      await merge(arr, low, mid, high);
    } else {
      return Promise.resolve();
    }
  }

  async function merge(arr, low, mid, high) {
    let left = arr.slice(low, mid + 1);
    let right = arr.slice(mid + 1, high + 1);
    let res = [];
    while (left.length > 0 && right.length > 0) {
      res.push(left[0] > right[0] ? right.shift() : left.shift());
    }
    if (left.length == 0) {
      res.push(...right);
    } else {
      res.push(...left);
    }
    renderArr(arr);
    await sleep(time);
    res.forEach(async (num) => {
      await (arr[low++] = num);
      renderArr(arr);
      await sleep(time);
    });
  }
  return Promise.resolve(arr);
}

// console.log(mergeSort([9, 8, 7, 6, 5, 4, 3, 2, 1]));
let inputBtn = document.getElementById("input-btn");
let inputBox = document.getElementById("input-box");
let hide = document.getElementById("hide");

inputBtn.addEventListener("click", () => {
  inputBox.classList.add("search-box-show");
});

hide.addEventListener("click", () => {
  inputBox.setAttribute("class", "");
});

function randomArr(input) {
  Arr = [];
  for (let i = 0; i < input; i++) {
    Arr.push(Math.floor(Math.random() * 350));
  }
  renderArr(Arr);
}

window.onload = () => {
  let randomArrBtn = document.getElementById("randomArr");
  let size = document.getElementById("len");
  randomArrBtn.addEventListener("click", () => {
    // console.log(size.value);
    randomArr(size.value);
  });
  randomArr(100);
};
