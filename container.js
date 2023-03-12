const container = document.getElementById('infinite-space');
let containerX = 0;
let containerY = 0;

// add event listener to handle scrolling
container.addEventListener('scroll', updatePosition);

// handle scrolling event
function updatePosition() {
  containerX = container.scrollLeft;
  containerY = container.scrollTop;
  updateTransform();
}

// update the position of the content inside the container div
function updateTransform() {
  container.style.transform = `translate(${containerX}px, ${containerY}px)`;
}