var mode = 1
var x, y, rotangle
var turtle_mode = 1
var color_c = 0
var col = 0
color_list = ["black","blue","lime","violet","red","magenta","yellow","white","brown","tan","green","aquamarine","salmon","purple","orange","gray"]
var erase = 0
var stroke_c = color_list[col]
var commandHistory = []
var commandIter = 0
var lineNumber = 1

function editor() {
    $("#editor").focus()
    myEditor = document.getElementById("editor")
}

function saveimage() {
    imgtitle = window.prompt("Enter image title: ")
    console.log(imgtitle)
    if (imgtitle != null && imgtitle != "") {
        console.log("Ajax should be called")
        $.ajax({url: 'saveimage',
               data: {title:imgtitle, imgstring:canvas.toDataURL("image/png", ""), imgtype:"logo"}, 
               success: function(x) {alert("Image Saved!");}
        });
    }
}

function main(){
    //editor()
    $('#download_link').click(function() {
        $('#download_link').attr("href", canvas.toDataURL("image/png", ""));
    });
    $('#download_link').attr("href", canvas.toDataURL("image/png", ""))
    imagesave = document.getElementById("saveimg")
    imagesave.addEventListener("click", saveimage)
    document.getElementById("consolelink").addEventListener("mouseover", function() {
        document.getElementById("consoleimg").src = (function() {
            source = document.getElementById("consoleimg").src
            pathlist = source.split(".svg")
            pathlist[0]+="2"
            return pathlist[0]+".svg"
        })();
     //   console.log(document.getElementById("consoleimg").src);
    });
    document.getElementById("consolelink").addEventListener("mouseout", function() {
        document.getElementById("consoleimg").src = (function() {
            source = document.getElementById("consoleimg").src
            pathlist = source.split(".svg")
            pathlist[0]=pathlist[0].substring(0, pathlist[0].length-1)
            return pathlist[0]+".svg"
        })();
    //    console.log(document.getElementById("consoleimg").src);
    });
    document.getElementById("editorlink").addEventListener("mouseover", function() {
        document.getElementById("editorimg").src = (function() {
            source = document.getElementById("editorimg").src
            pathlist = source.split(".svg")
            pathlist[0]+="2"
            return pathlist[0]+".svg"
        })();
    //    console.log(document.getElementById("editorimg").src);
    });
    document.getElementById("editorlink").addEventListener("mouseout", function() {
        document.getElementById("editorimg").src = (function() {
            source = document.getElementById("editorimg").src
            pathlist = source.split(".svg")
            pathlist[0]=pathlist[0].substring(0, pathlist[0].length-1)
            return pathlist[0]+".svg"
        })();
     //   console.log(document.getElementById("editorimg").src);
    });
    $('#ip').focus()
    $('#ip').val("")
    $('#enter').click(function(e) {
        e.preventDefault();
        userinp = $('#ip').val()
        if (userinp != "") {
            inpinstr = convert(userinp)
            currdate = new Date()
            hr=("0"+currdate.getHours().toString()).slice(-2)
            mn=("0"+currdate.getMinutes().toString()).slice(-2)
            se=("0"+currdate.getSeconds().toString()).slice(-2)
            $('#textarea').html($('#textarea').html()+"<span>"+"&nbsp;"+hr+"&nbsp;:&nbsp;"+mn+"&nbsp;:&nbsp;"+se+"&nbsp;|&nbsp;"+inpinstr+"</span><br>");
            commandHistory.push(inpinstr)
            commandIter = commandHistory.length
            result=execute(instrlist)
            $('#textarea').animate({scrollTop: "+="+$('#textarea').height()}, "fast")
            $('#ip').val("")
        }
    });
    $('#ip').keypress(function(e){
        if (e.keyCode == 38) {
            //console.log(commandIter)
            if (commandIter > 0) {
                commandIter--
                $('#ip').val(commandHistory[commandIter])
            }
        }
        else if (e.keyCode == 40) {
            //console.log(commandIter)
            if (commandIter <= commandHistory.length - 1) {
                commandIter++
                $('#ip').val(commandHistory[commandIter])
            }
            else {
                $('#ip').val("")
            }
        }
    });
    side_turtle = 20
    x = 0
    y = 0
    rotangle = 0
    setTurtle()
    setCanvas()
    if (document.getElementById('canvasdiv').children[1]) {
        image = document.getElementById('canvasdiv').children[1];
        console.log(document.getElementById('canvasdiv').children[1])
        con.drawImage(image, -canvas.width/2, -canvas.height/2)
    }
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
//    console.log(x, y)
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
 //   console.log(x, y)
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
//    console.log(rotangle)
//    console.log(theta)
    theta = theta*Math.PI/180
//    console.log(theta)
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
//    console.log(x, y)
    draw_turtle()
}

function lt(theta) {
    rotangle -= theta
    rotangle %= (360)
 //   console.log(rotangle)
 //   console.log(theta)
    theta = (360-theta)*Math.PI/180
 //   console.log(theta)
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
 //   console.log(x, y)
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
        result=execute(commlist)
        if (result != 0) {
            console.log(result)
            return -1
        }
    }
    return 0
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

function cc()
{
    $('#textarea').html('')
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
                para = eval(instrlist[++i].toUpperCase())
                fd(para)
            } catch(e) {
                if (!instrlist[i]) {
                    raiseerror("Invalid Parameter", "Try again")
                    return 1
                }
                raiseerror("Invalid Parameter", instrlist[i])
                return 1
            }
        }
        else if (instrlist[i] == "bk" || instrlist[i] == "back") {
            try {
                para = eval(instrlist[++i].toUpperCase())
                bk(para)
            } catch(e) {
                if (!instrlist[i]) {
                    raiseerror("Invalid Parameter", "Try again")
                    return 1
//                    break
                }
                raiseerror("Invalid Parameter", instrlist[i])
                return 1
//              break
            }
        }
        else if (instrlist[i] == "lt" || instrlist[i] == "left") {
            try {
                para = eval(instrlist[++i].toUpperCase())
                lt(para)
            } catch(e) {
                if (!instrlist[i]) {
                    raiseerror("Invalid Parameter", "Try again")
                    return 1
                    //break
                }
                raiseerror("Invalid Parameter", instrlist[i])
                return 1
                //break
            }
        }
        else if (instrlist[i] == "rt" || instrlist[i] == "right") {
            try {
                para = eval(instrlist[++i].toUpperCase())
                rt(para)
            } catch(e) {
                if (!instrlist[i]) {
                    raiseerror("Invalid Parameter", "Try again")
                    return 1
//                    break
                }
                raiseerror("Invalid Parameter", instrlist[i])
                return 1
//                break
            }
        }
        else if (instrlist[i] == "setpencolor" || instrlist[i] == "setpc") {
            try {
                para = eval(instrlist[++i].toUpperCase())
                if(S(para.toString()).isNumeric())
                {
                    if(para <= 15 && para >=0)
                        setpencolor(para)
                    else
                    {    
                        raiseerror("Invalid Parameter", instrlist[i])
                    return 1
//                    break
                    }
                }
                else
                {
                    raiseerror("Invalid Parameter", instrlist[i])
                    return 1
//                    break
                }
            } catch(e) {
                if (!instrlist[i]) {
                    raiseerror("Invalid Parameter", "Try again")
                    return 1
//                    break
                }
                raiseerror("Invalid Parameter", instrlist[i])
                return 1
//                break
            }
        }
        else if (instrlist[i] == "setps" || instrlist[i] == "setpensize") {
            try {
                para = eval(instrlist[++i].toUpperCase())
                setpensize(para)
            } catch(e) {
                if (!instrlist[i]) {
                    raiseerror("Invalid Parameter", "Try again")
                    return 1
//                    break
                }
                raiseerror("Invalid Parameter", instrlist[i])
                return 1
                break
            }
        }
        else if (instrlist[i] == "pu" || instrlist[i] == "penup") {
            pu()
        }
        else if (instrlist[i] == "pd" || instrlist[i] == "pendown") {
            pd()
        }
        else if (instrlist[i] == "pe" || instrlist[i] == "penerase") {
            penerase()
        }
        else if (instrlist[i] == "ppt" || instrlist[i] == "penpaint") {
            penpaint()
        }
        else if (instrlist[i] == "clean") {
            clean()
        }
        else if (instrlist[i] == "cs" || instrlist[i] == "clearscreen") {
            cs()
        }
        else if (instrlist[i] == "cc" || instrlist[i] == "clearconsole") {
            cc()
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
        else if (instrlist[i] == "repeat") {
            try {
                itersize = eval(instrlist[++i].toUpperCase()).toString()
           //     console.log(itersize)
                if (!S(itersize).isNumeric()) {
                    raiseerror("Invalid Parameter", instrlist[i])
                    return 1
                    break
                }
                itersize = eval(itersize)
            } catch(e) {
                if (!instrlist[i]) {
                    raiseerror("Invalid Parameter", "Try again")
                    return 1
                    break
                }
                raiseerror("Invalid Parameter", instrlist[i])
                return 1
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
                    raiseerror("Invalid Syntax expected  ] ,", "Try again")
                    return 2
                    break
                }
                commlist = instrlist.slice(sqbracketopen+1, j-1)
            //    console.log(commlist)
                res=repeat(itersize, commlist)
                if (res!=0) {
                    return 2
                }
            }
            else {
                if (!instrlist[i]) {
                    raiseerror("Invalid Parameter", "Try again")
                    return 1
                    break
                }
                raiseerror("Invalid Syntax expected  [ , found ", instrlist[i])
                return 2
                break
            }
            i = j-1
        }
        else {
            raiseerror("Invalid Instruction", instrlist[i])
            return 3
            break
        }
        i++
    }
    return 0
}

function raiseerror(message, error) {
    currdate = new Date()
    hr=("0"+currdate.getHours().toString()).slice(-2)
    mn=("0"+currdate.getMinutes().toString()).slice(-2)
    se=("0"+currdate.getSeconds().toString()).slice(-2)
    $('#textarea').html($('#textarea').html()+"&nbsp;"+hr+"&nbsp;:&nbsp;"+mn+"&nbsp;:&nbsp;"+se+"<span style=\"color: red; font-weight:bold;\">"+"&nbsp;|&nbsp;"+message+" \'"+error+"\'"+"</span><br>")
    $('#textarea').animate({scrollTop: "+="+$('#textarea').height()}, "fast")
}

window.addEventListener("load", main)