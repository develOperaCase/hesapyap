const result = document.getElementById("result");

/*Silme Butonu İşlevi*/
document.getElementById("clear-btn").addEventListener("click", () => {
    const calcValues = Array.from(document.getElementsByClassName("calc-inpt"))
    calcValues.forEach(calcValue => {
        calcValue.value = ""
    })
})

/*Kopyalama Buton İşlevi*/
document.getElementById('copy-button').addEventListener('click', function() {
    const textToCopy = document.getElementById('result');
    const mainValue = textToCopy.value
    if (textToCopy.value) {
        if (textToCopy.value == "Kopyalandı"){
            return;
        }else {
            textToCopy.select();
            textToCopy.setSelectionRange(0, 99999); // Mobil cihazlar için
            document.execCommand('copy');
            textToCopy.value = "Kopyalandı"
            
            setTimeout(function() {
                textToCopy.value = mainValue
            },700)    
}}})

/*Entera basınca hesaplamayı sağlamalı*/
document.addEventListener("keydown", (event) => {
    const button = document.getElementById("calculation-btn")
    if (event.key === "Enter") {
        button.click()
    }
})

/*Termometre dönüştürücü*/
if (document.getElementById("Termometre")) {
    document.getElementById("termometre-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const derece = parseFloat(document.getElementById("derece").value);
        const dereceCinsi = document.getElementById("derece-gender").value;
        const dönüşümCinsi = document.getElementById("dönüşüm-gender").value;
        let sonuc;

        if (dereceCinsi === dönüşümCinsi) {
            sonuc = derece;
        } else {
            switch (dereceCinsi + '-' + dönüşümCinsi) {
                case "°C-K":
                    sonuc = derece + 273.15;
                    break;
                case "°C-°F":
                    sonuc = derece * 9/5 + 32;
                    break;
                case "K-°C":
                    sonuc = derece - 273.15;
                    break;
                case "K-°F":
                    sonuc = (derece - 273.15) * 9/5 + 32;
                    break;
                case "°F-°C":
                    sonuc = (derece - 32) * 5/9;
                    break;
                case "°F-K":
                    sonuc = (derece - 32) * 5/9 + 273.15;
                    break;
                default:
                    sonuc = "Geçersiz dönüşüm";
            }
        }

        document.getElementById("result").value = sonuc + dönüşümCinsi;
    });
}

/*Uzunluk dönüştürücü*/
if (document.getElementById("uzunluk")) {

    const unitConversion = {
        mm: 1,
        cm: 10,
        m: 1000,
        km: 1000000,
        mil: 1609344,
        in: 25.4,
    };

    document.getElementById("uzunluk-form").addEventListener("submit", function(event){
        event.preventDefault()

        const uzunlukCinsi = document.getElementById("uzunluk-gender").value
        const dönüşümCinsi = document.getElementById("dönüşüm-gender").value
        const deger = parseFloat(document.getElementById("deger").value)

        const valueInMm = deger * unitConversion[uzunlukCinsi];
        let sonuc = valueInMm / unitConversion[dönüşümCinsi];

        result.value = sonuc
    })
}

/*Ağırlık dönüştürücü*/

if (document.getElementById("agirlik")) {
    const unitConversion = {
        kg: 1,
        g: 0.001,
        mg: 0.000001,
        lb: 0.453592,
        oz: 0.0283495,
        t: 1000,
    };
    document.getElementById("agirlik-form").addEventListener("submit", function(event){
        event.preventDefault()
        const value = parseFloat(document.getElementById("value").value);
        const fromUnit = document.getElementById("from-unit").value;
        const toUnit = document.getElementById("to-unit").value;

         // Değeri kilogram cinsinden hesapla
         const valueInKg = value * unitConversion[fromUnit];

         // Hedef birime dönüştür
         let sonuc = valueInKg / unitConversion[toUnit];
         result.value = sonuc
    })
}

if (document.getElementById("hacim")) {
    const unitConversion = {
        L: 1,
        mL: 0.001,
        gal: 3.78541,
        pt: 0.473176
    };
    document.getElementById("hacim-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const value = parseFloat(document.getElementById("value").value);
        const fromUnit = document.getElementById("from-unit").value;
        const toUnit = document.getElementById("to-unit").value;

        // Değeri litre cinsinden hesapla
        const valueInL = value * unitConversion[fromUnit];

        // Hedef birime dönüştür
        let sonuc = valueInL / unitConversion[toUnit];
        result.value = sonuc

    });
}