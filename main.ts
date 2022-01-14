let MAGNETSIGNAL = 0
let SIGNAL = 0
let MESSUNG = 0
let DREHZAHL = 0
let LAUFZEIT = 0
let ANZAHLMAGNET = 0
let PULSEINLAUFZEIT = 0
let TIMER = 0
let MESSINTERVALL = 10000
let LEDAnzeige = TM1637.create(
DigitalPin.C16,
DigitalPin.C17,
7,
4
)
basic.forever(function () {
    TIMER = input.runningTime()
    PULSEINLAUFZEIT = ANZAHLMAGNET
    basic.pause(MESSINTERVALL)
    LAUFZEIT = input.runningTime() - TIMER
    PULSEINLAUFZEIT = ANZAHLMAGNET - PULSEINLAUFZEIT
    ANZAHLMAGNET = 0
    DREHZAHL = 60000 * PULSEINLAUFZEIT / LAUFZEIT
})
basic.forever(function () {
    LEDAnzeige.showNumber(DREHZAHL)
})
basic.forever(function () {
    MESSUNG += 1
    SIGNAL = pins.analogReadPin(AnalogPin.P2)
    if (SIGNAL < 500) {
        if (MAGNETSIGNAL == 0) {
            MAGNETSIGNAL = 1
            ANZAHLMAGNET += 1
        }
    } else {
        MAGNETSIGNAL = 0
    }
})
