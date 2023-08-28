
/***
 * author: Clency Tabe & Glenn Yeap
 * date: 2020-10-20
 * description: This is a simple implementation of the Timsort algorithm
 *             in JavaScript. The code is heavily commented to make it
 *            easier to understand.
*/


// width of each bar is taken as 8.
let values = [];
// The array 'states' helps in identifying the pivot index
// at every step, and also the subarray which is being sorted
// at any given time. 
let states = [];

const MIN_MERGE = 8;

const sort = document.getElementById('sort');

let sorted = false;

sort.addEventListener('click', function () {
  if (sorted) {
    shuffleBars();
  }
  TimsSort();
});

// shuffle function
function shuffleBars() {
  for (let i = 0; i < values.length; i++) {
    values[i] = random(20, height);
    states[i] = -1;
  }
}


// The setup() function is called once when the program 
// starts. Here, we fill the array 'values' with random values
// and the array 'states' with a value of -1 for each position.
function setup() {
  createCanvas(1000, 500);
  for (let i = 0; i < width / 50; i++) {
    values[i] = random(20, height);
    states[i] = -1;
  }
}


// The statements in draw() function are executed continuously
// until the program is stopped. Each statement is executed
// sequentially and after the last line is read, the first
// line is executed again.
function draw() {
  background('#0C0C0C');
  for (let i = 0; i < values.length; i++) {
    // color coding
    if (states[i] == 0) {
      fill('#990000');
    } else if (states[i] == 1) {
      fill('#88E904');
    } else {
      fill(255);
    }
    rect(i * 50, height - values[i], 50, values[i]);
  }
}

async function TimsSort() {

  sort.disabled = true;

  for (let start = 0; start < values.length; start += MIN_MERGE) {
    let end = Math.min((start + MIN_MERGE - 1), (values.length - 1));
    await insertionSort(start, end);
  }

  merge(0, values.length - 1);

  sorted = true;
  sort.disabled = false;
}

// function to set state
async function setState(index, state) {
  await sleep(200);
  states[index] = state;
}

// get min run funtion
function minRunLength(n) {

  // Becomes 1 if any 1 bits are shifted off
  let r = 0;
  while (n >= MIN_MERGE) {
    r |= (n & 1);
    n >>= 1;
  }
  return n + r;
}

// The insertion sort algorithm
async function insertionSort(start, end) {
  for (let i = start; i <= end; i++) {


    let j = i;

    while (j > start && values[j] < values[j - 1]) {

      setState(j - 1, 0);
      await sleep(500);
      setState(j, 1);
      await sleep(500);

      // swap
      swap(j, j - 1);


      setState(j - 2, -1);
      await sleep(500);

      j--;
    }
    await sleep(500);
    setState(j - 1, 1);
    await sleep(500);

    await sleep(500);
    setState(j - 1, -1);
    await sleep(500);

    setState(j, -1);
    await sleep(500);

  }
}

// swap function
async function swap(a, b) {

  let temp = values[a];
  values[a] = values[b];
  values[b] = temp;

  let tempState = states[a];
  states[a] = states[b];
  states[b] = tempState;

  states[a] = -1;
  await sleep(500);
}

// merge function
async function merge(low, high) {
  if (low < high) {
    let mid = Math.floor((low + high) / 2);
    await merge(low, mid);
    await merge(mid + 1, high);
    await mergeSort(low, mid, high);
  }
}

// a merge sort function
async function mergeSort(low, mid, high) {
  let n1 = mid - low + 1;
  let n2 = high - mid;

  let left = [];
  let right = [];

  for (let i = 0; i < n1; i++) {
    left[i] = values[low + i];
  }
  for (let j = 0; j < n2; j++) {
    right[j] = values[mid + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = low;

  while (i < n1 && j < n2) {
    if (left[i] <= right[j]) {
      setState(k, 1);
      await sleep(100);
      setState(i, 0);
      await sleep(100);

      values[k] = left[i];

      setState(k, -1);
      await sleep(100);
      setState(i, -1);
      await sleep(100);
      i++;
    } else {
      setState(k, 1);
      await sleep(100);
      setState(i, 0);
      await sleep(100);

      values[k] = right[j];

      setState(k, -1);
      await sleep(100);
      setState(j, -1);
      await sleep(100);
      j++;
    }
    k++;

  }

  while (i < n1) {

    setState(k, 0);
    await sleep(100);
    setState(i, 1);
    await sleep(100);

    values[k] = left[i];

    setState(k, -1);
    await sleep(100);
    setState(i, -1);
    await sleep(100);

    i++;
    k++;
  }

  while (j < n2) {
    setState(k, 0);
    await sleep(100);
    setState(j, 1);
    await sleep(100);

    values[k] = right[j];

    setState(k, -1);
    await sleep(100);
    setState(j, -1);
    await sleep(100);
    j++;
    k++;
  }
}

// custom helper function to deliberately slow down
// the sorting process and make visualization easy
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}