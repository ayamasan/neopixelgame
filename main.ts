control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
    if (位置 == 0) {
        スピード = randint(30, 200)
        game.addScore(1)
        ヒットA = 1
    }
})
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
    if (位置 == 14) {
        スピード = randint(30, 200)
        game.addScore(1)
        ヒットB = 1
    }
})
let スピード = 0
let ヒットB = 0
let ヒットA = 0
let 位置 = 0
let strip = neopixel.create(DigitalPin.P14, 15, NeoPixelMode.RGB)
strip.setBrightness(10)
strip.setPixelColor(0, neopixel.colors(NeoPixelColors.White))
strip.show()
位置 = 0
let 方向 = 1
game.setScore(0)
ヒットA = 1
ヒットB = 1
let 点A = -1
let 点B = -1
スピード = 100
basic.forever(function () {
    if (位置 + 方向 < 0) {
        if (ヒットA == 1) {
            ヒットA = 0
        } else {
            strip.clear()
            strip.show()
            点B += 1
            if (点B == 4) {
                basic.showString("B")
                music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
                basic.pause(4000)
                basic.clearScreen()
                control.reset()
            } else {
                music.playTone(131, music.beat(BeatFraction.Half))
                basic.pause(1000)
            }
        }
        位置 = 1
        方向 = 1
    } else if (位置 + 方向 > 14) {
        if (ヒットB == 1) {
            ヒットB = 0
        } else {
            strip.clear()
            strip.show()
            点A += 1
            if (点A == 4) {
                basic.showString("A")
                music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
                basic.pause(4000)
                basic.clearScreen()
                control.reset()
            } else {
                music.playTone(131, music.beat(BeatFraction.Half))
                basic.pause(1000)
            }
        }
        位置 = 13
        方向 = -1
    } else {
        位置 += 方向
    }
    strip.clear()
    strip.setPixelColor(位置, neopixel.colors(NeoPixelColors.White))
    strip.show()
    basic.clearScreen()
    led.plot(0, 点A)
    led.plot(4, 点B)
    basic.pause(スピード)
})
