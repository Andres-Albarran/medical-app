// Initialize and add the map
function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("h5")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].classList.remove('hide');
      }
      else {
        li[i].classList.add('hide');
      }
    }
    if (!$('.searchList').not(".hide").length){
      $(".noResults").removeClass("hide");
    }
    else if ($('.searchList').not(".hide")){
      $(".noResults").addClass("hide");
    }
  }
  
  function myFunction2() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput2');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL2");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("h5")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].classList.remove('hide');
      }
      else {
        li[i].classList.add('hide');
      }
    }
    if (!$('.searchList').not(".hide").length){
      $(".noResults").removeClass("hide");
    }
    else if ($('.searchList').not(".hide")){
      $(".noResults").addClass("hide");
    }
  }

  // Get the button that opens the modal
  var btn = document.querySelectorAll("button.modal-button");
  
  // All page modals
  var modals = document.querySelectorAll('.modal');
  
  // Get the <span> element that closes the modal
  var spans = document.getElementsByClassName("close");
  
  // When the user clicks the button, open the modal
  for (var i = 0; i < btn.length; i++) {
   btn[i].onclick = function(e) {
      e.preventDefault();
      modal = document.querySelector(e.target.getAttribute("href"));
      modal.style.display = "block";
   }
  }
  
  // When the user clicks on <span> (x), close the modal
  for (var i = 0; i < spans.length; i++) {
   spans[i].onclick = function() {
      for (var index in modals) {
        if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
      }
   }
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target.classList.contains('modal')) {
       for (var index in modals) {
        if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
       }
      }
  }
  
  function showPreview(event){
    if(event.target.files.length > 0){
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
    }
  }