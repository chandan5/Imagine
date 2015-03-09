window.addEventListener('load', main)
var gl;
function main()
{
    if ($("#propic > img").attr('id') == "defaultdp") {
        document.getElementById("propic").addEventListener("mouseenter", function() {
            ($('#editonly').slideDown(1000))();
        });
        document.getElementById("propic").addEventListener("mouseleave", function() {
            ($('#editonly').slideUp(1000))();
        });
    }
    else {
        document.getElementById("propic").addEventListener("mouseenter", function() {
            ($('#editdiv').slideDown(1000))
            ($('#downlddiv').slideDown(1000))();
        });
        document.getElementById("propic").addEventListener("mouseleave", function() {
            ($('#editdiv').slideUp(1000))
            ($('#downlddiv').slideUp(1000))();
        });
    }
    $('.download_title').css('height', $('.logoimage').css('height'))
    $('.view_link').click(function(){
        $(this).attr('href',$(this).attr('name')) 
    });
    $('.view_link').mouseleave(function(){
        $(this).attr('href','#')
    });
    $('.download_link').click(function(){
        $(this).attr('href',$(this).attr('name')) 
    });
    $('.download_link').mouseleave(function(){
        $(this).attr('href','#') 
    });
    $('.edit_redirect_logo').click(function(){
        $.ajax({
            url:'edit',
            data:{editstring:$(this).attr('name')},
            success:function(x){ 
                window.location.replace('http://127.0.0.1:8000/imagine/logo/index')
           //     window.open('http://127.0.0.1:8000/imagine/logo/')    
            }
        })
    })
    $('.edit_redirect_paint').click(function(){
        $.ajax({
            url:'edit',
            data:{editstring:$(this).attr('name')},
            success:function(x){ 
                window.location.replace('http://127.0.0.1:8000/imagine/paint/index')
           //     window.open('http://127.0.0.1:8000/imagine/logo/')    
            }
        })
    })    
    title_divs = document.getElementsByClassName('image_container')
    for (i=0; i<title_divs.length; i++) {
    /*        title_divs[i].addEventListener('click',function(e){
            x = document.createElement('div')
            document.body.appendChild(x);
            x.style.position = 'absolute';
            x.style.top = 0;
            x.style.left = 0;
            x.style.width = window.outerWidth;
            x.style.height = window.outerHeight;
            x.style.zIndex = 10;
            x.style.backgroundColor = 'rgba(0,14,60,0.3)'
            console.log(e.target)
            if(e.target.parentNode.tagName != 'A')
            {
                $('#popup_img').attr('src',e.target.name); 
                $('#popup').fadeIn();
            }
            else
            {
                document.body.removeChild(x);
            }
        });
    */    title_divs[i].addEventListener("mouseenter", function(e) {
            ($('#'+e.target.firstElementChild.alt).slideDown(1000))
            (console.log(document.getElementById(e.target.firstElementChild.alt)))();
        });
        title_divs[i].addEventListener("mouseleave", function(e) {
            ($('#'+e.target.firstElementChild.alt).slideUp(1000))();
        });
    }
    $('.titlespan').click(function(e){
        x = document.createElement('div')
        document.body.appendChild(x);
        x.style.position = 'absolute';
        x.style.top = 0;
        x.style.left = 0;
        x.style.width = window.outerWidth;
        x.style.height = window.outerHeight;
        x.style.zIndex = 10;
        x.style.backgroundColor = 'rgba(0,0,0,0.75)'
        $('#popup_img').attr('src',e.target.id);
        $('.titleinpop').html(e.target.innerHTML);
        $('#popup').fadeIn();
        
    });
    $('.closespan').click(function(){
            $('#popup').fadeOut()
            document.body.removeChild(x);
    });
        
}