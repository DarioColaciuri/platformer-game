const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 64 * 16
canvas.height = 64 * 9

let parsedCollisions
let collisionBlocks
let background
let doors
const player = new Player({
    imageSrc: "./img/king/idle.png",
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 9,
            loop: true,
            imageSrc: "./img/king/idle.png",
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 9,
            loop: true,
            imageSrc: "./img/king/idleLeft.png",
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: "./img/king/runRight.png",
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: "./img/king/runLeft.png",
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: "./img/king/enterDoor.png",
            onComplete: () => {
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++
                        if (level === 6) level = 1
                        levels[level].init()
                        player.switchSprite("idleRight")
                        player.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    }
                })
            }
        },
    }
})

let level = 5
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollisions.createObjetsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 100
            player.position.y = 200
            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: "./img/backgroundLevel1.png"
            })

            doors = [
                new Sprite({
                    position: {
                        x: 767,
                        y: 270,
                    },
                    imageSrc: "./img/doorOpen.png",
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    },
    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D()
            collisionBlocks = parsedCollisions.createObjetsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 96
            player.position.y = 140
            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: "./img/backgroundLevel2.png"
            })

            doors = [
                new Sprite({
                    position: {
                        x: 772,
                        y: 336,
                    },
                    imageSrc: "./img/doorOpen.png",
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    },
    3: {
        init: () => {
            parsedCollisions = collisionsLevel3.parse2D()
            collisionBlocks = parsedCollisions.createObjetsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 750
            player.position.y = 230
            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: "./img/backgroundLevel3.png"
            })

            doors = [
                new Sprite({
                    position: {
                        x: 176,
                        y: 335,
                    },
                    imageSrc: "./img/doorOpen.png",
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    },
    4: {
        init: () => {
            parsedCollisions = collisionsLevel4.parse2D()
            collisionBlocks = parsedCollisions.createObjetsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 750
            player.position.y = 230
            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: "./img/backgroundLevel4.png"
            })

            doors = [
                new Sprite({
                    position: {
                        x: 176,
                        y: 335,
                    },
                    imageSrc: "./img/doorOpen.png",
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    },
    5: {
        init: () => {
            parsedCollisions = collisionsLevel5.parse2D()
            collisionBlocks = parsedCollisions.createObjetsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 750
            player.position.y = 230
            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: "./img/backgroundLevel5.png"
            })

            doors = [
                new Sprite({
                    position: {
                        x: 860,
                        y: 80,
                    },
                    imageSrc: "./img/doorOpen.png",
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    }
}

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

const overlay = {
    opacity: 0,
}

// const camera = {
//     position: {
//         x: 0,
//         y: 0,
//     },
// }

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    doors.forEach((door) => {
        door.draw()
    })
    player.handleInput(keys)
    player.draw()
    player.update()

    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore()

}

levels[level].init()
animate()

