var container = document.getElementById('container');
window.onload = function() {
  generateRandomString();
};

window.addEventListener("keyup", function(e) {
  console.log(container.textContent.charAt(0));
  if (e.key === 'Escape') {
    container.textContent = "";
  } else if (e.key === 'Backspace') {
    var str = container.textContent;
    container.textContent = str.substring(0, str.length - 1);
  } else {
    if (container.textContent.charAt(0) == e.key) {
      container.textContent = container.textContent.substring(1);
    } else {
      container.textContent += e.key;
    }
    generateRandomString();
  }
});

function generateRandomString() {
  var randomStringLength = Math.floor(Math.random() * 3) + 1; // Random length between 1 and 3
  var randomString = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz';
  for (var i = 0; i < randomStringLength; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  container.textContent += randomString;
}
