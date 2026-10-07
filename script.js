/* =====================================================
   BRYCE - OUR LITTLE MVP
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       ELEMENTS
    ================================================= */

    const openingScreen =
        document.getElementById("opening-screen");

    const openInvitation =
        document.getElementById("openInvitation");

    const invitation =
        document.getElementById("invitation");

    const rsvpButton =
        document.getElementById("rsvpButton");

    const rsvpModal =
        document.getElementById("rsvpModal");

    const closeRsvp =
        document.getElementById("closeRsvp");

    const basketballEffects =
        document.getElementById("basketballEffects");


    /* =================================================
       OPEN INVITATION
    ================================================= */

    if (openInvitation && openingScreen) {

        openInvitation.addEventListener("click", function () {

            openingScreen.classList.add("hide");

            document.body.style.overflow = "auto";

        });

    }


    /* =================================================
       INITIAL BODY STATE
    ================================================= */

    document.body.style.overflow = "hidden";


    /* =================================================
       COUNTDOWN
       
       EVENT:
       OCTOBER 24, 2026
       11:00 AM
    ================================================= */

    const eventDate =
        new Date("October 24, 2026 11:00:00").getTime();


    function updateCountdown() {

        const now =
            new Date().getTime();

        const difference =
            eventDate - now;


        const daysElement =
            document.getElementById("days");

        const hoursElement =
            document.getElementById("hours");

        const minutesElement =
            document.getElementById("minutes");

        const secondsElement =
            document.getElementById("seconds");


        /*
         * If countdown elements don't exist,
         * simply stop this function.
         */

        if (
            !daysElement ||
            !hoursElement ||
            !minutesElement ||
            !secondsElement
        ) {
            return;
        }


        /* =============================================
           EVENT HAS STARTED
        ============================================= */

        if (difference <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            return;
        }


        /* =============================================
           CALCULATE TIME
        ============================================= */

        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );

        const hours =
            Math.floor(
                (difference %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );

        const minutes =
            Math.floor(
                (difference %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );

        const seconds =
            Math.floor(
                (difference %
                    (1000 * 60)) /
                1000
            );


        /* =============================================
           DISPLAY
        ============================================= */

        daysElement.textContent =
            String(days).padStart(2, "0");

        hoursElement.textContent =
            String(hours).padStart(2, "0");

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

        secondsElement.textContent =
            String(seconds).padStart(2, "0");
    }


    /*
     * Run immediately so there isn't
     * a blank countdown at first.
     */

    updateCountdown();


    /*
     * Update every second.
     */

    setInterval(updateCountdown, 1000);



    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        /*
         * Fallback for older browsers.
         */

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }



    /* =================================================
       RSVP MODAL
    ================================================= */

    function openRsvpModal() {

        if (!rsvpModal) {
            return;
        }

        rsvpModal.classList.add("show");

        document.body.style.overflow = "hidden";
    }


    function closeRsvpModal() {

        if (!rsvpModal) {
            return;
        }

        rsvpModal.classList.remove("show");

        /*
         * Only restore scrolling if the invitation
         * has already been opened.
         */

        if (
            openingScreen &&
            openingScreen.classList.contains("hide")
        ) {

            document.body.style.overflow = "auto";

        }

    }


    if (rsvpButton) {

        rsvpButton.addEventListener(
            "click",
            openRsvpModal
        );

    }


    if (closeRsvp) {

        closeRsvp.addEventListener(
            "click",
            closeRsvpModal
        );

    }


    /* =================================================
       CLOSE MODAL WHEN CLICKING OUTSIDE
    ================================================= */

    if (rsvpModal) {

        rsvpModal.addEventListener(
            "click",
            function (event) {

                if (event.target === rsvpModal) {

                    closeRsvpModal();

                }

            }
        );

    }



    /* =================================================
       CLOSE MODAL WITH ESC KEY
    ================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeRsvpModal();

            }

        }
    );



    /* =================================================
       FLOATING BASKETBALL EFFECT
    ================================================= */

    function createFloatingBall() {

        if (!basketballEffects) {
            return;
        }


        const ball =
            document.createElement("div");

        ball.className =
            "floating-ball";


        /*
         * Random horizontal position
         */

        const randomLeft =
            Math.random() * 100;


        /*
         * Random size
         */

        const randomSize =
            22 + Math.random() * 25;


        ball.style.left =
            randomLeft + "%";

        ball.style.width =
            randomSize + "px";

        ball.style.height =
            randomSize + "px";


        /*
         * Slightly random animation duration
         */

        const duration =
            5 + Math.random() * 4;

        ball.style.animationDuration =
            duration + "s";


        basketballEffects.appendChild(ball);


        /*
         * Remove ball after animation
         */

        setTimeout(
            function () {

                if (ball.parentNode) {

                    ball.parentNode.removeChild(ball);

                }

            },
            duration * 1000
        );

    }


    /*
     * Create a basketball every 2.5 seconds.
     */

    setInterval(
        createFloatingBall,
        2500
    );



    /* =================================================
       EXTRA BALL WHEN USER SCROLLS
    ================================================= */

    let lastScrollTime = 0;


    window.addEventListener(
        "scroll",
        function () {

            const now =
                Date.now();


            /*
             * Prevent creating too many balls
             * during fast scrolling.
             */

            if (
                now - lastScrollTime > 700
            ) {

                createFloatingBall();

                lastScrollTime = now;

            }

        },
        {
            passive: true
        }
    );



    /* =================================================
       BASKETBALL CLICK EFFECT
    ================================================= */

    if (openInvitation) {

        openInvitation.addEventListener(
            "click",
            function () {

                /*
                 * Create several balls when
                 * opening the invitation.
                 */

                for (
                    let i = 0;
                    i < 6;
                    i++
                ) {

                    setTimeout(
                        function () {

                            createFloatingBall();

                        },
                        i * 100
                    );

                }

            }
        );

    }



    /* =================================================
       PREVENT RSVP LINK PLACEHOLDER
       
       If user hasn't replaced the Google Form URL,
       show a helpful message instead of navigating
       to a fake URL.
    ================================================= */

    const rsvpLinks =
        document.querySelectorAll(
            'a[href="YOUR_GOOGLE_FORM_LINK_HERE"]'
        );


    rsvpLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    alert(
                        "Please add your Google Form link in index.html first."
                    );

                }
            );

        }
    );


});