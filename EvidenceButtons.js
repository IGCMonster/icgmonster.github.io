
$(document).ready(function() {
    // Initialize button groups and states
    const buttonGroups = {
		// Defense checkboxes
		'salt': ['Green', 'Red', 'White'],
		'pentagram': ['Green', 'Red', 'White'],
		'pentagrams_seen': ['Green', 'Red', 'White'],
		'shotgun_evidence': ['Green', 'Red', 'White'],
		'holy_water': ['Green', 'Red', 'White'],
		'knife_evidence': ['Green', 'Red', 'White'],
		'katana_evidence': ['Green', 'Red', 'White'],
		// Evidence checkboxes
		'emf': ['Green', 'Red', 'White'],
		'emf_5': ['Green', 'Red', 'White'],
		'cold_spots': ['Green', 'Red', 'White'],
		'freezing': ['Green', 'Red', 'White'],
		'motion': ['Green', 'Red', 'White'],
		'ghost_box': ['Green', 'Red', 'White'],
		'handprint': ['Green', 'Red', 'White'],
		'ghost_orbs': ['Green', 'Red', 'White'],
		'ouija_board': ['Green', 'Red', 'White'],
		'ghost_doll': ['Green', 'Red', 'White'],
		'crystal_ball': ['Green', 'Red', 'White'],
		'statue_of_mary': ['Green', 'Red', 'White'],
		'candle': ['Green', 'Red', 'White'],
		'h2s_meter': ['Green', 'Red', 'White'],
		// Behavior checkboxes
		'light_switches': ['Green', 'Red', 'White'],
		'brakes_lights': ['Green', 'Red', 'White'],
		'screams': ['Green', 'Red', 'White'],
		'flips_crosses': ['Green', 'Red', 'White'],
		'fuse_box': ['Green', 'Red', 'White'],
		'writes_walls': ['Green', 'Red', 'White'],
		'flashlight_flickers': ['Green', 'Red', 'White'],
		'television': ['Green', 'Red', 'White'],
		'knock': ['Green', 'Red', 'White'],
		'contact': ['Green', 'Red', 'White'],
		'throw_objects': ['Green', 'Red', 'White'],
		// Visible checkboxes
		'visible': ['Green', 'Red', 'White'],
		// Exorcisms checkboxes
		'burning_exorcism': ['Green', 'Red', 'White'],
		'book_exorcism': ['Green', 'Red', 'White'],
		'knife_exorcism': ['Green', 'Red', 'White'],
		'katana_exorcism': ['Green', 'Red', 'White'],
		'shotgun_exorcism': ['Green', 'Red', 'White'],
    };
	
	//Switch images on button click
	const evidenceImages = {
		// Defense checkboxe
		'salt': {
			'Green': 'salt_Green.png',
			'White': 'salt_White.png',
			'Red': 'salt_Red.png'
		},
		'pentagram': {
			'Green': 'pentagram_Green.png',
			'White': 'pentagram_White.png',
			'Red': 'pentagram_Red.png'
		},
		'pentagrams_seen': {
			'Green': 'pentagram_seen_Green.png',
			'White': 'pentagram_seen_White.png',
			'Red': 'pentagram_seen_Red.png'
		},
		'shotgun_evidence': {
			'Green': 'shotgun_evidence_Green.png',
			'White': 'shotgun_evidence_White.png',
			'Red': 'shotgun_evidence_Red.png'
		},
		'holy_water': {
			'Green': 'holy_water_Green.png',
			'White': 'holy_water_White.png',
			'Red': 'holy_water_Red.png'
		},
		'katana_evidence': {
			'Green': 'katana_evidence_Green.png',
			'White': 'katana_evidence_White.png',
			'Red': 'katana_evidence_Red.png'
		},
		'knife_evidence': {
			'Green': 'knife_evidence_Green.png',
			'White': 'knife_evidence_White.png',
			'Red': 'knife_evidence_Red.png'
		},
		// Evidence checkboxes		
		'emf': {
			'Green': 'emf_Green.png',
			'White': 'emf_White.png',
			'Red': 'emf_Red.png'
		},
		'emf_5': {
			'Green': 'emf_5_Green.png',
			'White': 'emf_5_White.png',
			'Red': 'emf_5_Red.png'
		},
		'cold_spots': {
			'Green': 'cold_spots_Green.png',
			'White': 'cold_spots_White.png',
			'Red': 'cold_spots_Red.png'
		},
		'freezing': {
			'Green': 'freezing_Green.png',
			'White': 'freezing_White.png',
			'Red': 'freezing_Red.png'
		},		
		'motion': {
			'Green': 'motion_Green.png',
			'White': 'motion_White.png',
			'Red': 'motion_Red.png'
		},		
		'ghost_box': {
			'Green': 'ghost_box_Green.png',
			'White': 'ghost_box_White.png',
			'Red': 'ghost_box_Red.png'
		},
		'handprint': {
			'Green': 'handprint_Green.png',
			'White': 'handprint_White.png',
			'Red': 'handprint_Red.png'
		},		
		'ghost_orbs': {
			'Green': 'ghost_orbs_Green.png',
			'White': 'ghost_orbs_White.png',
			'Red': 'ghost_orbs_Red.png'
		},	
		'ouija_board': {
			'Green': 'ouija_board_Green.png',
			'White': 'ouija_board_White.png',
			'Red': 'ouija_board_Red.png'
		},
		'ghost_doll': {
			'Green': 'ghost_doll_Green.png',
			'White': 'ghost_doll_White.png',
			'Red': 'ghost_doll_Red.png'
		},
		'crystal_ball': {
			'Green': 'crystal_ball_Green.png',
			'White': 'crystal_ball_White.png',
			'Red': 'crystal_ball_Red.png'
		},
		'statue_of_mary': {
			'Green': 'statue_of_mary_Green.png',
			'White': 'statue_of_mary_White.png',
			'Red': 'statue_of_mary_Red.png'
		},
		'candle': {
			'Green': 'candle_Green.png',
			'White': 'candle_White.png',
			'Red': 'candle_Red.png'
		},
		'h2s_meter': {
			'Green': 'h2s_meter_Green.png',
			'White': 'h2s_meter_White.png',
			'Red': 'h2s_meter_Red.png'
		},
		// Behavior checkboxes
		'light_switches': {
			'Green': 'light_switches_Green.png',
			'White': 'light_switches_White.png',
			'Red': 'light_switches_Red.png'
		},
		'brakes_lights': {
			'Green': 'brakes_lights_Green.png',
			'White': 'brakes_lights_White.png',
			'Red': 'brakes_lights_Red.png'
		},
		'screams': {
			'Green': 'screams_Green.png',
			'White': 'screams_White.png',
			'Red': 'screams_Red.png'
		},
		'flips_crosses': {
			'Green': 'flips_crosses_Green.png',
			'White': 'flips_crosses_White.png',
			'Red': 'flips_crosses_Red.png'
		},
		'fuse_box': {
			'Green': 'fuse_box_Green.png',
			'White': 'fuse_box_White.png',
			'Red': 'fuse_box_Red.png'
		},
		'writes_walls': {
			'Green': 'writes_walls_Green.png',
			'White': 'writes_walls_White.png',
			'Red': 'writes_walls_Red.png'
		},
		'flashlight_flickers': {
			'Green': 'flashlight_flickers_Green.png',
			'White': 'flashlight_flickers_White.png',
			'Red': 'flashlight_flickers_Red.png'
		},
		'television': {
			'Green': 'television_Green.png',
			'White': 'television_White.png',
			'Red': 'television_Red.png'
		},
		'knock': {
			'Green': 'knock_Green.png',
			'White': 'knock_White.png',
			'Red': 'knock_Red.png'
		},
		'contact': {
			'Green': 'contact_Green.png',
			'White': 'contact_White.png',
			'Red': 'contact_Red.png'
		},
		'throw_objects': {
			'Green': 'throw_objects_Green.png',
			'White': 'throw_objects_White.png',
			'Red': 'throw_objects_Red.png'
		},
		// Visible checkboxes
		'visible': {
			'Green': 'visible_Green.png',
			'White': 'visible_White.png',
			'Red': 'visible_Red.png'
		},
		// Exorcisms checkboxes
		'burning_exorcism': {
			'Green': 'burning_exorcism_Green.png',
			'White': 'burning_exorcism_White.png',
			'Red': 'burning_exorcism_Red.png'
		},
		'book_exorcism': {
			'Green': 'book_exorcism_Green.png',
			'White': 'book_exorcism_White.png',
			'Red': 'book_exorcism_Red.png'
		},
		'knife_exorcism': {
			'Green': 'knife_exorcism_Green.png',
			'White': 'knife_exorcism_White.png',
			'Red': 'knife_exorcism_Red.png'
		},
		'katana_exorcism': {
			'Green': 'katana_exorcism_Green.png',
			'White': 'katana_exorcism_White.png',
			'Red': 'katana_exorcism_Red.png'
		},	
		'shotgun_exorcism': {
			'Green': 'shotgun_evidence_Green.png',
			'White': 'shotgun_evidence_White.png',
			'Red': 'shotgun_evidence_Red.png'
		},	
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
		evidenceState[group] = states[nextIndex];  // Changed this line
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
	$("#resetButton").click(function() {
		// Reset evidence buttons to initial state (White)
		Object.keys(buttonGroups).forEach(group => {
			const initialState = 'White';
			$(`#${group}_${initialState}`).show();
			buttonGroups[group].forEach(state => {
				if (state !== initialState) {
					$(`#${group}_${state}`).hide();
				}
			});
		});
	
		// Reset ghost elements to initial state (visible and no background color)
		$('.ghost').show();
		$('.ghost').find('li[data-evidence]').css('background-color', '');
	
		// Reset internal evidence state
		Object.keys(evidenceState).forEach(evidenceType => {
			evidenceState[evidenceType] = 'White';
		});
	}); 	
});
//added the throw Objects Button to the App 4/30/2024
