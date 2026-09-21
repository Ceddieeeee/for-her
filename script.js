/* ==================================================
   GET SECTIONS
================================================== */

const opening =
    document.getElementById("opening");

const secondSection =
    document.getElementById("secondSection");

const letterSection =
    document.getElementById("letterSection");


/* ==================================================
   GET BUTTONS
================================================== */

const yesButton =
    document.getElementById("yesButton");

const noButton =
    document.getElementById("noButton");

const backFromSecond =
    document.getElementById("backFromSecond");

const continueButton =
    document.getElementById("continueButton");


/* ==================================================
   GET ENVELOPE
================================================== */

const envelope =
    document.getElementById("envelope");

const heartButton =
    document.getElementById("heartButton");

const envelopeScreen =
    document.getElementById("envelopeScreen");

const letterContent =
    document.getElementById("letterContent");

const letterScroll =
    document.querySelector(".letter-scroll");


/* ==================================================
   CHANGE SECTION
================================================== */

function changeSection(nextSection) {

    const currentSection =
        document.querySelector(".section.active");


    if (!currentSection) {

        nextSection.classList.add("active");

        return;

    }


    if (currentSection === nextSection) {

        return;

    }


    currentSection.classList.remove("active");


    setTimeout(() => {

        nextSection.classList.add("active");

    }, 100);

}


/* ==================================================
   YES
================================================== */

yesButton.addEventListener(
    "click",
    () => {

        resetLetter();

        changeSection(letterSection);

    }
);


/* ==================================================
   NO
================================================== */

noButton.addEventListener(
    "click",
    () => {

        changeSection(secondSection);

    }
);


/* ==================================================
   GO BACK
================================================== */

backFromSecond.addEventListener(
    "click",
    () => {

        changeSection(opening);

    }
);


/* ==================================================
   OPEN ENVELOPE
================================================== */

heartButton.addEventListener(
    "click",
    () => {

        /*
         * Prevent multiple clicks.
         */

        heartButton.disabled = true;


        /*
         * Open envelope.
         */

        envelope.classList.add("open");


        /*
         * Fade away envelope screen.
         */

        setTimeout(() => {

            envelopeScreen.classList.add("hide");

        }, 750);


        /*
         * Reveal letter.
         */

        setTimeout(() => {

            letterContent.classList.add("open");


            /*
             * Start letter from top.
             */

            if (letterScroll) {

                letterScroll.scrollTop = 0;

            }

        }, 1150);

    }
);


/* ==================================================
   RESET LETTER
================================================== */

function resetLetter() {

    envelope.classList.remove("open");

    envelopeScreen.classList.remove("hide");

    letterContent.classList.remove("open");

    heartButton.disabled = false;


    if (letterScroll) {

        letterScroll.scrollTop = 0;

    }

}


/* ==================================================
   CONTINUE BUTTON
================================================== */

continueButton.addEventListener(
    "click",
    () => {

        /*
         * This is intentionally left
         * ready for the next section.
         */

        console.log(
            "Continue button clicked."
        );

    }
);