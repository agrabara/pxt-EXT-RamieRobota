/**
* Provides access to basic micro:bit functionality.
*/
//% weight=5 color=#0fbc11 icon="\uf013" block="RamieRobota"
namespace RamieRobota {

    const CMD_UP = "do_gory"
    const CMD_DOWN = "na_dol"
    const CMD_LEFT = "w_lewo"
    const CMD_RIGHT = "w_prawo"
    const CMD_OPEN = "otworz"
    const CMD_CLOSE = "zamknij"
    const CMD_INIT = "inicjuj"
    const CMD_NEXTSERVO = "n_serwo"
    const CMD_INC_ANGLE = "zw_kat"
    const CMD_DEC_ANGLE = "zm_kat"
    const CMD_CHGGROUP = "grupa"
    const CMD_EMPTY = "empty"

    const CMD_DISPSTR = "#ST#"
    const CMD_DSPLED = "#LD#"
    const CMD_DSPICON = "w_iko"

    const ON = true
    const OFF = false

    const LS_ACTIVE = 2

    
    /**
    * Podniesienie ramienia do gory
    */
    //% block
    //% weight = 100
    export function RamieDoGory() {
        radio.sendValue(CMD_UP, 0)
    }

    

    function SendDspVal(DspType: string, DspVal: string) {
        let SendStr = DspType + DspVal
        radio.sendString(SendStr)
    }

    /**
    * Wyswietlenie napisu na ekranie  
    */
    //% block 
    //% weight = 100
    export function WyswietlNapis(DspVal: string) {
        SendDspVal(CMD_DISPSTR, DspVal)
    }

    /**
  * Wyswietlenie liczby na ekranie  
  */
    //% block 
    //% weight = 100
    export function WyswietlLiczbe(DspVal: number) {
        SendDspVal(CMD_DISPSTR, DspVal.toString())
    }

    function EncodeImage(Img: string): string {
        let len = Img.length
        let RetImg = ""
        let EncVal = 0
        let count = 0
        for (let i = 0; i < len; i++) {

            let pix = Img.charAt(i)
            if (pix != " ") count++
            if (pix != "0" && pix != ".") EncVal = EncVal + 1
            if (count != 5) EncVal = EncVal * 2
            else {
                if (EncVal < 10) RetImg = RetImg + "0" + EncVal.toString()
                else RetImg = RetImg + EncVal.toString()
                EncVal = 0
                count = 0
            }
            // console.logValue("x", EncVal)
        }
        if (count != 0) {
            if (EncVal < 10) RetImg = RetImg + "0" + EncVal.toString()
            else RetImg = RetImg + EncVal.toString()
        }
        return RetImg

    }

    /**
     * Wyswietlenie obrazka zakodowanego np. "10001 11111 00001 10101 11011"
     */
    //% block 
    //% weight = 100
    export function WyswietlObraz(DspVal: string = "10001 11111 00001 10101 11011") {
        SendDspVal(CMD_DSPLED, EncodeImage(DspVal))
    }


    /**
     * Wyswietlenie ikony
    */
    //% block 
    //% weight = 100
    export function WyswietlIkone(DspVal: IconNames = IconNames.Heart) {
        radio.sendValue(CMD_DSPICON, DspVal)
    }
}