// /**
//  * @role 小地图
//  * @time 2019.06.20
//  */

var mousePos
$(".littleimg").css("width", $("#imageid").width())
var screenImage = $("#imageid");
var trueImg = $(".longimg");
var theImage = new Image();
theImage.src = trueImg.attr("src");
var trueWidth = $(".longimg").width()
var lightWidth = $(".contrl").width() * ($(window).width() / trueWidth)
$(".light").width(lightWidth)
var imageWidth = screenImage.width();
var imageHeight = screenImage.height();
var flag = false　　
console.log($(".longimg").width());


function mousePosition(ev) {   
    if (ev.pageX || ev.pageY) {   
        return {
            x: ev.pageX,
            y: ev.pageY
        };   
    }   
    return {    
        x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: ev.clientY + document.body.scrollTop  - document.body.clientTop    
    }; 
}


function mouseMove(ev) {  
    ev = ev || window.event;  
    mousePos = mousePosition(ev);  

}
document.onmousemove = mouseMove;

function Show(el) {   
    var x = parseInt(mousePos.x) - el.offsetLeft - (lightWidth / 2)
    var y = parseInt(mousePos.y) - el.offsetTop;   
    var trueLeft = trueWidth - $(".scoll").width()
    var z =  x / imageWidth * trueWidth
    var m = $("#imageid").width() - $(".light").width()
    var n = $(".light").width()

    if (x > m) {
        x = m
    }
    if (x < 0) {
        x = 0
    }

    $(".light").css("left", x)
    $(".littleimg").css("left", -x)
    $(".scoll").animate({
        "scrollLeft": z
    })

}
$(".scoll").on("mouseover mouseout", function(event) {
    if (event.type == "mouseover") {
        flag = true

        //鼠标悬浮
    } else if (event.type == "mouseout") {
        //鼠标离开

        flag = false
    }
})



$(".scoll").scroll(function(params) {
    let x = $(this).scrollLeft()
    let y = trueWidth - $(".scoll").width()
    let z = x / y
    let m = $("#imageid").width() - $(".light").width()
    let n = m * z
    if (flag) {

        $(".light").css("left", n)
        $(".littleimg").css("left", -n)

    }
})