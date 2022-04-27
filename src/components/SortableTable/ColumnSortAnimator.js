// WIP

export default function ColumnSortAnimator(oldIndex, newIndex) {
  let start = Math.min(oldIndex, newIndex);
  let end = Math.max(oldIndex, newIndex);

  if(start === end) return;

  let moveDirection = Math.sign(oldIndex - newIndex);

  let elementWidths = new Array(end).fill(0);
  for(let i = start; i <= end; i++) {
    elementWidths[i] = document.querySelector(`th:nth-child(${i+1})`).clientWidth;
  }
  let offsetMain = 0;
  let offsetRest = 0;

  if(moveDirection > 0) {
    offsetMain = elementWidths.reduce(function(a,b) {return a+b}) - elementWidths[end];
    offsetRest = -elementWidths[newIndex];
  } else {
    offsetMain = -elementWidths.reduce(function(a,b,i) {return a+b}) + elementWidths[start];
    offsetRest = elementWidths[newIndex];
  }

  for(let i = start; i <= end; i++) {
    let affectedElements = document.querySelectorAll(`td:nth-child(${i+1})`);
    affectedElements.forEach(function(node) {
      node.style.transform = `translate3d(${i === newIndex ? offsetMain : offsetRest}px, 0px, 0px)`;
      node.style.transition = 'transform 0s ease';
    })
    setTimeout(function() {
      affectedElements.forEach(function(node) {
        node.style.transition = 'transform 0.2s ease-in';
        node.style.transform = 'translate3d(0px, 0px, 0px)';
      })
    }, 1);
  }
}