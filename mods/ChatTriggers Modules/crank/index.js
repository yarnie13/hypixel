import {
    Window,
    UIImage, UIText, UIContainer, 
    RelativeConstraint, CenterConstraint,
    ConstantColorConstraint,
    Animations
} from "Elementa/index"
const Color = Java.type("java.awt.Color")
const URL = Java.type("java.net.URL")

ParticleHandler = require("./particles.js")
const particleHandlers = [
    new ParticleHandler(-10, Renderer.screen.getHeight() + 10, 3, -10, 5, 2),
    new ParticleHandler(Renderer.screen.getWidth() + 10, Renderer.screen.getHeight() + 10, -3, -10, -5, 2)
]
let animatingParticles = false

import PVObject from "PersistentData"
const pvObject = new PVObject("crank", {
    justImported: true
})

const counter = JSON.parse(FileLib.getUrlContent("https://chattriggers.com/api/modules/crank")).downloads
const counterText = new UIText("")
    .setX(new CenterConstraint())
    .setY((0).pixels(false, true))
if (counter !== undefined) {
    counterText.setText(`this module has jebaited ${counter} people`)
        .setWidth((Renderer.getStringWidth(counterText.getText()) * 2).pixels())
        .setHeight((18).pixels())
}

const imageRight = UIImage.ofURL(new URL("https://imgur.com/MgGqcSg.png"))
    .setX((0).pixels(true, true))
    .setY(new CenterConstraint())
    .setWidth((100).pixels())
    .setHeight((100).pixels())
const imageLeft = UIImage.ofURL(new URL("https://imgur.com/yE5MHbG.png"))
    .setX((0).pixels(false, true))
    .setY(new CenterConstraint())
    .setWidth((100).pixels())
    .setHeight((100).pixels())

const imageRays = new Image("rays", "https://imgur.com/g2MahhE.png")

let drawingFrames = false
let frameCounter = 0
const frames = [
    new Image("frame1", "https://imgur.com/kV3YHOj.png"),
    new Image("frame2", "https://imgur.com/t2N2PXb.png"),
    new Image("frame3", "https://imgur.com/WbIFTj8.png"),
    new Image("frame4", "https://imgur.com/AjOAK4A.png"),
    new Image("frame5", "https://imgur.com/Ts5xtBL.png"),
    new Image("frame6", "https://imgur.com/lLXZTD5.png")
]

const background = new UIContainer()
    .setWidth(new RelativeConstraint())
    .setHeight(new RelativeConstraint())
    .addChildren(imageRight, imageLeft, counterText)

const window = new Window().addChild(background)

let playingSound = false
const sound = new Sound({
    source:"crank.ogg",
    category:"master"
})

const gui = new Gui()

let animatingCenter = false
let rotation = 0
let raySize = 0

let animatingBackground = false
let colors = [0xfffcba03, 0xff030ffc, 0xff03d7fc, 0xff03fca1, 0xff00bf13, 0xfff2ff3b, 0xffffa600, 0xffff2a00, 0xffff00d9, 0xffc300ff]
let shapeSides = Math.round(Math.random() * 10) + 3
let shapeColor = colors[Math.floor(Math.random() * colors.length)]

register("command", () => {
    gui.open()
    background.makeAnimation()
        .setColorAnimation(Animations.OUT_EXP, 1, new ConstantColorConstraint(new Color(0, 0, 0, 0.75)))
        .begin()

    var animation = imageRight.makeAnimation()
    animation.setXAnimation(Animations.OUT_EXP, 1, (-50).pixels(true))
    animation.begin()

    setTimeout(() => {
        var animation = imageRight.makeAnimation()
        animation.setXAnimation(Animations.OUT_EXP, 1, (0).pixels(true, true))
        animation.begin()
    }, 1500)

    setTimeout(() => {
        var animation = imageLeft.makeAnimation()
        animation.setXAnimation(Animations.OUT_EXP, 1, (-50).pixels())
        animation.begin()
    }, 3000)

    setTimeout(() => {
        var animation = imageLeft.makeAnimation()
        animation.setXAnimation(Animations.OUT_EXP, 1, (0).pixels(false, true))
        animation.begin()
    }, 4500)

    setTimeout(() => {
        imageRight.setX(new CenterConstraint())
        imageLeft.setX(new CenterConstraint())
        imageRight.setWidth((0).pixels())
        imageRight.setHeight((0).pixels())
        imageLeft.setWidth((0).pixels())
        imageLeft.setHeight((0).pixels())
        var animation = imageLeft.makeAnimation()
        animation.setWidthAnimation(Animations.OUT_ELASTIC, 2, (100).pixels())
        animation.setHeightAnimation(Animations.OUT_ELASTIC, 2, (100).pixels())
        animation.begin()
    }, 6000)

    setTimeout(() => {
        centerAnimation()
    }, 6440)

    setTimeout(() => {
        animatingCenter = true
    }, 10700)

    setTimeout(() => {
        drawingFrames = true
    }, 14500)

    setTimeout(() => {
        var animation = counterText.makeAnimation()
        animation.setYAnimation(Animations.OUT_ELASTIC, 2, (15).pixels())
        animation.begin()
    }, 18000)

    setTimeout(() => {
        animatingParticles = true
    }, 21000)

    setTimeout(() => {
        animatingBackground = true
    }, 25000)


    setTimeout(() => {
        sound.play()
        playingSound = true
    }, 100)
}).setName("crank2")

register("step", () => {
    if (pvObject.justImported) {
        pvObject.justImported = false
        new Message(
            new TextComponent("&6&m" + ChatLib.getChatBreak() + "\n"),
            new TextComponent("CRANK is now installed!\nGet started by clicking [here]\n")
                .setClick("run_command", "/crank2")
                .setHoverValue("open CRANK menu to change your CRANK"),
            new TextComponent("&6&m" + ChatLib.getChatBreak())
        ).chat()
        ChatTriggers.reloadCT()
    }

    if (animatingParticles) {
        particleHandlers.forEach(handler => handler.step())
    }

    if (!gui.isOpen() || !animatingCenter) return
    raySize = easeOut(raySize, 250, 5, 1)
    rotation += 0.5
    if (rotation >= 720) {
        rotation -= 720
    }
}).setFps(60)

register("step", () => {
    if (!drawingFrames) return
    frameCounter++
    if (frameCounter > 5) frameCounter = 0
}).setFps(9)

gui.registerDraw(() => {
    Renderer.drawRect(0xaa000000, 0, 0, Renderer.screen.getWidth(), Renderer.screen.getHeight())

    if (animatingBackground) {
        Renderer.translate(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2)
        Renderer.rotate(-rotation / 2)
        Renderer.drawCircle(shapeColor, 0, 0, 100, shapeSides)
    }

    Renderer.translate(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2)
    Renderer.rotate(rotation)
    Renderer.translate(-raySize / 2,  -raySize / 2)
    imageRays.draw(0, 0, raySize, raySize)

    particleHandlers.forEach(handler => handler.draw())

    window.draw()

    if (drawingFrames) {
        frames[frameCounter].draw(0, Renderer.screen.getHeight() / 2 - 25, 82, 50)
        frames[frameCounter].draw(Renderer.screen.getWidth() - 82, Renderer.screen.getHeight() / 2 - 25, 82, 50)
    }
})

function centerAnimation() {
    if (!gui.isOpen()) return

    imageRight.setWidth((50).pixels())
    imageRight.setHeight((50).pixels())
    imageLeft.setWidth((0).pixels())
    imageLeft.setHeight((0).pixels())
    var animation = imageRight.makeAnimation()
    animation.setWidthAnimation(Animations.OUT_ELASTIC, 2, (100).pixels())
    animation.setHeightAnimation(Animations.OUT_ELASTIC, 2, (100).pixels())
    animation.begin()

    setTimeout(() => {
        imageRight.setWidth((0).pixels())
        imageRight.setHeight((0).pixels())
        imageLeft.setWidth((50).pixels())
        imageLeft.setHeight((50).pixels())
        var animation = imageLeft.makeAnimation()
        animation.setWidthAnimation(Animations.OUT_ELASTIC, 2, (100).pixels())
        animation.setHeightAnimation(Animations.OUT_ELASTIC, 2, (100).pixels())
        animation.begin()
    }, 440.5)

    setTimeout(() => {
        centerAnimation()
        shapeSides = Math.round(Math.random() * 10) + 3
        shapeColor = colors[Math.floor(Math.random() * colors.length)]
    }, 881)
}

register("renderOverlay", () => {
    if (!gui.isOpen() && playingSound) {
        raySize = 0
        animatingCenter = false
        drawingFrames = false
        animatingParticles = false
        animatingBackground = false
        counterText.setY((0).pixels(false, true))
        imageRight.setX((0).pixels(true, true))
        imageRight.setWidth((100).pixels())
        imageRight.setHeight((100).pixels())
        imageLeft.setX((0).pixels(false, true))
        imageLeft.setWidth((100).pixels())
        imageLeft.setHeight((100).pixels())
        background.setColor(new ConstantColorConstraint(new Color(0, 0, 0, 0)))
        sound.stop()
        playingSound = false
    }
})