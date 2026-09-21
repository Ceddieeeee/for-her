/* ========================================================= */
/* SECTION CONTROL                                            */
/* ========================================================= */

const openingSection = document.getElementById("openingSection");
const waitSection = document.getElementById("waitSection");
const letterSection = document.getElementById("letterSection");
const proposalSection = document.getElementById("proposalSection");
const finalSection = document.getElementById("finalSection");

let currentSection = openingSection;

function changeSection(nextSection) {

    if (currentSection === nextSection) {
        return;
    }

    currentSection.classList.remove("active");

    setTimeout(() => {

        nextSection.classList.add("active");

        currentSection = nextSection;

    }, 100);
}


/* ========================================================= */
/* SECTION 1 BUTTONS                                          */
/* ========================================================= */

const yesOpening = document.getElementById("yesOpening");
const noOpening = document.getElementById("noOpening");

yesOpening.addEventListener("click", () => {

    resetLetter();

    changeSection(letterSection);

});


noOpening.addEventListener("click", () => {

    changeSection(waitSection);

});


/* ========================================================= */
/* SECTION 2 BACK BUTTON                                      */
/* ========================================================= */

const backButton = document.getElementById("backButton");

backButton.addEventListener("click", () => {

    changeSection(openingSection);

});


/* ========================================================= */
/* SECTION 3 — LETTER ENVELOPE                                */
/* ========================================================= */

const envelope = document.getElementById("envelope");

const heartButton = document.getElementById("heartButton");

const envelopeScreen = document.getElementById("envelopeScreen");

const letterContent = document.getElementById("letterContent");

const letterScroll = document.querySelector(".letter-scroll");


heartButton.addEventListener("click", () => {

    heartButton.disabled = true;

    envelope.classList.add("open");

    setTimeout(() => {

        envelopeScreen.classList.add("hidden");

    }, 750);

    setTimeout(() => {

        letterContent.classList.add("visible");

        letterScroll.scrollTop = 0;

    }, 1150);

});


/* ========================================================= */
/* RESET LETTER                                               */
/* ========================================================= */

function resetLetter() {

    envelope.classList.remove("open");

    envelopeScreen.classList.remove("hidden");

    letterContent.classList.remove("visible");

    heartButton.disabled = false;

    letterScroll.scrollTop = 0;

}


/* ========================================================= */
/* SECTION 3 → SECTION 4                                     */
/* ========================================================= */

const continueButton = document.getElementById("continueButton");

continueButton.addEventListener("click", () => {

    resetProposal();

    changeSection(proposalSection);

});


/* ========================================================= */
/* SECTION 4 — ARROW SHOOTING                                 */
/* ========================================================= */

const arrow = document.getElementById("arrow");

const shootArea = document.getElementById("shootArea");

const targetHeart = document.getElementById("targetHeart");

const proposalEnvelope = document.getElementById("proposalEnvelope");

const arrowStage = document.getElementById("arrowStage");

const questionStage = document.getElementById("questionStage");

let isDraggingArrow = false;

let arrowHasHit = false;

let arrowStartX = 0;

let arrowStartY = 0;

let arrowOriginalLeft = 0;

let arrowOriginalTop = 0;


/* ========================================================= */
/* ARROW POSITION                                             */
/* ========================================================= */

function getArrowPosition() {

    return {
        left: parseFloat(arrow.style.left) || 6,
        top: parseFloat(arrow.style.top) || 55
    };

}


/* ========================================================= */
/* POINTER DOWN                                               */
/* ========================================================= */

arrow.addEventListener("pointerdown", (event) => {

    if (arrowHasHit) {
        return;
    }

    isDraggingArrow = true;

    arrow.setPointerCapture(event.pointerId);

    const arrowRect = arrow.getBoundingClientRect();

    arrowStartX = event.clientX;

    arrowStartY = event.clientY;

    arrowOriginalLeft = arrow.offsetLeft;

    arrowOriginalTop = arrow.offsetTop;

    arrow.style.transition = "none";

    event.preventDefault();

});


/* ========================================================= */
/* POINTER MOVE                                               */
/* ========================================================= */

arrow.addEventListener("pointermove", (event) => {

    if (!isDraggingArrow || arrowHasHit) {
        return;
    }

    const shootRect = shootArea.getBoundingClientRect();

    const deltaX = event.clientX - arrowStartX;

    const deltaY = event.clientY - arrowStartY;

    let newLeft = arrowOriginalLeft + deltaX;

    let newTop = arrowOriginalTop + deltaY;


    /* Keep arrow inside the shooting area */

    const maxLeft = shootArea.clientWidth - arrow.offsetWidth;

    const maxTop = shootArea.clientHeight - arrow.offsetHeight;


    newLeft = Math.max(
        0,
        Math.min(newLeft, maxLeft)
    );

    newTop = Math.max(
        0,
        Math.min(newTop, maxTop)
    );


    arrow.style.left = `${newLeft}px`;

    arrow.style.top = `${newTop}px`;

    checkArrowHit();

});


/* ========================================================= */
/* POINTER UP                                                 */
/* ========================================================= */

arrow.addEventListener("pointerup", (event) => {

    if (!isDraggingArrow) {
        return;
    }

    isDraggingArrow = false;

    arrow.releasePointerCapture(event.pointerId);

    arrow.style.transition =
        "transform 0.25s ease, opacity 0.3s ease";

    checkArrowHit();

});


/* ========================================================= */
/* CHECK IF ARROW HIT HEART                                   */
/* ========================================================= */

function checkArrowHit() {

    if (arrowHasHit) {
        return;
    }

    const arrowRect = arrow.getBoundingClientRect();

    const heartRect = targetHeart.getBoundingClientRect();


    /*
        We check whether the center/front part
        of the arrow is close enough to the heart.
    */

    const arrowTipX =
        arrowRect.right - 10;

    const arrowTipY =
        arrowRect.top + arrowRect.height / 2;


    const heartCenterX =
        heartRect.left + heartRect.width / 2;

    const heartCenterY =
        heartRect.top + heartRect.height / 2;


    const distanceX =
        Math.abs(arrowTipX - heartCenterX);

    const distanceY =
        Math.abs(arrowTipY - heartCenterY);


    if (
        distanceX < 70 &&
        distanceY < 70
    ) {

        hitHeart();

    }

}


/* ========================================================= */
/* HEART HIT                                                  */
/* ========================================================= */

function hitHeart() {

    if (arrowHasHit) {
        return;
    }

    arrowHasHit = true;

    isDraggingArrow = false;

    targetHeart.classList.add("hit");

    /*
        Put arrow directly over the heart
        before opening the envelope.
    */

    const heartRect =
        targetHeart.getBoundingClientRect();

    const shootRect =
        shootArea.getBoundingClientRect();

    const arrowWidth =
        arrow.offsetWidth;


    const finalLeft =
        heartRect.left -
        shootRect.left -
        arrowWidth +
        12;


    const finalTop =
        heartRect.top -
        shootRect.top +
        heartRect.height / 2 -
        arrow.offsetHeight / 2;


    arrow.style.transition =
        "left 0.35s ease, top 0.35s ease, opacity 0.4s ease";

    arrow.style.left = `${finalLeft}px`;

    arrow.style.top = `${finalTop}px`;


    setTimeout(() => {

        arrow.classList.add("hit");

        proposalEnvelope.classList.add("open");

    }, 400);


    setTimeout(() => {

        arrowStage.classList.add("hidden");

    }, 1050);


    setTimeout(() => {

        questionStage.classList.add("visible");

    }, 1250);

}


/* ========================================================= */
/* SECTION 4 — YES / NO                                      */
/* ========================================================= */

const proposalYes =
    document.getElementById("proposalYes");

const proposalNo =
    document.getElementById("proposalNo");

const proposalArea =
    document.querySelector(".proposal-area");

const noMessage =
    document.getElementById("noMessage");


let noAttempts = 0;


/* ========================================================= */
/* YES BUTTON                                                 */
/* ========================================================= */

proposalYes.addEventListener("click", () => {

    changeSection(finalSection);

});


/* ========================================================= */
/* NO BUTTON                                                  */
/* ========================================================= */

proposalNo.addEventListener("pointerdown", (event) => {

    event.preventDefault();

    event.stopPropagation();

    moveNoButton();

});


proposalNo.addEventListener("click", (event) => {

    event.preventDefault();

    event.stopPropagation();

    moveNoButton();

});


/* ========================================================= */
/* MOVE NO BUTTON                                             */
/* ========================================================= */

function moveNoButton() {

    noAttempts++;


    /*
        Every NO attempt makes YES bigger.
    */

    const growth =
        1 + (noAttempts * 0.10);

    const limitedGrowth =
        Math.min(growth, 2.5);

    proposalYes.style.transform =
        `scale(${limitedGrowth})`;


    /*
        Funny messages as the NO button
        keeps escaping.
    */

    const messages = [
        "hehe nope ♡",
        "you can't choose no 😭",
        "nice try ♡",
        "the button said NO to you",
        "try again 😭",
        "why are you still trying? ♡",
        "NO is running away!",
        "just click YES already 😭",
        "you know the answer ♡",
        "the YES button is getting bigger..."
    ];


    noMessage.textContent =
        messages[
            Math.min(
                noAttempts - 1,
                messages.length - 1
            )
        ];


    /*
        Get available space.
    */

    const areaWidth =
        proposalArea.clientWidth;

    const areaHeight =
        proposalArea.clientHeight;

    const buttonWidth =
        proposalNo.offsetWidth;

    const buttonHeight =
        proposalNo.offsetHeight;


    /*
        Leave enough space so the button
        doesn't disappear outside the screen.
    */

    const padding = 10;


    const maxX =
        Math.max(
            padding,
            areaWidth - buttonWidth - padding
        );

    const maxY =
        Math.max(
            70,
            areaHeight - buttonHeight - padding
        );


    /*
        Random position.
    */

    const randomX =
        Math.random() * maxX;

    const randomY =
        65 + Math.random() *
        Math.max(20, maxY - 65);


    proposalNo.style.left =
        `${randomX}px`;

    proposalNo.style.top =
        `${randomY}px`;

    proposalNo.style.transform =
        "none";

}


/* ========================================================= */
/* RESET PROPOSAL                                             */
/* ========================================================= */

function resetProposal() {

    arrowHasHit = false;

    isDraggingArrow = false;

    arrow.classList.remove("hit");

    targetHeart.classList.remove("hit");

    proposalEnvelope.classList.remove("open");

    arrowStage.classList.remove("hidden");

    questionStage.classList.remove("visible");

    noAttempts = 0;

    proposalYes.style.transform =
        "scale(1)";

    proposalNo.style.left =
        "50%";

    proposalNo.style.top =
        "72px";

    proposalNo.style.transform =
        "translateX(-50%)";

    noMessage.textContent = "";


    /*
        Reset arrow position.
    */

    arrow.style.transition = "none";

    arrow.style.left = "6%";

    arrow.style.top = "55%";


    /*
        Restore transition after reset.
    */

    setTimeout(() => {

        arrow.style.transition =
            "transform 0.25s ease, opacity 0.3s ease";

    }, 50);

}


/* ========================================================= */
/* RESIZE SAFETY                                              */
/* ========================================================= */

window.addEventListener("resize", () => {

    /*
        Keep NO button inside its container
        when the screen changes size.
    */

    if (questionStage.classList.contains("visible")) {

        const areaWidth =
            proposalArea.clientWidth;

        const buttonWidth =
            proposalNo.offsetWidth;

        const currentLeft =
            parseFloat(proposalNo.style.left);


        if (!isNaN(currentLeft)) {

            const maxLeft =
                Math.max(
                    10,
                    areaWidth - buttonWidth - 10
                );

            if (currentLeft > maxLeft) {

                proposalNo.style.left =
                    `${maxLeft}px`;

            }

        }

    }

});
