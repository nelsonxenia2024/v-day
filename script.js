const gifStages = [
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDZwMWI1Y3U2NmI2N3YyMnhnNGZ3ZDd4dTQ4MHRldnJkc3NvM2VwcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/s3Ol6caOFupJpVdJSu/giphy.gif",    // 0 normal
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDZwMWI1Y3U2NmI2N3YyMnhnNGZ3ZDd4dTQ4MHRldnJkc3NvM2VwcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/s3Ol6caOFupJpVdJSu/giphy.gif",  // 1 confused
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXduMGFnb2dmcWh4bHc1N2NpcTE3NHl3cnZmZzdlandmdWo4cWh6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ioc5J912T1zTW/giphy.gif",             // 2 pleading
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnU1Y2hldXJmdzUwcWtzbGhtN3dweGxrMXFhdDgxa3lsb2V3d2I0dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BEob5qwFkSJ7G/giphy.gif",             // 3 sad
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmowODZ5Zjdvam85NTRidWE1c2prd3ZuaHkydGhxbDNxeWVpemZjbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yzDNdo4s1oGw7jEu24/giphy.gif",       // 4 sadder
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXdtYXh0bzZqaHVrdml5cGl5NHU5bHk4cXJjNzM2dzY4anBzcmN6YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/H4uE6w9G1uK4M/giphy.gif",             // 5 devastated
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2d5bTVhM296N3R3YzRxajVienZzdjRpY3plMmc0c2t6ZGtwN3dreSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zMN2a7BUnucUPWydim/giphy.gif",               // 6 very devastated
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmVzcHJlMjZ0cDAzN2gyN25pOGY1OGU3cDBnOWlrczhrOTYwejZveCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mEtSQlxqBtWWA/giphy.gif"  // 7 crying runaway
]

const noMessages = [
    "No",
    "Are you positive? 🤔",
    "Dont leave me alone please... 🥺",
    "If you say no, I will be really sad...",
    "I will be very sad... 😢",
    "Please my sausage 💔",
    "Don't do this to me...",
    "Last chance! 😭",
    "You can't catch me anyway 🐟🥚🐟🥚"
]

const yesTeasePokes = [
    "try saying no first... I bet you want to know what happens 😏",
    "go on, hit no... just once 👀",
    "you're missing out 😈",
    "click no, I dare you 😏"
]

let yesTeasedCount = 0

let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

// Autoplay: audio starts muted (bypasses browser policy), unmute immediately
music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    // Fallback: unmute on first interaction
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

function handleYesClick() {
    if (!runawayEnabled) {
        // Tease her to try No first
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }
    window.location.href = 'yes.html'
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
    noClickCount++

    // Cycle through guilt-trip messages
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    // Grow the Yes button bigger each time
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // Shrink No button to contrast
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // Swap cat GIF through stages
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // Runaway starts at click 5
    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX + margin / 2
    const randomY = Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}
