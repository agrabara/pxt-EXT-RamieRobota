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
    * Podniesienie ramienia robota do gory
    */
    //% block
    //% weight = 100
    export function RamieDoGory() {
        radio.sendValue(CMD_UP, 0)
    }

    /**
    * Opuszczenie ramienia robota na dol
    */
    //% block
    //% weight = 100
    export function RamieNaDol() {
        radio.sendValue(CMD_DOWN, 0)
    }

    /**
    * Otwiera szczeki chwytaka
    */
    //% block
    //% weight = 100
    export function OtworzSzczeki() {
        radio.sendValue(CMD_OPEN, 0)
    }

    /**
    * Zamyka szczeki chwytaka
    */
    //% block
    //% weight = 100
    export function ZamknijSzczeki() {
        radio.sendValue(CMD_OPEN, 0)
    }

    /**
    * Obraca ramie robota w lewo
    */
    //% block
    //% weight = 100
    export function RamieWLewo() {
        radio.sendValue(CMD_LEFT, 0)
    }


    /**
    * Obraca ramie robota w prawo
    */
    //% block
    //% weight = 50
    export function RamieWPrawo() {
        radio.sendValue(CMD_RIGHT, 0)
    }


    /**
    * Ustawia ramie w pozycji poczatkowej
    */
    //% block
    //% weight = 100
    export function InicjujRamieRobota() {
        radio.sendValue(CMD_INIT, 0)
    }


    /**
    * Kalibracja: Zmien serwo na kolejne
    */
    //% block
    //% weight = 100
    export function KalNastepneSerwo() {
        radio.sendValue(CMD_NEXTSERVO, 0)
    }



    /**
    * Kalibracja: Zwieksz kat obrotu serwa
    */
    //% block
    //% weight = 100
    export function KalZwiekszKat() {
        radio.sendValue(CMD_INC_ANGLE, 0)
    }



    /**
    * Kalibracja: Zmniejsz kat obrotu serwa
    */
    //% block
    //% weight = 100
    export function KalZmniejszKat() {
        radio.sendValue(CMD_DEC_ANGLE, 0)
    }


    /**
    * Zmiana Grupy radiowej na nowa na 60 sekund
    * @param NowaGrupa  [0-255] Nowa grupa radiowa 
    */
    //% block
    //% NowaGrupa.min=0 NowaGrupa.max=255
    export function ZmianaRadioGroup(NowaGrupa: number) {
        radio.sendValue(CMD_CHGGROUP, NowaGrupa)
        radio.setGroup(NowaGrupa)
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