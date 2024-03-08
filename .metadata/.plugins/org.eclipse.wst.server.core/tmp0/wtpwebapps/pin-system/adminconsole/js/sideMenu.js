$(function(){
    $('[data-toggle="tooltip"]').tooltip();
    $(".side-nav .collapse").on("hide.bs.collapse", function() {                   
        $(this).prev().find(".fa").eq(1).removeClass("fa-angle-right").addClass("fa-angle-down");
    });
    $('.side-nav .collapse').on("show.bs.collapse", function() {                        
        $(this).prev().find(".fa").eq(1).removeClass("fa-angle-down").addClass("fa-angle-right");        
    });
    
   /* var activeMenu = localStorage.getItem("activeMenu")
    $("a[href$='"+activeMenu+"']").addClass("active-menu");
    if(activeMenu === "?target=customerMaster" || activeMenu === "?target=serviceMaster" || activeMenu === "?target=contractMaster") {
    	$("#corporatePkgId").show();
    } else {
    	$("#corporatePkgId").hide();
    }
    
	$('ul li a').click(function(){
        $('li a').removeClass("active-menu");
        $(this).addClass("active-menu");
        var activeMenu = $(this).attr("href");
        localStorage.setItem("activeMenu", activeMenu);
    });*/
   
    
    var arr = $('#sideMenuId > li');
    for (var i = 0; i < arr.length; i++) {
        //console.log("a:: "+$(arr[i]).text());
        //console.log($(this).find("a")[i].className);
    }
    
  
   
})

 function showSubMenu(subMenuId) {
    	$("#"+subMenuId).toggle();
    }