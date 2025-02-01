input.onButtonPressed(Button.A, function () {
    if (mode == 0) {
        speedA += -64
    } else {
        offsetB += -8
    }
})
input.onButtonPressed(Button.AB, function () {
    mode = 1 - mode
    graph = 0
    if (mode == 0) {
        basic.showString("speed")
    } else {
        basic.showString("offset")
    }
    graph = 1
})
input.onButtonPressed(Button.B, function () {
    if (mode == 0) {
        speedA += 64
    } else {
        offsetB += 8
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    active = !(active)
})
let mode = 0
let active = false
let graph = 0
graph = 1
active = false
mode = 0
let speedA = 0
let offsetB = 0
pins.analogSetPeriod(AnalogPin.P14, 20000)
pins.analogWritePin(AnalogPin.P13, 0)
basic.forever(function () {
    if (active) {
        pins.analogWritePin(AnalogPin.P13, speedA)
        pins.analogWritePin(AnalogPin.P15, speedA + offsetB)
        serial.writeValue("a", speedA)
        serial.writeValue("b", offsetB)
    } else {
        pins.analogWritePin(AnalogPin.P13, 0)
        pins.analogWritePin(AnalogPin.P15, 0)
        serial.writeValue("a", 0)
        serial.writeValue("b", 0)
    }
    basic.pause(100)
})
basic.forever(function () {
    speedA = Math.constrain(speedA, 0, 1023)
    if (graph == 1) {
        if (mode == 0) {
            led.plotBarGraph(
            speedA,
            1100
            )
        } else {
            led.plotBarGraph(
            offsetB + 64,
            128
            )
        }
    }
})
