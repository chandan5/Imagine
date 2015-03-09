var turns = 1
var gAnimation = null

function main() {
    $('#titleimg').fadeIn(2000, animateG);
}

function animateG() {
    var g = document.getElementById("gspan")
    var pos = turns * 2
    var cw = g.scrollWidth
    g.style.marginLeft = pos + "px"
    if (pos + cw < 150) {
        gAnimation = requestAnimationFrame(animateG)
    } else {
        cancelAnimationFrame(gAnimation)
        $('#titleimg').fadeOut(0, function() {$('.change').fadeIn(0);$('.normal').fadeIn(2000);})
    }
    ++turns
}

window.addEventListener("load", main)
in)
