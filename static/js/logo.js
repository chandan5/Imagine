function main(){
    $('#enter').click(function(e) {
        e.preventDefault();
        $('#textarea').html($('#textarea').html()+">> "+$('#ip').val()+"<br>");
        $('#textarea').animate({scrollTop: "+="+$('#textarea').height()}, "fast")
        $('#ip').val("")
    });
    setCanvas()
    inp = document.getElementById('ip')
    inp.addEventListener("keyup", converttoupper)
}

function converttoupper() {
    ipstring = inp.value
    inp.value = ipstring.toUpperCase()
}

function setCanvas() {
    canvas = document.getElementById('canvas')
    if (canvas.getContext) {
        con = canvas.getContext('2d')
        con.translate(canvas.width/2, canvas.height/2)
        con.moveTo(0, 0)
        //console.log(con)
        con.lineTo(0, -40)
        con.rotate(45*Math.PI/180)
        theta = 45*Math.PI/180
        newx = 0*(Math.cos(theta)) - (40)*(Math.sin(theta))
        newy = ((0-(40*Math.tan(theta)))*Math.sin(theta)) + ((40)/Math.cos(theta))
        console.log(newx, -newy)
        con.lineTo(newx, -newy-40)
        /*con.rotate(Math.PI/2)
        con.lineTo(-40, 0)
        con.rotate(Math.PI/2)
        /*con.rotate(3*Math.PI/2)
        con.lineTo(-40, 0)
        con.rotate(3*Math.PI/2)
        con.lineTo(0, 0)
        *///con.fillRect(0, 0, 20,30)
        con.stroke()
    }
}


window.addEventListener("load", main)