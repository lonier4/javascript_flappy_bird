import {updateBird, setupBird} from './bird.js';

document.addEventListener("keypress", handleStart, { once: true })
const title = document.querySelector("[data-title]")


let lastTime
function updateLoop(time) {
    // skips the first render
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }

    const delta = time - lastTime
    updateBird(delta)
    lastTime = time
    window.requestAnimationFrame(updateLoop)
}

function handleStart() {
    title.classList.add("hide")
    setupBird()
    window.requestAnimationFrame(updateLoop)
}

function handleLose() {

}