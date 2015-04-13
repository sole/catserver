window.onload = function() {
  var cute = document.getElementById('cute');
  var images = [
    'catball.gif',
    'catfinity.gif',
    'catbrace.gif',
    'catcham.gif',
    'catdance.gif'
  ];
  var lastIndex = 0;

  cute.addEventListener('click', function() {
    loadNextImage();
  }, false);

  loadNextImage();

  function getNextIndex() {
    return (lastIndex + 1) % images.length;
  }

  function loadNextImage() {

    index = getNextIndex();
    lastIndex = index;
    console.log('load', images[index]);

    cute.style.backgroundImage = 'url(cute_images/' + images[index] + ')';

  }


};

