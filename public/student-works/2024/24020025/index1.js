
// モーダル

var modal = document.getElementById("demo-modal")
var btn = document.getElementById("open-modal")
var close = modal.getElementsByClassName("close")[0]

btn.onclick = function () {
  modal.style.display = "block"
}

close.onclick = function () {
  modal.style.display = "none"
}

window.onclick = function (event) {
  if (event.target == modal) {
    // Which means he clicked somewhere in the modal (background area), but not target = modal-content
    modal.style.display = "none"
  }
}