var mustRequestCredit = 'Important: After completing the offer, you must complete the credit request form that loads in this window or tab.\n\nWe recommend taking a screenshot of the confirmation page.';
 

function GDPR_Acceptance($id, $consent_token, $age_token) {
	
			
	var result = $.ajax( { url: "/gdpr.php",
						   async: false,
						   method: "POST",
						   data: {action: 'consent', uiddata_id: $id, consent_token: $consent_token, age_token: $age_token } } ).responseText;
					
	if(result=='ok') {
		return true;
	} else {
		return false;
	}
}

function gdprinfo() {
	alert('To revoke your consent or request a copy of the data that we have, please contact customer service at gdpr_requests@revenueuniverse.com');
}



function changeFudgeFactor(cid, old) {
	var ff = prompt("Enter New FF", old);
	
	if (ff != null && ff != "") {

		
		    $.post("/admin/ajax.php", {action: 'editfudgefactor', cid: cid, fudgefactor: ff}, function(result){
		    if(result=='ok') {
		    	location.reload(true);
		    } else {
        		alert(result);
        	}
    }).fail( function(xhr, textStatus, errorThrown) {
        alert('XHR Failure: '+errorThrown);
    });
		
	}
}


function selectCat(cat) {
	$("#selectCat").val(cat).trigger('change');
}

function web2mobile(cid) {
	var addy = prompt("Please enter your email below to receive a download link for this offer to view on your mobile device.");
	
	if (addy != null && addy != "") {
		meatwad = web2mobileurl+"&email="+addy;
		
		
	   $.ajax({
			url: meatwad+"&campaign="+cid+"&rand=" + Math.random(),
			type: "GET",
			success: function(results) { 
				alert(results);
			}
		});
		
	}
}



function getUsername() {
	var addy = prompt("IMPORTANT: Please enter the username that you used to sign up for the casino.");
	
	if (addy != null && addy != "") {
		meatwad = senduser+"&user="+addy;
		
		
	   $.ajax({
			url: meatwad+"&campaign="+window.gblx+"&rand=" + Math.random(),
			type: "GET",
			success: function(results) { 
				alert(results);
			}
		});
		
	}
}


function selectLastItem($id) {
	var num = $($id+' option').length;
	$($id).prop('selectedIndex', num-1); // For choosing last item in list
}


function showMobileSurveys() {
	//selectLastItem("#cat");
	//mobileAjaxLoad();
	$(window).scrollTop(0);
	$("#cat").val('99');
	mobileCategorySelect();
}



function pingWall($id, $page) {
		
	   $.ajax({
			url: "/pingwall.php?id="+$id+"&page="+$page+"&hidden="+document.hidden+"&bust="+Math.random(),
			type: "GET",
			success: function(results) { 
				// do nothing
			}
		});
		
}



function ajaxClickCampaign($affiliate, $campaign, $app, $sid2, $src) {
		
	   $.ajax({
			url: "/click.php?affiliate="+$affiliate+"&campaign="+$campaign+"&sid=SFB_"+$app+"___&app="+$app+"&sid2="+$sid2+"&src="+$src,
			type: "GET",
			success: function(results) { 
				//alert(results);
			}
		});
		
}

function handleIt(url, campaign) {
	window.gblx = campaign;
	$(window).focus(function(e) {
		$(window).off("focus");
		setTimeout(getUsername, 500);
	});
	window.open(url);
	
}


function sendToMobile() {
	alert('Not quite done');
}

function collectMobile(uid, cid, hash) {
	var url = tomobileurl;
	url += "&foo"
	$.colorbox({scrolling:false, width:500, href:url});
}


function handleRedirect(url, whereto, msg) {
	alert(msg);
	window.gblx = whereto;
	$(window).focus(function(e) {
		$(window).off("focus");
		setTimeout(finalRedirect, 500);
	});
	window.open(url);
	
}


function finalRedirect() {
	window.location=window.gblx;
}


function setCookieHours(cname, cvalue, exhours) {
    var d = new Date();
    d.setTime(d.getTime() + (exhours*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    var crap = cname + "=" + cvalue + ";" + expires + ";path=/;secure;SameSite=None";
    document.cookie = crap;
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    var crap = cname + "=" + cvalue + ";" + expires + ";path=/;secure;SameSite=None";
    document.cookie = crap;
}

function updateAjaxLinks (param, value) {
//alert(param+' '+value);
$(".ajaxlink").attr("href", function(i, oldHref) {
  return updateURLstr(oldHref,param,value);
});
}
function updateAjaxLinks2 (param, value) {
//alert(param+' '+value);
$(".ajaxlink").attr("data-url", function(i, oldHref) {
  return updateURLstr(oldHref,param,value);
});
}



function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

function changeUrlParam (url, param, value) {
	var currentURL = url+'&';
	var change = new RegExp('('+param+')=(.*)&', 'g');
	var newURL = currentURL.replace(change, '$1='+value+'&');

	return newURL.slice(0, - 1);
}


function updateURLstr(url,key,val){
    var reExp = new RegExp("[\?|\&]"+key + "=[0-9a-zA-Z\_\+\-\|\.\,\;]*");

    if(reExp.test(url)) {
        // update
        var reExp = new RegExp("[\?&]" + key + "=([^&#]*)");
        var delimiter = reExp.exec(url)[0].charAt(0);
        url = url.replace(reExp, delimiter + key + "=" + val);
    } else {
        // add
        var newParam = key + "=" + val;
        if(!url.indexOf('?')){url += '?';}

        if(url.indexOf('#') > -1){
            var urlparts = url.split('#');
            url = urlparts[0] +  "&" + newParam +  (urlparts[1] ?  "#" +urlparts[1] : '');
        } else {
            url += "&" + newParam;
        }
    }
    return url;
}


function simpleUpdateCat(cat) {
	updateURL('cat', cat);
}

function simpleDoSort(sort) {
	updateAjaxLinks('sort', sort);
	var active = $( "#tabs" ).tabs("option", "active");
	$( "#tabs" ).tabs( "load", active );
	updateURL('sort', sort);
}

function mobileDoSort(sort) {
	updateAjaxLinks2('sort', sort);
	//var active = $( "#tabs" ).tabs("option", "active");
	//$( "#tabs" ).tabs( "load", active );
	updateURL('sort', sort);
	mobileCategorySelect();
}



function mobileAjaxLoad() {
	var sel = $('#cat').find('option:selected');
	var cat = sel.val();
	
	sel = $('#sortmenu').find('option:selected');
	var sort = sel.val();
	
	var url = updateURLstr(AJAX_URL, 'sort', sort);
	url = updateURLstr(url, 'cat', cat);
	
	var view = updateURLstr(VIEW_URL, 'sort', sort);
	view = updateURLstr(view, 'cat', cat);
	
	if(cat==99) {
		$('#offersDIV').html("<br><center><big><b>Loading...</b></big></center><br><br><br><br>");
		$('#offersDIV').load(SURVEY_URL, function() { $("#offersDIV").fadeTo(0, 1); } );
		$('#sortmenu').attr('disabled', true);
		$('.surveys').addClass('surveys-on').removeClass('surveys');
		$('.offers').addClass('offers-off').removeClass('offers');
	} else {
		$('#offersDIV').load(url, function() { $("#offersDIV").fadeTo(0, 1); });
		$('#sortmenu').attr('disabled', false);
		$('.surveys-on').addClass('surveys').removeClass('surveys-on');
		$('.offers-off').addClass('offers').removeClass('offers-off');
	}
    window.history.pushState(null, document.title, view);
}



function mobileCategorySelect() {
	var sel = $('#cat').find('option:selected');
	var url = sel.data('url');
	var cat = sel.val();
	
	$("#offersDIV").fadeTo(100, 0.5);
	
	mobileAjaxLoad();
}



function updateURL(key,val){
    var url = window.location.href;
    var reExp = new RegExp("[\?|\&]"+key + "=[0-9a-zA-Z\_\+\-\|\.\,\;]*");

    if(reExp.test(url)) {
        // update
        var reExp = new RegExp("[\?&]" + key + "=([^&#]*)");
        var delimiter = reExp.exec(url)[0].charAt(0);
        url = url.replace(reExp, delimiter + key + "=" + val);
    } else {
        // add
        var newParam = key + "=" + val;
        if(!url.indexOf('?')){url += '?';}

        if(url.indexOf('#') > -1){
            var urlparts = url.split('#');
            url = urlparts[0] +  "&" + newParam +  (urlparts[1] ?  "#" +urlparts[1] : '');
        } else {
            url += "&" + newParam;
        }
    }
    window.history.pushState(null, document.title, url);
}

function changeWindowParam (param, value) {
	var currentURL = window.location.href+'&';
	var change = new RegExp('('+param+')=(.*)&', 'g');
	var newURL = currentURL.replace(change, '$1='+value+'&');

	if (getURLParameter(param) !== null){
		try {
			window.history.replaceState('', '', newURL.slice(0, - 1) );
		} catch (e) {
			console.log(e);
		}
	} else {
		var currURL = window.location.href;
		if (currURL.indexOf("?") !== -1){
			window.history.replaceState('', '', currentURL.slice(0, - 1) + '&' + param + '=' + value);
		} else {
			window.history.replaceState('', '', currentURL.slice(0, - 1) + '?' + param + '=' + value);
		}
	}
}

function setUpButton(target, e) {
	$(target).mousedown(function() {
		$(this).addClass("press");
	})
	.mouseup(function() {
		$(this).removeClass("press");
	})
	.mouseout(function() {
		$(this).removeClass("press");
	})
	.click(e);
}

function setUpEvents() {
	setUpButton($(".button"));
	
	setUpButton($(".changeOffer"), function() {
    	$('.bigfeat').hide();
    	if($(this).hasClass("next")) {
			var next = $(this).closest('.bigfeat').nextAll('.bigfeat').eq(0);
			if (next.length === 0) next = $(this).closest('.bigfeat').prevAll('.bigfeat').last();
			if (next.length === 0) {
    			$('.bigfeat').show();
			} else {
				next.show();
			}
    	} else {
			var previous = $(this).closest('.bigfeat').prevAll('.bigfeat').eq(0);
			if (previous.length === 0) previous = $(this).closest('.bigfeat').nextAll('.bigfeat').last();
			if (previous.length === 0) {
    			$('.bigfeat').show();
			} else {
				previous.show();
			}
    	}
		fixUpFeatured();
	});
	
	$(".offer").find("img").load(function() {
		fixUpOfferRow($(this).parent());
	});
	
	headerButtons(false);
}

function headerButtons(mobileWall) {
	if(mobileWall) {
		var cbWidth = 400;
	} else {
		var cbWidth = 500;
	}
	
	$("#supportBtn").click(function() {
		if(wallsupport) {
			window.location=supporturl;
		}
	});
	
	$("#mobileBtn").click(function() {
		$.colorbox({scrolling:false, width:cbWidth, href:mobileurl});
	});
	
	
	$("#contestBtnTix").click(function() {
		if(contestsupport) {
			$.colorbox({scrolling:false, width:cbWidth, href:contesturl});
		}
	});
	
	$("#contestBtnCup").click(function() {
		if(contestsupport) {
			$.colorbox({scrolling:false, width:cbWidth, href:contesturl});
		}
	});
	
	if(!mobileWall) {
		// JavaScript SUCKS and is a trash language.
	
		$("#surveysBtn").click(function() {
			if(surveysupport) {
				window.open(surveyurl);
			}
		});
	}
}


function fixUpBottoms(row) {
	var bottom = row.find(".bottom");
	var z = row.offset().top + row.height() - bottom.outerHeight();
	
	bottom.offset({top: z});
}

function fixUpOfferRow(offer) {
  	fixUpBottoms(offer.parent());
}

function fixUpAllRows() {
  	$(".row").each(function() {
  		fixUpBottoms($(this));
	});
	
	fixUpFeatured();
}

function fixUpFeatured() {
	// Main Featured Offer Height
	var visfeat = $(".bigfeat:visible");
  	var x = visfeat.find(".feattxt").outerHeight()+visfeat.find(".button").outerHeight()-8; // tighten it up
  	visfeat.height(1);
  	var y = $("#featRow").outerHeight();
  	//console.log(x+" "+y);
  	visfeat.height(Math.max(x,y));
	
	fixUpBottoms($("#featRow").find(".row"));
  
  	// Side Featued Button Container, Float Bottom
  	try {
  		var x = $("#featDiv").find(".bottom").offset().top - $("#featDiv").find("img").height();
		$("#featDiv").find("img").offset({top: x});
	} catch(err) {
		// we don't care
	}
  	
  	// Main Featured Button, Float Bottom
  	var x = $("#featRow").offset().top+$("#featRow").height()-$("#featBut").outerHeight()-21;
	$(".feattxt > #featBut").offset({top: x});	
}