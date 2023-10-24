// Function to write a cookie with name and value, setting expiration to 1 year
function writeCookie(name, value) {
    // Create a new Date instance
    const currentDate = new Date();

    // Set the expiration time to 1 year in milliseconds from now
    const expirationTime = currentDate.getTime() + (365 * 24 * 60 * 60 * 1000);

    // Create a new Date instance for the expiration time
    const expiresDate = new Date(expirationTime);

    // Convert the expiresDate to a GMT formatted string
    const expiresGMT = expiresDate.toGMTString();

    // Create the cookie string with the provided name, value, and expiration
    const cookieString = `${name}=${value};expires=${expiresGMT};path=/`;

    // Set the cookie in the browser
    document.cookie = cookieString;
}
// Function to read a cookie's value by name
function readCookie(name) {
    // Construct the name prefix for searching in cookies
    const cookieNamePrefix = name + "=";

    // Decode the entire document's cookies
    const decodedCookies = decodeURIComponent(document.cookie);

    // Split the cookies into an array using semicolon as the separator
    const cookieArray = decodedCookies.split(';');

    // Loop through the cookie array
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];

        // Remove leading spaces
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }

        // Check if the current cookie starts with the desired name prefix
        if (cookie.indexOf(cookieNamePrefix) === 0) {
            // Return the value of the cookie after the name prefix
            return cookie.substring(cookieNamePrefix.length, cookie.length);
        }
    }

    // If no matching cookie was found, return an empty string
    return '';
}
// Function to load settings from cookies and update UI
function loadSettings() {
    // Check if the "info" cookie is set to "t" (true)
    if (readCookie("info") === "t") {
        // Hide elements with class "description"
        $(".description").hide();
        // Add "active" class to toggle button for descriptions
        $("#toggle_descriptions").addClass("active");
    }
    // Check if the "info" cookie is set to "f" (false)
    if (readCookie("info") === "f") {
        // Show elements with class "description"
        $(".description").show();
    }
    // Check if the "min" cookie is set to "t" (true)
    if (readCookie("min") === "t") {
        // Hide elements with class "minimal"
        $("div.minimal").hide();
        // Add "active" class to toggle button for minimal mode
        $("#toggle_minimal").addClass("active");
        // Add "minimal" class to <span> elements
        $("span").addClass("minimal");
    }
    // Check if the "min" cookie is set to "f" (false)
    if (readCookie("min") === "f") {
        // Show elements with class "minimal"
        $("div.minimal").show();
    }
    // Check if the "inst" cookie is set to "t" (true)
    if (readCookie("inst") === "t") {
        // Show elements with class "instructions"
        $(".instructions").show();
        // Add "active" class to toggle button for instructions
        $("#toggle_instructions").addClass("active");
    }
    // Check if the "orb" cookie is set to "f" (false)
    if (readCookie("orb") === "f") {
        // Add "active" class to toggle button for floating orb
        $("#toggle_floatingorb").addClass("active");
        // Remove "orb" class from the <body> element
        $("body").removeClass("orb");
    }
}
// Function to display a warning message with specified styling
function warning(message, bgcolor, color) {
    // Set the background color of elements with class "warning"
    $(".warning").css("background-color", bgcolor);
    
    // Set the text content of elements with class "warning_text"
    $(".warning_text").text(message);
    
    // Set the color of text within elements with class "warning_text"
    $(".warning_text").css("color", color);
}
// Function to apply fade-out animation to an element
function fadeout(div) {
    // Remove classes related to fade-in and visibility states
    div.removeClass("fadein maybe yes");
    
    // Add classes for fade-out animation and disabled state
    div.addClass("fadeout disabled");
}
// Function to apply fade-in animation to an element
function fadein(div) {
    // Remove classes related to fade-out, disabled, and other visibility states
    div.removeClass("fadeout disabled maybe yes");
    
    // Add class for fade-in animation
    div.addClass("fadein");
}
// Function to filter the ghost
function updateGhosts() {
    // Find IDs of evidence with value 0 (not selected)
    var foundEvidence = $('#evidence input').filter(function() {
        return this.value == 0;
    }).map(function() {
        return this.id;
    }).get();
    
// Initialize variables to track the minimum and maximum evidence left
    var minEvidenceLeft = Number.MAX_SAFE_INTEGER;
    var maxEvidenceLeft = 0;

// Loop through each ".evidence" element
    $(".evidence").each(function() {
        const ghostParent = $(this).parents(".ghost");

	// Remove "excluded" class from ghost parent
        ghostParent.removeClass("excluded");

        const numYesEvidence = $(this).children(".yes").length;

        if (numYesEvidence !== foundEvidence.length) {
            fadeout(ghostParent);
        } else if ($(this).children(".no").length > 0 || $(this).find(".no[required='true']").length > 0) {
            ghostParent.addClass("excluded");
            fadeout(ghostParent);
        } else {
            const thisEvidenceLeft = $(this).children("li:not(.yes)");

            if (thisEvidenceLeft.length < minEvidenceLeft) {
                minEvidenceLeft = thisEvidenceLeft.length;
            }
            if (thisEvidenceLeft.length > maxEvidenceLeft) {
                maxEvidenceLeft = thisEvidenceLeft.length;
            }

            fadein(ghostParent);
        }
    });
	
	// Filter valid and validable evidence for ghost elimination
    const validEvidence = $(".ghost:not(.disabled):not(.excluded) .evidence li:not(.yes)")
        .map(function() { return $(this).data("evidence"); })
        .get()
        .filter(function(value, index, self) { return self.indexOf(value) === index; });

    const validableEvidence = $(".ghost:not(.disabled).excluded .evidence li.no")
        .map(function() { return $(this).data("evidence"); })
        .get()
        .filter(function(value, index, self) { return self.indexOf(value) === index && validEvidence.indexOf(value) === -1; });

	// Update evidence list input elements
    $('#evidence_list input').filter(function() { return this.value != 0; }).each(function() {
        const inputParent = $(this).parents('li');
        if (validEvidence.includes($(this).attr("id")) || validableEvidence.includes($(this).attr("id"))) {
            inputParent.removeClass('disabled');
        } else {
            inputParent.addClass('disabled');
        }
    });

	// Display warning messages based on evidence combination
    if (maxEvidenceLeft >= 1) {
        if (minEvidenceLeft === maxEvidenceLeft) {

			// When only one piece of evidence is left
            if (maxEvidenceLeft === 1) {
                warning("Please select another evidence to identify the Ghost.", "#2f2f2f", "#fff");
            } else {
                warning("Please select up to " + maxEvidenceLeft + " pieces of evidence to narrow down the ghost. Click it again to eliminate it as a possibility.", "#2f2f2f", "#fff");
            }
        } else {
			// When multiple pieces of evidence are left
            warning("Please select up to " + maxEvidenceLeft + " pieces of evidence to narrow down the ghost. Click it again to eliminate it as a possibility.", "#2f2f2f", "#fff");
        }
    } else if ($(".ghost:not(.excluded):not(.disabled)").length === 1) {
		// When only one non-excluded and non-disabled ghost is left
        const Ghost = $(".ghost:not(.excluded):not(.disabled)");
        if ($(".ghost.excluded").length > 0) {
            Ghost.addClass("maybe");
            warning("A ghost! But how can you be so sure?", "#1faef4", "#000");
        } else {
            Ghost.addClass("yes");
            warning("Oh man, it's a ghost! Click the reset button above to start over.", "#55be61", "#000");
        }	
    } else if ($(".ghost.excluded").length > 0) {
		// When at least one ghost is excluded
        warning("You excluded a vital piece of evidence!", "#c61c1ce0", "#fff");
    } else {
		// When no combination of evidence works
        warning("No combination of evidence works!", "#c61c1ce0", "#fff");
    }
}
$(document).ready(function() {   
    // Initialize button groups and states
    const buttonGroups = {
        'salt': ['green', 'red', 'white'],
        'fingers': ['Green', 'Red', 'White']
		// Add more buttons here
    };
	
	//Switch images on button click
	const evidenceImages = {
		'salt': {
			'green': 'salt_yes.png',
			'white': 'salt_white.png',
			'red': 'salt_no.png'
		},
		'fingers': {
			'Green': 'pikel.jpg',
			'White': 'wtf.jpg',
			'Red': 'wtfTom.png'
		}
		// Add more Images here
	};
 	
	//Initialize Images call
	initializeButtons();

    const evidenceState = {};

    // Function to toggle buttons
	function toggleButtons(group, currentState) {
		const states = buttonGroups[group];
		const currentIndex = states.indexOf(currentState);
		const nextIndex = (currentIndex + 1) % states.length;
		const nextButton = `${group}_${states[nextIndex]}`;
		const nextImage = evidenceImages[group][states[nextIndex]];

		$(`#${group}_${currentState}`).hide();
		$(`#${nextButton}`).css('background', `url(${nextImage}) no-repeat`).show();
		evidenceState[evidenceMapping[group]] = states[nextIndex];
		updateGhostList();
	}

	// Function to update the ghost list based on evidence
	function updateGhostList() {
		$('.ghost').each(function() {
			const $ghost = $(this);
			let shouldShow = true;
			let allGreenMet = true;

			// Reset all evidence background colors to default
			$ghost.find('li[data-evidence]').css('background-color', '');

			Object.keys(evidenceState).forEach(evidenceType => {
				const state = evidenceState[evidenceType];
				const $evidence = $ghost.find(`li[data-evidence="${evidenceType}"]`);
				const hasEvidence = $evidence.length > 0;

				if (state === 'Green') {
					if (!hasEvidence) {
						allGreenMet = false;
						return false; // Break out of the loop
					} else {
						$evidence.css('background-color', 'green');
					}
				} else if (state === 'Red' && hasEvidence) {
					shouldShow = false;
				}
			});

			if (shouldShow && allGreenMet) {
				$ghost.show();
			} else {
				$ghost.hide();
			}
		});
	}

    // Attach click event listeners
    Object.keys(buttonGroups).forEach(group => {
        buttonGroups[group].forEach(state => {
            $(`#${group}_${state}`).click(function() {
                toggleButtons(group, state);
            });
        });
    });
	
	//Initialize Images function
	function initializeButtons() {
		Object.keys(buttonGroups).forEach(group => {
			const states = buttonGroups[group];
			states.forEach(state => {
				const $button = $(`#${group}_${state}`);
				if ($button.is(':visible')) {
					const initialImage = evidenceImages[group][state];
					$button.css('background', `url(${initialImage}) no-repeat`);
				}
			});
		});
	}

});  

// Function to handle toggling of instructions
$("#toggle_instructions").click(function() {
    // Check the current value of the "inst" cookie
    if (readCookie("inst") == "t") {
        // If it's "t" (true), change it to "f" (false)
        writeCookie("inst", "f");
        // Hide the instructions
        $(".instructions").hide();
        // Add the "active" class to the toggle button
        $("#toggle_instructions").addClass("active");
    } else {
        // If it's not "t" (true), change it to "t" (true)
        writeCookie("inst", "t");
        // Show the instructions
        $(".instructions").show();
        // Remove the "active" class from the toggle button
        $("#toggle_instructions").removeClass("active");
    }
});
// Function to handle toggling of descriptions
$("#toggle_descriptions").click(function() {
    // Check the current value of the "info" cookie
    if (readCookie("info") == "t") {
        // If it's "t" (true), change it to "f" (false)
        writeCookie("info", "f");
        // Show the descriptions
        $(".description").show();
        // Add the "active" class to the toggle button
        $("#toggle_descriptions").addClass("active");
    } else {
        // If it's not "t" (true), change it to "t" (true)
        writeCookie("info", "t");
        // Hide the descriptions
        $(".description").hide();
        // Remove the "active" class from the toggle button
        $("#toggle_descriptions").removeClass("active");
    }
});
// Function to handle toggling of minimal view
$("#toggle_minimal").click(function() {
    // Check the current value of the "min" cookie
    if (readCookie("min") == "t") {
        // If it's "t" (true), change it to "f" (false)
        writeCookie("min", "f");
        writeCookie("info", "f");
        // Show the div with class "minimal"
        $("div.minimal").show();
        // Remove the "minimal" class from <span> elements
        $("span").removeClass("minimal");
        // Show the descriptions
        $(".description").show();
        // Add the "active" class to the toggle button
        $("#toggle_minimal").addClass("active");
        // Remove the "active" class from the toggle button for descriptions
        $("#toggle_descriptions").removeClass("active");
    } else {
        // If it's not "t" (true), change it to "t" (true)
        writeCookie("min", "t");
        writeCookie("info", "t");
        // Hide the div with class "minimal"
        $("div.minimal").hide();
        // Add the "minimal" class to <span> elements
        $("span").addClass("minimal");
        // Hide the descriptions
        $(".description").hide();
        // Remove the "active" class from the toggle button
        $("#toggle_minimal").removeClass("active");
        // Add the "active" class to the toggle button for descriptions
        $("#toggle_descriptions").addClass("active");
    }
});
// Function to handle toggling of floating orb
$("#toggle_floatingorb").click(function() {
    // Check the current value of the "orb" cookie
    if (readCookie("orb") == "f") {
        // If it's "f" (false), change it to "t" (true)
        writeCookie("orb", "t");
        // Add the "active" class to the toggle button
        $("#toggle_floatingorb").addClass("active");
        // Add the "orb" class to the <body> element
        $("body").addClass("orb");
    } else {
        // If it's not "f" (false), change it to "f" (false)
        writeCookie("orb", "f");
        // Remove the "active" class from the toggle button
        $("#toggle_floatingorb").removeClass("active");
        // Remove the "orb" class from the <body> element
        $("body").removeClass("orb");
    }
});
// Function to handle toggling of buttons within the ".toggle_buttons" container
$(".toggle_buttons a").each(function() {
    // Attach a click event handler to each button
    $(this).click(function() {
        // Toggle the "active" class on the clicked button
        $(this).toggleClass("active");
    });
});
// Attach the "change" event to the input elements within the element with ID "role_list"
$("#role_list input").change(function() {
    // Get all the input elements in the "role_list"
    const possessionsOptions = $("#role_list input");
    // Determine if an uncheck event occurred
    const wasAnUncheck = !$(this).prop("checked");
    // Get the type of possession (role) based on whether it was unchecked
    const possessionsType = !wasAnUncheck ? $(this).prop("id") : null;

    possessionsOptions.each(async function (i, item) {
        const curOption = $(item);
        if (!curOption.prop("checked") && !wasAnUncheck) {
            curOption.parent().addClass("disabled").removeClass("active");
        } else {
            curOption.parent().removeClass("disabled").addClass("active");
        }
    });

    // Reveal the appropriate companion text for the selected role
    var textToRevealID = null;

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
        // Add cases for other roles...
        // ...
    }
    // Show the relevant hint text and hide others
    $("#role_hints").children().addClass("hidden");
    $("#role_hints").children(`#${textToRevealID}`).removeClass("hidden");
});
// Evidence has changed, update all affected ghosts
$("#evidence_list input").change(function() {

    // Get the ID of the changed evidence
    var changedEvidence = $(this).attr("id");
    
    // Find the ghosts associated with the changed evidence
    var changedGhosts = $("ul.evidence > li").filter(function(){
        return $(this).data("evidence") === changedEvidence;
    });

    if (this.value == 1) {
        // Reset the evidence to "not selected"
        $(this).removeClass("yes no");
        // Reset associated ghosts' evidence to "not selected"
        changedGhosts.each(function() {
            $(this).removeClass("yes no");
        });
    } else if (this.value == 0) {
        // Mark evidence as "yes" and remove "no"
        $(this).removeClass("no").addClass("yes");
        // Mark associated ghosts' evidence as "yes" and remove "no"
        changedGhosts.each(function() {
            $(this).removeClass("no").addClass("yes");
        });
    } else if (this.value == 2) {
        // Mark evidence as "no" and remove "yes"
        $(this).removeClass("yes").addClass("no");
        // Mark associated ghosts' evidence as "no" and remove "yes"
        changedGhosts.each(function() {
            $(this).removeClass("yes").addClass("no");
        });
    }

    // Check if the button has a value of "1" and add/remove "active" class accordingly
    if (this.value === "1") {
        $(this).addClass("active");
    } else {
        $(this).removeClass("active");
    }

    // Update the ghost display based on the changed evidence
    updateGhosts();
});

// chandge the way ghost are toggles with buttons
