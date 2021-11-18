import {updateBird, setupBird, getBirdRect} from './bird.js';
import {updatePipes, setupPipes, getPassedPipesCount, getPipeRects} from './pipe.js';

document.addEventListener("keypress", handleStart, { once: true })
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")


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
    updatePipes(delta)
    if (checkLose()) return handleLose()
    lastTime = time
    window.requestAnimationFrame(updateLoop)
}

function checkLose() {
    const birdRect = getBirdRect()
    const insidePipe = getPipeRects().some(rect => isCollision(birdRect, rect))
    // lose if bird is above or below the screen
    const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight
    return outsideWorld || insidePipe
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

function handleStart() {
    title.classList.add("hide")
    setupBird()
    setupPipes()
    lastTime = null // resets our lastTime so time doesnt
    // keep incrementing after the game ends
    window.requestAnimationFrame(updateLoop)
}

// add start game title to the window
function handleLose() {
    setTimeout(() => {
    title.classList.remove("hide")
    subtitle.classList.remove("hide")
    subtitle.textContent = `${getPassedPipesCount()} Pipes`
    document.addEventListener("keypress", handleStart, { once:true })
}, 100)
}