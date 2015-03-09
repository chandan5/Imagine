var mode = 1
var x, y, rotangle
var turtle_mode = 1
var color_c = 0
var col = 0
color_list = ["black","blue","lime","violet","red","magenta","yellow","white","brown","tan","green","aquamarine","salmon","purple","orange","gray"]
var erase = 0
var stroke_c = color_list[col]
function main(){
    $('#ip').focus()
    $('#ip').val("")
    $('#enter').click(function(e) {
        e.preventDefault();
        userinp = $('#ip').val()
        if (userinp != "") {
            inpinstr = convert(userinp)
            $('#textarea').html($('#textarea').html()+"<span>"+">> "+inpinstr+"</span><br>");
            execute(instrlist)
            $('#textarea').animate({scrollTop: "+="+$('#textarea').height()}, "fast")
            $('#ip').val("")
        }
    });
    $('#ip').keypress(function(e){
        console.log(e.keyCode)
    });
    side_turtle = 20
    x = 0
    y = 0
    rotangle = 0
    setTurtle()
    setCanvas()
    console.log(con)
}

function setTurtle() {
    canvas2 = document.getElementById('canvas2')
    if(canvas2.getContext) {
        con2 = canvas2.getContext("2d")
        con2.translate(canvas2.width/2, canvas2.height/2)
        console.log(con2)
        con2.beginPath()
        con2.moveTo(x, -y)
        con2.lineTo(x + side_turtle/2, -y + (side_turtle * Math.sqrt(3) * 0.5))
        con2.lineTo(x,-y + (2/3)*(side_turtle * Math.sqrt(3) * 0.5))
        con2.lineTo(x - side_turtle/2, -y + (side_turtle * Math.sqrt(3) * 0.5))
        con2.lineTo(x,y)
        con2.closePath()
        con2.strokeStyle = color_list[2]
        con2.stroke()
    }
}

function draw_turtle()
{
    con2.clearRect(-canvas2.width, -canvas2.width, 2*canvas2.width, 2*canvas2.width)
    if (turtle_mode == 1) {
        con2.beginPath()
        con2.moveTo(x, -y)
        con2.lineTo(x + side_turtle/2, -y + (side_turtle * Math.sqrt(3) * 0.5))
        con2.lineTo(x,-y + (2/3)*(side_turtle * Math.sqrt(3) * 0.5))
        con2.lineTo(x - side_turtle/2, -y + (side_turtle * Math.sqrt(3) * 0.5))
        con2.lineTo(x,-y)
        con2.closePath()
        con2.strokeStyle = color_list[2]
        con2.stroke()
    }
}

function setCanvas() {
    canvas = document.getElementById('canvas')
    if (canvas.getContext) {
        con = canvas.getContext('2d')
        con.translate(canvas.width/2, canvas.height/2)
        con.lineCap = "round"
        con.moveTo(0, 0)
        x=0
        rotangle = 0
        y=0
        /*fd(100)
        pu()
        rt(90)
        fd(100)
        rt(90)
        pd()
        fd(100)
        rt(45)
        fd(100*Math.sqrt(2))
        home()
        lt(30)
        fd(100)
        bk(10)*/
        
    }
}

function fd(r) {
    con.beginPath()
    /*con.arc(x, -y, 2, 0, 2*Math.PI)
    con.fill()
    console.log("Circle", x, -y)
    */
    con.moveTo(x, -y)
    if (mode == 1) {
        con.lineTo(x, -y-r)
    }
    else {
        con.moveTo(x, -y-r)
    }
    y=y+r
    console.log(x, y)
    con.stroke()
    con.closePath()
//    console.log(con.lineCap)
    if(erase == 1 && mode == 1)
    {
        erase = 0
        for(var p=0; p<10; p++)
        {
            bk(r)
            fd(r)
        }
        erase = 1
    }
    draw_turtle()
}

function bk(r) {
    con.beginPath()
    con.moveTo(x, -y)
    if (mode == 1) {
        con.lineTo(x, -y+r)
    }
    else {
        con.moveTo(x, -y+r)
    }
    y=y-r
    console.log(x, y)
    con.stroke()
    con.closePath()
    if(erase == 1 && mode == 1)
    {
        erase = 0
        for(var p=0; p<10; p++)
        {
            fd(r)
            bk(r)
        }
        erase = 1
    }
    draw_turtle()
}

function rt(theta) {
    rotangle += theta
    rotangle %= (360)
    console.log(rotangle)
    console.log(theta)
    theta = theta*Math.PI/180
    console.log(theta)
    con.rotate(theta)
    con2.rotate(theta)
    if (theta == Math.PI/2 || theta == 3*Math.PI/2) {
        newy = x*Math.sin(theta)
    }
    else {
        newy = ((x-(y*Math.tan(theta)))*Math.sin(theta)) + ((y)/Math.cos(theta))        
    }
    newx = x*(Math.cos(theta)) - (y)*(Math.sin(theta))
    x = newx
    y = newy
    console.log(x, y)
    draw_turtle()
}

function lt(theta) {
    rotangle -= theta
    rotangle %= (360)
    console.log(rotangle)
    console.log(theta)
    theta = (360-theta)*Math.PI/180
    console.log(theta)
    con.rotate(theta)
    con2.rotate(theta)
    if (theta == Math.PI/2 || theta == 3*Math.PI/2) {
        newy = x*Math.sin(theta)
    }
    else {
        newy = ((x-(y*Math.tan(theta)))*Math.sin(theta)) + ((y)/Math.cos(theta))        
    }
    newx = x*(Math.cos(theta)) - (y)*(Math.sin(theta))
    x = newx
    y = newy
    console.log(x, y)
    draw_turtle()
}

function pu() {
    mode = 0
}

function pd() {
    mode = 1
}

function clean() {
    con.clearRect(-canvas.width, -canvas.width, 2*canvas.width, 2*canvas.width)
}

function cs() {
    home()
    clean()
}

function repeat(size, commlist) {
    for(var i=0; i<size; i++) {
        execute(commlist)
    }
}

function home() {
    con.beginPath()
    console.log(x, y)
    con.moveTo(x, -y)
    con.lineTo(0, 0)
    con.closePath()
    if(mode == 1) {
        con.stroke()
    }
    if(erase == 1 && mode == 1)
    {
        for(var p=0; p<20; p++)
        {
            con.beginPath()
            console.log(x, y)
            con.moveTo(x, -y)
            con.lineTo(0, 0)
            con.closePath()
            con.stroke()
        }
    }
    x=0
    y=0
    con.rotate((360-rotangle)*Math.PI/180)
    con2.rotate((360-rotangle)*Math.PI/180)
    rotangle=0
    draw_turtle()
}

function wait(time) {
    var start=new Date().getTime()
    for(i=0; i< 1e7; i++) {
        end = new Date().getTime()
        console.log(end-start)
        if ((end - start) > time*1000) {
            console.log(end-start)
            fd(100)
            break
        }
    }
}

function st() {
    turtle_mode = 1
    draw_turtle()
}

function ht() {
    turtle_mode = 0
    draw_turtle()
}

function penpaint()
{
    erase = 0
//    con.restore()
    con.strokeStyle = color_list[col]
}

function penerase()
{
    erase = 1
    con.strokeStyle = "white"//"rgba(0,0,0,1)"
  //  con.save()
  //  con.globalCompositeOperation = 'copy'
  //  con.strokeStyle = "rgba(0, 0, 0, 1)"
}

function setpencolor(colo)
{
    col = colo
    con.strokeStyle = color_list[colo]
}

function setpensize(ps)
{
    con.lineWidth = ps
    console.log(con.lineCap)
}

function convert(instr) {
    instr = instr.trim()
    instr = instr.toLowerCase()
    instr = S(instr).replaceAll("[", " [ ")
    instr = S(instr).replaceAll("]", " ] ")
    instr = S(instr).collapseWhitespace().s
    console.log("Instr: "+instr)
    console.log(instr.split(' '))
    instrlist = instr.split(' ')
    //execute(instrlist)
    return instr
    
}

function execute(instrlist) {
    var i = 0
    while (i != instrlist.length) {
        if (instrlist[i] == "fd" || instrlist[i] == "forward")
        {
            try {
                para = eval(instrlist[++i])
                fd(para)
            } catch(e) {
                raiseerror("Invalid Parameter", instrlist[i])
                break
            }
        }
        else if (instrlist[i] == "bk" || instrlist[i] == "back") {
            try {
                para = eval(instrlist[++i])
                bk(para)
            } catch(e) {
                raiseerror("Invalid Parameter", instrlist[i])
                break
            }
        }
        else if (instrlist[i] == "lt" || instrlist[i] == "left") {
            try {
                para = eval(instrlist[++i])
                lt(para)
            } catch(e) {
                raiseerror("Invalid Parameter", instrlist[i])
                break
            }
        }
        else if (instrlist[i] == "rt" || instrlist[i] == "right") {
            try {
                para = eval(instrlist[++i])
                rt(para)
            } catch(e) {
                raiseerror("Invalid Parameter", instrlist[i])
                break
            }
        }
        else if (instrlist[i] == "setps" || instrlist[i] == "setpensize") {
            try {
                para = eval(instrlist[++i])
                setpensize(para)
            } catch(e) {
                raiseerror("Invalid Parameter", instrlist[i])
                break
            }
        }
        else if (instrlist[i] == "setpencolor" || instrlist[i] == "setpc") {
            try {
                para = eval(instrlist[++i])
                if(S(para.toString()).isNumeric())
                {
                    if(para <= 15 && para >=0)
                        setpencolor(para)
                    else
                    {    
                        raiseerror("Invalid Parameter", instrlist[i])
                        break
                    }
                }
                else
                {
                    raiseerror("Invalid Parameter", instrlist[i])
                    break
                }
            } catch(e) {
                raiseerror("Invalid Parameter", instrlist[i])
                break
            }
        }
        else if (instrlist[i] == "pu" || instrlist[i] == "penup") {
            pu()
        }
        else if (instrlist[i] == "pd" || instrlist[i] == "pendown") {
            pd()
        }
        else if (instrlist[i] == "clean") {
            clean()
        }
        else if (instrlist[i] == "cs" || instrlist[i] == "clearscreen") {
            cs()
        }
        else if (instrlist[i] == "home") {
            home()
        }
        else if (instrlist[i] == "ht" || instrlist[i] == "hideturtle") {
            ht()
        }
        else if (instrlist[i] == "st" || instrlist[i] == "showturtle") {
            st()
        }
        else if (instrlist[i] == "penpaint" || instrlist[i] == "ppt") {
            penpaint()
        }
        else if (instrlist[i] == "penerase" || instrlist[i] == "pe") {
            penerase()
        }
        else if (instrlist[i] == "repeat") {
            try {
                itersize = eval(instrlist[++i]).toString()
                if (!S(itersize).isNumeric()) {
                    raiseerror("Invalid Parameter", instrlist[i])
                    break
                }
                itersize = eval(itersize)
            } catch(e) {
                raiseerror("Invalid Parameter", instrlist[i])
                break
            }
            sqbracketopen = ++i
            if(instrlist[sqbracketopen] == "[") {
                var newstack = ["["];
                for (var j=sqbracketopen+1; (j<instrlist.length)&&(newstack.length!=0); j++) {
                    if (instrlist[j] == "[") {
                        newstack.push("[");
                    }
                    else if (instrlist[j] == "]") {
                        var a = newstack.pop();
                    }
                }
                if (newstack.length!=0) {
                    raiseerror("Invalid Syntax:  ]  not found", "Try again")
                    break
                }
                commlist = instrlist.slice(sqbracketopen+1, j-1)
                console.log(commlist)
                repeat(itersize, commlist)
            }
            else {
                raiseerror("Invalid Syntax expected  [ , found ", instrlist[i])
                break
            }
            i = j-1
        }
        else {
            raiseerror("Invalid Instruction", instrlist[i])
            break
        }
        i++
    }
}

function raiseerror(message, error) {
    $('#textarea').html($('#textarea').html()+"<span style=\"color: red;\">"+message+" \'"+error+"\'"+"</span><br>")
    $('#textarea').animate({scrollTop: "+="+$('#textarea').height()}, "fast")
}

window.addEventListener("load", main)