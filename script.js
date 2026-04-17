document.addEventListener("mousemove", function(e) {
  const x = (window.innerWidth / 2 - e.pageX) / 50;
  const y = (window.innerHeight / 2 - e.pageY) / 50;
  document.body.style.backgroundPosition = x + "px " + y + "px";
});