/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/



(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile)
			$body.addClass('is-touch');

	// Forms.
		var $form = $('form');

		// Auto-resizing textareas.
			$form.find('textarea').each(function() {

				var $this = $(this),
					$wrapper = $('<div class="textarea-wrapper"></div>'),
					$submits = $this.find('input[type="submit"]');

				$this
					.wrap($wrapper)
					.attr('rows', 1)
					.css('overflow', 'hidden')
					.css('resize', 'none')
					.on('keydown', function(event) {

						if (event.keyCode == 13
						&&	event.ctrlKey) {

							event.preventDefault();
							event.stopPropagation();

							$(this).blur();

						}

					})
					.on('blur focus', function() {
						$this.val($.trim($this.val()));
					})
					.on('input blur focus --init', function() {

						$wrapper
							.css('height', $this.height());

						$this
							.css('height', 'auto')
							.css('height', $this.prop('scrollHeight') + 'px');

					})
					.on('keyup', function(event) {

						if (event.keyCode == 9)
							$this
								.select();

					})
					.triggerHandler('--init');

				// Fix.
					if (browser.name == 'ie'
					||	browser.mobile)
						$this
							.css('max-height', '10em')
							.css('overflow-y', 'auto');

			});



//draggable

const container = document.querySelector(".notes-container");
const notes = document.querySelectorAll(".draggable");

let highestZ = 1;

notes.forEach(note => {

    // Current translation
    let translateX = 0;
    let translateY = 0;

    note.addEventListener("pointerdown", startDrag);

    function startDrag(e) {

        e.preventDefault();

        highestZ++;
        note.style.zIndex = highestZ;

        const containerRect = container.getBoundingClientRect();
        const noteRect = note.getBoundingClientRect();

        // Where inside the note the user grabbed
        const grabX = e.clientX - noteRect.left;
        const grabY = e.clientY - noteRect.top;

        function drag(e) {

            // Desired position inside the container
            let left = e.clientX - containerRect.left - grabX;
            let top = e.clientY - containerRect.top - grabY;

            // Keep inside container
            left = Math.max(
                0,
                Math.min(left, container.clientWidth - note.offsetWidth)
            );

            top = Math.max(
                0,
                Math.min(top, container.clientHeight - note.offsetHeight)
            );

            // Convert to translate values
            translateX = left - note.offsetLeft;
            translateY = top - note.offsetTop;

            note.style.transform =
                `translate(${translateX}px, ${translateY}px)`;
        }

        function stopDrag() {

            window.removeEventListener("pointermove", drag);
            window.removeEventListener("pointerup", stopDrag);

        }

        window.addEventListener("pointermove", drag);
        window.addEventListener("pointerup", stopDrag);

    }



});


// Arrow

const arrow = document.querySelector(".scroll-arrow");

window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        arrow.classList.add("hidden");
    } else {
        arrow.classList.remove("hidden");
    }
});

// document
// .getElementById("resetNotes")
// .addEventListener("click", () => {

//     notes.forEach(note => {

//         note.style.transform = "translate(0px,0px)";

//     });

// });
			// Menu.
		var $menu = $('#menu');

		$menu.wrapInner('<div class="inner"></div>');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					if (href == '#menu')
						return;

					window.setTimeout(function() {
						window.location.href = href;
					}, 350);

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});


	//  // Theme controls
	//  const lightModeBtn = document.querySelector(`[data-set-theme='light']`);
	// 	const darkModeBtn = document.querySelector(`[data-set-theme='dark']`);
	// 	const html = document.documentElement;

	// 	const setTheme = (theme) => {
	// 	// Clear all custom classes and attributes
	// 	document.documentElement.removeAttribute('data-theme');

	// 	if (theme === 'dark') {
	// 		html.setAttribute('data-theme', 'dark');
	// 	}

	// 	localStorage.setItem('theme', theme);
	// 	};

	// 	const loadTheme = () => {
	// 	const savedTheme = localStorage.getItem('theme');

	// 	if (savedTheme) {
	// 		setTheme(savedTheme);
	// 	}
	// 	};

	// 	// Event listeners for theme buttons
	// 	lightModeBtn.addEventListener('click', () => setTheme('light'));
	// 	darkModeBtn.addEventListener('click', () => setTheme('dark'));

	// 	// Load the theme when the page loads
	// 	loadTheme();

	const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

function setTheme(theme) {
    if (theme === "dark") {
        html.setAttribute("data-theme", "dark");
    } else {
        html.removeAttribute("data-theme");
    }

    localStorage.setItem("theme", theme);
}

function toggleTheme() {
    const current =
        html.getAttribute("data-theme") === "dark"
            ? "dark"
            : "light";

    setTheme(current === "dark" ? "light" : "dark");
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
}

themeToggle.addEventListener("click", toggleTheme);

loadTheme();

})(jQuery);

secret.addEventListener("mousemove", (e) => {
    secret.style.setProperty("--x", `${e.offsetX}px`);
    secret.style.setProperty("--y", `${e.offsetY}px`);
});


