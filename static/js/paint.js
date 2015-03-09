var x = 650, y = 327
var dx = 1, dy = 1
var color = "Black"
var radius = 4
var imagedata = []
var imagedataIter = 0

function line(e){	
	con.strokeStyle = color
	console.log(color, con.strokeStyle)
	con.beginPath()
	canvas.addEventListener("mousemove", update)
	imagedata = imagedata.slice(0,imagedataIter+1)
	imagedata[imagedataIter++]=con.getImageData(0, 0, canvas.width, canvas.height)
	e.preventDefault()
	x = x1 = e.clientX - leftOffset
	y = y1 = e.clientY - topOffset
}

function starterase(e){
	con.strokeStyle = 'white'
	console.log(color, con.strokeStyle)
	con.beginPath()
	canvas.addEventListener("mousemove", update)
	imagedata = imagedata.slice(0,imagedataIter+1)
	imagedata[imagedataIter++]=(con.getImageData(0, 0, canvas.width, canvas.height)) 
	e.preventDefault()
	x = x1 = e.clientX - leftOffset
	y = y1 = e.clientY - topOffset
}

function remove(){
	canvas.removeEventListener("mousemove", update)
	con.closePath()
	window.removeEventListener("mouseup", remove)
}

function fresh(){
	con.clearRect(0, 0, canvas.width, canvas.height)
	imagedata = []
	drawcanvas()
}

function create_rect() {
	canvas.addEventListener("mousedown", stretch)
	linebutton.addEventListener("click", rectrem)
	brushbut.addEventListener("click", rectrem)
	selectbutton.addEventListener("click", rectrem)
	eraserbutton.addEventListener("click", rectrem)
	ovalbutton.addEventListener("click", rectrem)
}

function stretch(e) {
	x1 = e.clientX-leftOffset
	y1 = e.clientY-topOffset
	imageprev = con.getImageData(0, 0, canvas.width, canvas.height)
	imagedata = imagedata.slice(0,imagedataIter+1)
	imagedata[imagedataIter++]=(imageprev)
	 
	canvas.addEventListener("mousemove", midstroke)
	canvas.addEventListener("mouseup", rectangle)
	canvas.style.cursor = "crosshair"
	e.preventDefault()
}

function midstroke(e) {
	con.putImageData(imageprev, 0, 0)
	x2 = e.clientX-leftOffset
	y2 = e.clientY-topOffset
	con.lineWidth = 1
	con.strokeStyle = color
	con.strokeRect(x1,y1,x2-x1,y2-y1)
	x=x2
	y=y2
	e.preventDefault()
}

function rectrem(e) {
	canvas.removeEventListener("mousedown", stretch)
	linebutton.removeEventListener("click", rectrem)
	brushbut.removeEventListener("click", rectrem)
	selectbutton.removeEventListener("click", rectrem)
	eraserbutton.removeEventListener("click", rectrem)
	ovalbutton.removeEventListener("click", rectrem)
}

function rectangle(e) {
	x2 = e.clientX-leftOffset
	y2 = e.clientY-topOffset
	canvas.removeEventListener("mousemove",midstroke)
	canvas.removeEventListener("mouseup", rectangle)
	con.fillStyle = color
	con.fillRect(x1,y1,x2-x1,y2-y1)
	x=x2
	y=y2
	canvas.style.cursor = "default"
}

function draw() {
	if(canvas.getContext) {
		con.lineWidth=2
		con = canvas.getContext('2d')
		con.strokeStyle = "black"
		con.strokeRect(0, 0, canvas.width, canvas.height)
		con.beginPath()
		con.fillStyle = color
		con.arc(x, y, radius, 0, 2*Math.PI)
		con.fill()
	}
}

function update(e) {
	x = e.clientX-leftOffset
	y = e.clientY-topOffset
	//con.beginPath()
	con.lineWidth = radius*2
	con.lineCap = "round"
	con.moveTo(x1, y1)
	con.lineTo(x, y)
	//con.closePath()
	con.stroke()
	x1 = x
	y1 = y
	//draw()
	window.addEventListener("mouseup", remove, false)
}

function drawcanvas() {	
	if(canvas.getContext) {
		con = canvas.getContext('2d')
		con.strokeStyle = "black"
		con.lineWidth=2
		con.strokeRect(0, 0, canvas.width, canvas.height)
		con.lineCap = "round"
		con.fillStyle = "white"
		con.fillRect(0, 0, canvas.width, canvas.height)
		con.fillStyle = color
	}
}

function create_line() {
	canvas.addEventListener("mousedown", stretch_line)
	rectbutton.addEventListener("click", linerem)
	brushbut.addEventListener("click", linerem)
	selectbutton.addEventListener("click", linerem)
	eraserbutton.addEventListener("click", linerem)
	ovalbutton.addEventListener("click", linerem)
}

function stretch_line(e) {
	imageprev = con.getImageData(0, 0, canvas.width, canvas.height)
	imagedata = imagedata.slice(0,imagedataIter+1)
	imagedata[imagedataIter++]=(imageprev)
	 
	x1 = e.clientX-leftOffset
	y1 = e.clientY-topOffset
	canvas.addEventListener("mousemove", midstrokeline)
	canvas.addEventListener("mouseup", draw_line)
	canvas.style.cursor = "crosshair"
	e.preventDefault()
}

function midstrokeline(e) {
	con.putImageData(imageprev, 0, 0)
	x2 = e.clientX-leftOffset
	y2 = e.clientY-topOffset
	con.strokeStyle = color
	con.beginPath()
	con.moveTo(x1,y1)
	con.lineTo(x2,y2)
	con.lineWidth=2*radius
	con.stroke()
	x=x2
	y=y2
	e.preventDefault()
}

function linerem(e) {
	rectbutton.removeEventListener("click", linerem)
	ovalbutton.removeEventListener("click", linerem)
	brushbut.removeEventListener("click", linerem)
	selectbutton.removeEventListener("click", linerem)
	eraserbutton.removeEventListener("click", linerem)
	canvas.removeEventListener("mousedown", stretch_line)	
}

function draw_line(e) {
	x2 = e.clientX-leftOffset
	y2 = e.clientY-topOffset
	canvas.removeEventListener("mouseup", draw_line)
	canvas.removeEventListener("mousemove", midstrokeline)
	con.strokeStyle = color
	con.beginPath()
	con.moveTo(x1,y1)
	con.lineTo(x2,y2)
	con.lineWidth=2*radius
	con.stroke()
	x=x2
	y=y2
	canvas.style.cursor = "default"
} 

function create_oval() {
	canvas.addEventListener("mousedown", stretch_oval)
	rectbutton.addEventListener("click", ovalrem)
	linebutton.addEventListener("click", ovalrem)
	brushbut.addEventListener("click", ovalrem)
	selectbutton.addEventListener("click", ovalrem)
	eraserbutton.addEventListener("click", ovalrem)
}

function stretch_oval(e) {
	x1 = e.clientX-leftOffset
	y1 = e.clientY-topOffset
	imageprev = con.getImageData(0, 0, canvas.width, canvas.height)
	imagedata = imagedata.slice(0,imagedataIter+1)
	imagedata[imagedataIter++]=(imageprev)
	 
	canvas.addEventListener("mousemove", midstroke_oval)
	canvas.addEventListener("mouseup", oval)
	canvas.style.cursor = "crosshair"
	e.preventDefault()
}

function midstroke_oval(e) {
	con.putImageData(imageprev, 0, 0)
	x2 = e.clientX-leftOffset
	y2 = e.clientY-topOffset
	con.lineWidth = 1
	con.strokeStyle = color
	centerx = Math.round((x1+x2)/2)
	centery = Math.round((y1+y2)/2)
	ovalwidth = Math.round(Math.abs(x2-x1))
	ovalheight = Math.round(Math.abs(y2-y1))
	ovalradius = Math.min(ovalwidth/2, ovalheight/2)
	con.save()
	scalex = (ovalwidth/(ovalradius*2))
	scaley = (ovalheight/(ovalradius*2))
	con.scale(scalex, scaley)
	con.beginPath()
	con.arc(centerx/scalex, centery/scaley, ovalradius, 0, 2*Math.PI, false)
	con.closePath()
	con.restore()
	con.stroke()
	x=x2
	y=y2
	e.preventDefault()
}

function ovalrem(e) {
	rectbutton.removeEventListener("click", ovalrem)
	canvas.removeEventListener("mousedown", stretch_oval)
	brushbut.removeEventListener("click", ovalrem)
	selectbutton.removeEventListener("click", ovalrem)
	eraserbutton.removeEventListener("click", ovalrem)
	linebutton.removeEventListener("click", ovalrem)
}

function oval(e) {
	x2 = e.clientX-leftOffset
	y2 = e.clientY-topOffset
	canvas.removeEventListener("mousemove",midstroke_oval)
	canvas.removeEventListener("mouseup", oval)
	con.fillStyle = color
	centerx = Math.round((x1+x2)/2)
	centery = Math.round((y1+y2)/2)
	ovalwidth = Math.round(Math.abs(x2-x1))
	ovalheight = Math.round(Math.abs(y2-y1))
	ovalradius = Math.min(ovalwidth/2, ovalheight/2)
	con.save()
	scalex = (ovalwidth/(ovalradius*2))
	scaley = (ovalheight/(ovalradius*2))
	con.scale(scalex, scaley)
	con.beginPath()
	con.arc(centerx/scalex, centery/scaley, ovalradius, 0, 2*Math.PI, false)
	con.closePath()
	con.restore()
	con.fill()
	x=x2
	y=y2
	canvas.style.cursor = "default"
}

function saveimage() {
    imgtitle = window.prompt("Enter image title: ")
    console.log(imgtitle)
    if (imgtitle != null && imgtitle != "") {
        console.log("Ajax should be called")
        $.ajax({url: 'saveimage',
               data: {title:imgtitle, imgstring:canvas.toDataURL("image/png", ""), imgtype:"paint"},
               success: function(x) {alert("Image Saved!");}
        });
    }
}

function create_brush() {
	canvas.addEventListener("mousedown", line)
	rectbutton.addEventListener("click", brushrem)
	linebutton.addEventListener("click", brushrem)
	ovalbutton.addEventListener("click", brushrem)
	eraserbutton.addEventListener("click", brushrem)
	selectbutton.addEventListener("click", brushrem)
}

function brushrem() {
	rectbutton.removeEventListener("click", brushrem)
	canvas.removeEventListener("mousedown", line)
	linebutton.removeEventListener("click", brushrem)
	ovalbutton.removeEventListener("click", brushrem)	
	eraserbutton.removeEventListener("click", brushrem)	
	selectbutton.removeEventListener("click", brushrem)
}

function create_eraser() {
	canvas.addEventListener("mousedown", starterase)
	rectbutton.addEventListener("click", eraserem)
	linebutton.addEventListener("click", eraserem)
	ovalbutton.addEventListener("click", eraserem)
	brushbut.addEventListener("click", eraserem)
	selectbutton.addEventListener("click", eraserem)
}

function eraserem() {
	rectbutton.removeEventListener("click", eraserem)
	canvas.removeEventListener("mousedown", starterase)
	linebutton.removeEventListener("click", eraserem)
	ovalbutton.removeEventListener("click", eraserem)
	brushbut.removeEventListener("click", eraserem)
	selectbutton.removeEventListener("click", eraserem)
}

function create_select() {
	con.save()
	con.setLineDash([2,3])
	canvas.addEventListener("mousedown", stretch_select)
	rectbutton.addEventListener("click", selectrem)
	linebutton.addEventListener("click", selectrem)
	ovalbutton.addEventListener("click", selectrem)
	brushbut.addEventListener("click", selectrem)
	eraserbutton.addEventListener("click", selectrem)
}

function stretch_select(e) {
	pasteimage = null
	x1 = e.clientX-leftOffset
	y1 = e.clientY-topOffset
	imageprev = con.getImageData(0, 0, canvas.width, canvas.height)
	imagedata = imagedata.slice(0,imagedataIter+1)
	imagedata[imagedataIter++]=(imageprev)
	canvas.addEventListener("mousemove", midstroke_select)
	canvas.addEventListener("mouseup", select)
	canvas.style.cursor = "crosshair"
	e.preventDefault()
}

function midstroke_select(e) {
	con.putImageData(imageprev, 0, 0)
	x2 = e.clientX-leftOffset
	y2 = e.clientY-topOffset
	con.lineWidth = 1
	con.strokeStyle = color
	con.strokeRect(x1,y1,x2-x1,y2-y1)
	x=x2
	y=y2
	e.preventDefault()
}

function select(e) {
	x2 = e.clientX-leftOffset
	y2 = e.clientY-topOffset
	canvas.removeEventListener("mousemove",midstroke_select)
	canvas.removeEventListener("mouseup", select)
	con.strokeRect(x1,y1,x2-x1,y2-y1)
	x=x2
	y=y2
	if (x1 > x2) {
		temp = x1
		x1 = x2
		x2 = temp
	}
	if (y1 > y2) {
		temp = y1
		y1 = y2
		y2 = temp
	}
	console.log(x2-x1, y2-y1)
	moveflag = 1
	rectimage = { startx:x1+2, starty:y1+2, image:con.getImageData(x1+2,y1+2,x2-x1-2,y2-y1-3)}
	//con.putImageData(rectimage.image, 0, 0)
	//con.strokeRect(0, 0, x2-x1-2, y2-y1-3)
	cutbutton  = document.getElementById('cut')
	cutbutton.addEventListener("click", cutfunction)
	function cutfunction() {
		pasteimage = rectimage
		if (pasteimage!=null) {	
			con.clearRect(x1-2, y1-2, x2-x1+4, y2-y1+4)
			moveflag = 0
		}
		cutbutton.removeEventListener("click", cutfunction)
	}
	copybutton  = document.getElementById('copy')
	copybutton.addEventListener("click", copyfunction)
	function copyfunction() {
		pasteimage = rectimage
		if (pasteimage!=null) {
			con.putImageData(imageprev, 0, 0)
			moveflag = 0
		}
		copybutton.removeEventListener("click", copyfunction)
	}
	pastebutton = document.getElementById("paste")
	pastebutton.addEventListener("click", pastefunction)
	function pastefunction() {
		if (pasteimage!=null) {
			con.putImageData(pasteimage.image, 0, 0)
			pasteimage.startx = 0
			pasteimage.starty = 0
			rectimage = pasteimage
			movestart()
			con.save()
			con.setLineDash([2,3])
			con.lineWidth = 1
			con.strokeRect(0, 0, x2-x1-2, y2-y1-3)
			con.restore()
			moveflag = 0
		}
	}
	if(moveflag == 1)
		movestart()
	/*for (i=0; i<rectimage.height; i++) {
		for(j=0; j<rectimage.width; j++)
		{
			rectimage.data[(i*rectimage.width + j)*4] = Math.random()*255
			rectimage.data[(i*rectimage.width + j)*4+1] = Math.random()*255
			rectimage.data[(i*rectimage.width + j)*4+2] = Math.random()*255
		}
	}
	con.putImageData(rectimage, x1, y1)
	*/
	canvas.style.cursor = "default"
}

function selectrem() {
	con.restore()
	pasteimage = null
	rectbutton.removeEventListener("click", selectrem)
	canvas.removeEventListener("mousedown", stretch_select)
	linebutton.removeEventListener("click", selectrem)
	ovalbutton.removeEventListener("click", selectrem)
	brushbut.removeEventListener("click", selectrem)
	eraserbutton.removeEventListener("click", selectrem)
	pastebutton.removeEventListener("click", pastefunction)

}

function leaverectimage(e) {
	con.clearRect(moverectimage.startx-2, moverectimage.starty-2, moverectimage.image.width+7, moverectimage.image.height+8)
	moverectimage.startx = e.clientX - leftOffset
	moverectimage.starty = e.clientY - topOffset
	con.putImageData(moverectimage.image, e.clientX-leftOffset, e.clientY-topOffset)
	canvas.removeEventListener("mousemove", moveon)
	canvas.removeEventListener("mouseup", leaverectimage)
	canvas.removeEventListener("mousedown", moverectangle)
	canvas.addEventListener("mousedown", stretch_select)
	canvas.style.cursor = "default"
	moverectimage = null
}

function moveon(e){
	con.clearRect(moverectimage.startx-2, moverectimage.starty-2, moverectimage.image.width+4, moverectimage.image.height+4)
	con.putImageData(imageprev, 0, 0)
	x = e.clientX - leftOffset
	y = e.clientY - topOffset
	moverectimage.startx = x
	moverectimage.starty = y
	con.putImageData(moverectimage.image, x, y)
	con.strokeRect(x, y, moverectimage.image.width+4, moverectimage.image.height+4)
}

function moverectangle(e){
	x = e.clientX - leftOffset
	y = e.clientY - topOffset
	if (x>=rectimage.startx && x<=(rectimage.startx + rectimage.image.width) && y>=rectimage.starty && y<=(rectimage.starty + rectimage.image.height)) {
		moverectimage = rectimage
		rectimage = null
		console.log(moverectimage.image.width, moverectimage.image.height)		
		con.clearRect(moverectimage.startx-4, moverectimage.starty-3, moverectimage.image.width+6, moverectimage.image.height+6)
		imageprev = con.getImageData(0, 0, canvas.width, canvas.height)
		imagedata = imagedata.slice(0,imagedataIter+1)
		imagedata[imagedataIter++] = imageprev
		canvas.addEventListener("mousemove", moveon)
		canvas.addEventListener("mouseup", leaverectimage)
		canvas.style.cursor = "move"
	}
	else {
		canvas.removeEventListener("mousedown", moverectangle)
	}
}

function movestart(){
	canvas.addEventListener("mousedown", moverectangle)
	canvas.removeEventListener("mousedown", stretch_select)
}


function main() {
	canvas = document.getElementById('draw')
	leftOffset = canvas.getBoundingClientRect().left
	topOffset = canvas.getBoundingClientRect().top
	console.log(leftOffset, topOffset)
	drawcanvas()
	$('#download_link').click(function() {
		$('#download_link').attr("href", canvas.toDataURL("image/png", ""));
	});
	$('#download_link').attr("href", canvas.toDataURL("image/png", ""));
	//canvas.addEventListener("click", create_dot)
	if (document.getElementById('canvasdiv').children[1]) {
		image = document.getElementById('canvasdiv').children[1];
		console.log(document.getElementById('canvasdiv').children[1])
		con.drawImage(image, 0, 0)
	}
	create_brush()
	imagesave = document.getElementById("save")
	imagesave.addEventListener("click", saveimage)
	prevkey = null
	window.addEventListener("keypress", move, false)
	selectbutton = document.getElementById('select')
	selectbutton.addEventListener("click", create_select)
	brushbut = document.getElementById('brush')
	brushbut.addEventListener('click', create_brush)
	button = document.getElementById('refresh')
	button.addEventListener("click", fresh, false)
	//button.addEventListener("click", fresh, false)
	eraserbutton = document.getElementById('eraser')
	eraserbutton.addEventListener("click", create_eraser)
	undobut = document.getElementById('undo')
	undobut.addEventListener("click", undo, false)
	redobut = document.getElementById('redo')
	redobut.addEventListener("click", redo, false)
	rectbutton = document.getElementById('rect')
	rectbutton.addEventListener("click", create_rect, false)
	linebutton = document.getElementById('line')
	linebutton.addEventListener("click", create_line, false)
	ovalbutton = document.getElementById('oval')
	ovalbutton.addEventListener("click", create_oval, false)
	//form1 = document.getElementById('form1')
	//form1.addEventListener("submit", change)
	$('.highlight').click(function(e) {
		console.log("function called"+e.target.id)
		$('.top').css('border', '1px solid black')
		$('#'+e.target.parentElement.id).css('border', '2px solid red')
	})
	colpallete = document.getElementsByClassName('palcol')
	for (i=0; i<colpallete.length; i++) {
		divvar = document.getElementById(colpallete[i].id)
		divvar.style.backgroundColor = colpallete[i].id
		divvar.addEventListener("click", changecol)
	}
	function undo(e) {
	//	alert(imagedataIter)
	//	alert(imagedata.length)
		if (imagedataIter == imagedata.length) {
			imagedata[imagedataIter] = con.getImageData(0, 0, canvas.width, canvas.height)
		}
		if (imagedataIter>0) {
			image = imagedata[--imagedataIter]
			con.putImageData(image, 0, 0)
		//	alert(imagedataIter+" Length: "+imagedata.length)
		}
	}
	function redo(e) {
		if (imagedataIter<imagedata.length-1) {
			image = imagedata[++imagedataIter]
			con.putImageData(image, 0, 0)
		//	alert(imagedataIter)
		}
	}
	function changecol(e) {
		color=e.target.id
		seecol = document.getElementById('selected')
		seecol.style.backgroundColor = color
		showcolor = document.getElementById('showcl')
		showcolor.innerHTML = color
		for (i=0; i<colorlist.length; i++) {
			if (colorlist[i].color == color) {
				hex = colorlist[i].code
				console.log(hex)
				break
			}
		}
		showhex = document.getElementById('showhx')
		showhex.innerHTML = hex
	}
	list = document.getElementsByTagName('option')
	function colorcodes(codecolor) {
		bracketin = codecolor.indexOf('(')
		colorname = codecolor.substring(0,bracketin)
		codename = codecolor.substring(bracketin+1, bracketin+8)
		return {color: colorname, code: codename}
	}
	colorlist = []
	for (i=0; i<list.length; i++) {
		newentry = colorcodes(list[i].value)
		colorlist.push(newentry)
	}	
}

function move(e) {
	if (prevkey == null || prevkey!=e.keyCode) {
		imagedata[imagedataIter++]=(con.getImageData(0, 0, canvas.width, canvas.height))
	}
	prevkey = e.keyCode
	if(e.keyCode == 40){
		y=(y+dy)%canvas.height
		draw()
	}
	if(e.keyCode == 38){
		y=(y-dy)
		if(y<0){ y+=canvas.height}
		draw()
	}
	if(e.keyCode == 37){
		x=(x-dx)
		if(x<0){ x+=canvas.width}
		draw()
	}
	if(e.keyCode == 39){
		x=(x+dx)%canvas.width
		draw()
	}
}

window.addEventListener("load", main)