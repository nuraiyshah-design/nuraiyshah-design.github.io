/* ========================================
   ELEMENTE
======================================== */

const heartContainer =
    document.getElementById("heartContainer");

const counter =
    document.getElementById("counter");

const finalMessage =
    document.getElementById("finalMessage");

const heartRain =
    document.getElementById("heartRain");

const clickHint =
    document.getElementById("clickHint");

const reasonsArea =
    document.getElementById("reasonsArea");


/* ========================================
   DIE 25 GRÜNDE
======================================== */

const reasons = [

    "Ich fühle mich wohl bei dir.",

    "Ich liebe dein Lächeln.",

    "Ich liebe deine Augen.",

    "Ich liebe die Sicherheit, die du mir gibst.",

    "Ich liebe, wie aufmerksam du bist.",

    "Ich liebe, wie intelligent du bist.",

    "Ich liebe deine Art und Weise.",

    "Ich liebe deinen Humor.",

    "Ich liebe alles an dir.",

    "Ich liebe deine kleinen süßen Komplimente.",

    "Ich liebe deine Augen.",

    "Ich liebe es, wie du mich immer zum Lachen bringst.",

    "Ich liebe deine Art.",

    "Ich liebe deine Sicherheit.",

    "Ich liebe unsere gemeinsamen Momente.",

    "Ich liebe es, mit dir zu chillen.",

    "Ich liebe es, mit dir Zeit zu verbringen.",

    "Ich liebe deine Nähe.",

    "Du machst mein Leben schöner.",

    "Ich bin so glücklich, dich zu haben.",

    "Du bist für mich etwas ganz Besonderes.",

    "Du bist mein Lieblingsmensch.",

    "Ich liebe es, wenn du dich für Sachen interessierst.",

    "Ich liebe deine Stimme.",

    "Ich liebe es, dir zuzuhören."

];


/* ========================================
   ZÄHLER
======================================== */

let clickCount = 0;


/* ========================================
   POSITIONEN DER 25 GRÜNDE
======================================== */

/*
   Die Gründe werden bewusst an
   unterschiedlichen Stellen der Seite
   verteilt.

   x = Abstand von links
   y = Abstand von oben
*/

const reasonPositions = [

    { x: 16, y: 20 },
    { x: 82, y: 22 },
    { x: 8,  y: 38 },
    { x: 92, y: 39 },
    { x: 20, y: 65 },

    { x: 80, y: 64 },
    { x: 50, y: 13 },
    { x: 50, y: 88 },
    { x: 7,  y: 76 },
    { x: 93, y: 76 },

    { x: 27, y: 29 },
    { x: 73, y: 29 },
    { x: 18, y: 48 },
    { x: 82, y: 48 },
    { x: 30, y: 82 },

    { x: 70, y: 82 },
    { x: 12, y: 58 },
    { x: 88, y: 58 },
    { x: 35, y: 17 },
    { x: 65, y: 17 },

    { x: 35, y: 92 },
    { x: 65, y: 92 },
    { x: 24, y: 54 },
    { x: 76, y: 54 },
    { x: 50, y: 95 }

];


/* ========================================
   HERZ AUFBAUEN
======================================== */

function createHeartText() {

    heartContainer.innerHTML = "";

    clickHint.style.opacity = "0";


    const width =
        heartContainer.clientWidth;

    const height =
        heartContainer.clientHeight;


    const amount =
        window.innerWidth < 600
            ? 105
            : 150;


    const words = [];


    /*
       Herzform berechnen.
    */

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const t =
            (Math.PI * 2 * i) / amount;


        const x =
            16 *
            Math.pow(
                Math.sin(t),
                3
            );


        const y =
            13 *
                Math.cos(t)
            - 5 *
                Math.cos(2 * t)
            - 2 *
                Math.cos(3 * t)
            - Math.cos(4 * t);


        const scale =
            Math.min(
                width / 38,
                height / 32
            );


        const posX =
            width / 2
            + x * scale;


        const posY =
            height / 2
            - y * scale * 0.85;


        const word =
            document.createElement(
                "span"
            );


        word.className =
            "heart-word";


        word.textContent =
            "Ich liebe dich David";


        word.style.left =
            `${posX}px`;


        word.style.top =
            `${posY}px`;


        heartContainer.appendChild(
            word
        );


        words.push(word);
    }


    /*
       Das Herz baut sich
       langsam auf.
    */

    words.forEach(
        (word, index) => {

            setTimeout(
                () => {

                    word.classList.add(
                        "visible"
                    );


                    if (
                        index % 4 === 0
                    ) {

                        word.classList.add(
                            "animate"
                        );
                    }

                },

                900 + index * 38
            );

        }
    );


    /*
       Hinweis erst anzeigen,
       wenn das Herz fertig ist.
    */

    const totalBuildTime =
        900
        + amount * 38
        + 1000;


    setTimeout(
        () => {

            clickHint.style.opacity =
                "1";

        },

        totalBuildTime
    );
}


/* ========================================
   KLICK AUF DAS HERZ
======================================== */

heartContainer.addEventListener(
    "click",
    function (event) {

        if (
            clickCount >=
            reasons.length
        ) {

            return;
        }


        clickCount++;


        /*
           Herz schlägt kurz.
        */

        heartContainer.classList.remove(
            "beat"
        );


        void heartContainer.offsetWidth;


        heartContainer.classList.add(
            "beat"
        );


        /*
           Den aktuellen Grund
           an seiner Position anzeigen.
        */

        showReason(
            clickCount - 1
        );


        /*
           Zähler.
        */

        counter.textContent =
            `${clickCount} / ${reasons.length}`;


        /*
           Kleine dezente Herzen.
        */

        createClickHearts(
            event.clientX,
            event.clientY
        );


        /*
           Nach dem 25. Grund
           Finale starten.
        */

        if (
            clickCount ===
            reasons.length
        ) {

            setTimeout(
                () => {

                    startFinale();

                },

                3200
            );
        }

    }
);


/* ========================================
   EINEN GRUND ANZEIGEN
======================================== */

function showReason(index) {

    const reason =
        document.createElement(
            "div"
        );


    reason.className =
        "reason";


    reason.textContent =
        reasons[index];


    /*
       Position aus unserer Liste holen.
    */

    const position =
        reasonPositions[index];


    reason.style.left =
        `${position.x}%`;


    reason.style.top =
        `${position.y}%`;


    /*
       Bei jedem Grund eine leicht
       unterschiedliche Verzögerung.
    */

    reason.style.animationDelay =
        `${Math.random() * 0.15}s`;


    reasonsArea.appendChild(
        reason
    );
}


/* ========================================
   KLEINE HERZEN BEIM KLICK
======================================== */

function createClickHearts(
    x,
    y
) {

    const heartTypes = [

        "♡",
        "♥",
        "♡",
        "♥"

    ];


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const heart =
            document.createElement(
                "span"
            );


        heart.className =
            "click-heart";


        heart.textContent =
            heartTypes[
                Math.floor(
                    Math.random()
                    * heartTypes.length
                )
            ];


        heart.style.left =
            `${x}px`;


        heart.style.top =
            `${y}px`;


        const moveX =
            Math.random() * 200
            - 100;


        const moveY =
            -(
                Math.random() * 170
                + 70
            );


        heart.style.setProperty(
            "--x",
            `${moveX}px`
        );


        heart.style.setProperty(
            "--y",
            `${moveY}px`
        );


        document.body.appendChild(
            heart
        );


        setTimeout(
            () => {

                heart.remove();

            },

            2200
        );
    }
}


/* ========================================
   FINALE
======================================== */

function startFinale() {

    finalMessage.classList.add(
        "visible"
    );


    startHeartRain();
}


/* ========================================
   ELEGANTER HERZREGEN
======================================== */

function startHeartRain() {

    const heartTypes = [

        "♡",
        "♥",
        "♡",
        "♡",
        "♥"

    ];


    /*
       Erste Welle.
    */

    for (
        let i = 0;
        i < 70;
        i++
    ) {

        setTimeout(
            () => {

                createRainHeart(
                    heartTypes
                );

            },

            i * 90
        );
    }


    /*
       Danach langsamer Herzregen.
    */

    setInterval(
        () => {

            for (
                let i = 0;
                i < 5;
                i++
            ) {

                createRainHeart(
                    heartTypes
                );
            }

        },

        1100
    );
}


/* ========================================
   EIN HERZ IM HERZREGEN
======================================== */

function createRainHeart(
    heartTypes
) {

    const heart =
        document.createElement(
            "span"
        );


    heart.className =
        "rain-heart";


    heart.textContent =
        heartTypes[
            Math.floor(
                Math.random()
                * heartTypes.length
            )
        ];


    heart.style.left =
        `${Math.random() * 100}vw`;


    heart.style.fontSize =
        `${
            14
            + Math.random() * 22
        }px`;


    const duration =
        5
        + Math.random() * 5;


    heart.style.animationDuration =
        `${duration}s`;


    heartRain.appendChild(
        heart
    );


    setTimeout(
        () => {

            heart.remove();

        },

        duration * 1000 + 500
    );
}


/* ========================================
   FENSTERGRÖSSE
======================================== */

window.addEventListener(
    "resize",
    () => {

        /*
           Nur das Herz neu berechnen.
           Die bereits angezeigten Gründe
           bleiben bestehen.
        */

        createHeartText();

    }
);


/* ========================================
   SEITE STARTEN
======================================== */

createHeartText();