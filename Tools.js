function writeCookie(name,value) {
	d = new Date();
	d.setTime(d.getTime() + (365*24*60*60*1000));
	let expires = d.toGMTString();
	document.cookie = name + "=" + value + ";" + "expires=" + expires + ";path=/";
}
function readCookie(name) {
	let cname = name + "=";
	let dc = decodeURIComponent(document.cookie);
	let ca = dc.split(';');
	for(let i = 0;i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if(c.indexOf(cname) == 0) {
			return c.substring(cname.length, c.length);
		}
	}
	return "";
}

function loadSettings() {
	if(readCookie("info") == "t") {
		$(".description").hide();
		$("#toggle_descriptions").addClass("active");
	}
	if(readCookie("info") == "f") {
		$(".description").show();
	}
	if(readCookie("min") == "t") {
		$("div.minimal").hide();
		$("#toggle_minimal").addClass("active");
		$("span").addClass("minimal");
	}
	if(readCookie("min") == "f") {
		$("div.minimal").show();
	}
	if(readCookie("inst") == "t") {
		$(".instructions").show();
		$("#toggle_instructions").addClass("active");
	}
	if (readCookie("orb") == "f") {
		$("#toggle_floatingorb").addClass("active");
		$("body").removeClass("orb");
	}
}

$("#toggle_instructions").click(function(){
	if(readCookie("inst") == "t") {
		writeCookie("inst","f");
		$(".instructions").hide();
		$("#toggle_instructions").addClass("active");
	
	} else {
		writeCookie("inst","t");
		$(".instructions").show();
		$("#toggle_instructions").removeClass("active");
	}
	
});

$("#toggle_descriptions").click(function(){
	if(readCookie("info") == "t") {
		writeCookie("info","f");
		$(".description").show();
		$("#toggle_descriptions").addClass("active");
	} else {
		writeCookie("info","t");
		$(".description").hide();
		$("#toggle_descriptions").removeClass("active");
	}
});

$(".toggle_buttons a").each(function(){
	$(this).click(function(){
		$(this).toggleClass("active");
	});
});

$("#role_list input").change(function() {
	const possessionsOptions = $("#role_list input");
	const wasAnUncheck = !$(this).prop("checked");
	const possessionsType = !wasAnUncheck ? $(this).prop("id") : null;

	/**
	 * Loop through each option and add/remove the "disabled" class
	 * depending on whether it's checked.
	 **/
	possessionsOptions.each(async function (i, item) {
		const curOption = $(item);
		if (!curOption.prop("checked") && !wasAnUncheck) {
			curOption.parent().addClass("disabled").removeClass("active");
		}
		else {
			curOption.parent().removeClass("disabled").addClass("active");
		}
	});

	// Reveal the appropiate companion text for role meaning.
	var textToRevealID = null

	if (wasAnUncheck) {
		$("#role_hints").addClass("hidden");
	} else {
		$("#role_hints").removeClass("hidden");
	}

	switch (possessionsType) {
		case 'doctor': textToRevealID = "doctor_hint";
            break;
        case 'hunter': textToRevealID = "hunter_hint";
            break;
        case 'priest': textToRevealID = "priest_hint";
            break;
        case 'medium': textToRevealID = "medium_hint";
            break;
        case 'prepper': textToRevealID = "prepper_hint";
            break;
        case 'psychologist': textToRevealID = "psychologist_hint";
            break;
		case 'witch': textToRevealID = "witch_hint";
            break;
		case 'investigator': textToRevealID = "investigator_hint";
            break;
		case 'druid': textToRevealID = "druid_hint";
            break;
		case 'half_demon': textToRevealID = "half_demon_hint";
            break;
	}

	$("#role_hints").children().addClass("hidden");
	$("#role_hints").children(`#${textToRevealID}`).removeClass("hidden");
});

$(document).ready(reset);