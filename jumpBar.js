
const jumpBar = document.querySelector('.jump-bar');
const numBars = 10;

for (let i = 1; i <= numBars; i++) {
    const bar = document.createElement('div');
    jumpBar.appendChild(bar);
}
