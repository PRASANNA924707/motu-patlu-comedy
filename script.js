const speaker = document.getElementById("speaker");
const dialogue = document.getElementById("dialogue");
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("progressBar");

const dialogues = [
{
speaker: "Motu",
text: "Hii Patlu! Em chesthunav raa?",
duration: 4000
},
{
speaker: "Patlu",
text: "Em undhi leraa... lover set avthe bagundu anukuntunna. Kani nak evaru padatharule raa.",
duration: 6000
},
{
speaker: "Motu",
text: "Ala anukoku raa saami! Nikem thakkuva raa? Adhi cheppu!",
duration: 5000
},
{
speaker: "Patlu",
text: "Em undhi... em labham leraa. Manchi loyal ammai undali kadha raa.",
duration: 6000
},
{
speaker: "Motu",
text: "Adhi nijamele... ee kalamlo ekkada unnaru ani loyal ammailu?",
duration: 6000
},
{
speaker: "Patlu",
text: "Inkem undhi leraa! Padha... nuvvu nenu kalisi sanyasam teesukundhamu inka!",
duration: 7000
},
{
speaker: "Motu",
text: "Hahahahahaha! Padha raa saami! 😂",
duration: 5000
}
];

let current = 0;
let timer = null;
let elapsed = 0;
let playing = false;

function showDialogue(index) {
speaker.textContent = dialogues[index].speaker;
dialogue.textContent = dialogues[index].text;
}

function playReel() {
if (current >= dialogues.length) {
current = 0;
elapsed = 0;
}

playing = true;
playBtn.textContent = "⏸️ Pause";

showDialogue(current);

timer = setInterval(() => {
    elapsed += 100;

    const totalDuration = dialogues.reduce(
        (sum, item) => sum + item.duration,
        0
    );

    let completed = 0;

    for (let i = 0; i < current; i++) {
        completed += dialogues[i].duration;
    }

    progressBar.style.width =
        ((completed + elapsed) / totalDuration) * 100 + "%";

    if (elapsed >= dialogues[current].duration) {
        elapsed = 0;
        current++;

        if (current >= dialogues.length) {
            clearInterval(timer);
            playing = false;
            playBtn.textContent = "▶️ Replay";
            progressBar.style.width = "100%";
            return;
        }

        showDialogue(current);
    }
}, 100);

}

function pauseReel() {
clearInterval(timer);
playing = false;
playBtn.textContent = "▶️ Play";
}

playBtn.addEventListener("click", () => {
if (playing) {
pauseReel();
} else {
playReel();
}
});

showDialogue(0);
