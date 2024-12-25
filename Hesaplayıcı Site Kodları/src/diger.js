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

function allHide(...args) {
    args.forEach(arg => {
        arg.classList.add("display-none")
    })
}


if (document.getElementById("internet-birimleri")){
    const units = {
        b: 1,
        B: 8,
        KB: 8000,
        MB: 8000000,
        GB: 8000000000,
        TB: 8000000000000,
      };
    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault()
        const fromUnit = document.getElementById("from-unit").value
        const toUnit = document.getElementById("to-unit").value
        const value = parseFloat(document.getElementById("value").value)


        const fromValue = value * units[fromUnit]
        const toValue = fromValue / units[toUnit]

        result.value = toValue
        
    })
}

if (document.getElementById("mutfak-birimleri")){
    const mutfakUnits = {
        tk: "1",
        yk: "2",
        çb: "20",
        sb: "40",
    }
    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault()
        const value = parseFloat(document.getElementById("value").value)
        const mutfakToUnit = document.getElementById("to-unit").value
        const mutfakFromUnit = document.getElementById("from-unit").value

        const mutfakFromValue = value * mutfakUnits[mutfakFromUnit]
        const mutfakToValue = mutfakFromValue / mutfakUnits[mutfakToUnit]
        let sonuc;
        if (mutfakToValue == 0.5){
            sonuc = "Yarım"
        }else if (mutfakToValue == 0.25){
            sonuc = "Çeyrek"
        }else {
            sonuc = mutfakToValue
        }

        result.value = sonuc

    })
}

if(document.getElementById("kelime-sayısı")){
    document.getElementById("form").addEventListener("submit",function(event){
        event.preventDefault()

        const text = document.getElementById("metin-verileri").value.trim();
        const words = text.split(/\s+/); // Boşluklara göre ayır
        const wordCount = text.length > 0 ? words.length : 0; // Eğer metin boş değilse kelime sayısını hesapla


        result.value = wordCount
    })
}

if (document.getElementById("renk-kodu")){
    const girilenRenk = document.getElementById("girilen-renk")
    const renkValue = document.getElementById("value")
    const dönüşenRenk = document.getElementById("dönüşen-renk")

    girilenRenk.addEventListener("change", function(){

        switch (girilenRenk.value){
            case "":
                renkValue.placeholder = "Renk kodu giriniz."
                break;
            case "hex":
                renkValue.placeholder = "HEX kodu giriniz."
                break;
            case "rgb":
                renkValue.placeholder = "RGB kodu giriniz."
                break;}})

    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault();


        /*Hexten rgb dönüşümü*/
        if (girilenRenk.value == "hex" && dönüşenRenk.value == "rgb"){
            let hexKodu = renkValue.value.toUpperCase()
            hexKodu = hexKodu.replace(/^#/, '');

            if (!/^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hexKodu)) {
                result.value = "Geçersiz HEX kodu!"
            }
            
            if (hexKodu.length === 3) {
                hexKodu = hexKodu.split('').map(function(h) {
                    return h + h;
                }).join('');
            }

            let devam = true;
            if (hexKodu.length !== 3 && hexKodu.length !== 6){
                result.value = "Geçersiz format!"
                devam = false;
            }
            if (devam){
                const red = parseInt(hexKodu.slice(0,2), 16)
                const green = parseInt(hexKodu.slice(2,4), 16)            
                const blue = parseInt(hexKodu.slice(4,6), 16)
                result.value = `rgb(${red}, ${green}, ${blue})` 

            }}else if (girilenRenk.value == "rgb" && dönüşenRenk.value == "hex") { /*RGB den HEXE DÖNÜŞÜM*/
                let rgbKodu = renkValue.value.toUpperCase();
                let r, g, b;
            
                // Eğer "RGB" ile başlıyorsa, yoksa direk sayılardan al
                if (rgbKodu.startsWith("RGB")) {
                    const rgbValues = rgbKodu.match(/\d+/g);
            
                    // R, G, B değerlerini tam sayıya çevir
                    if (rgbValues && rgbValues.length === 3) {
                        r = parseInt(rgbValues[0], 10);
                        g = parseInt(rgbValues[1], 10);
                        b = parseInt(rgbValues[2], 10);
                    } else {
                        result.value = "Geçersiz format!" // Hatalı giriş durumunda mesaj
                        return; // Çıkış
                    }
                } else {
                    // Eğer "RGB" ile başlamıyorsa, doğrudan r, g, b değerlerini ayır
                    const rgbValues = rgbKodu.split(',').map(value => value.trim()).map(Number);
            
                    if (rgbValues.length === 3 && rgbValues.every(num => !isNaN(num) && num >= 0 && num <= 255)) {
                        r = rgbValues[0];
                        g = rgbValues[1];
                        b = rgbValues[2];
                    } else {
                        result.value = "Geçersiz format!" // Hatalı giriş durumunda mesaj
                        return; // Çıkış
                    }
                }
            
                // RGB'den HEX'e dönüştürme fonksiyonu
                const toHex = n => n.toString(16).padStart(2, '0').toUpperCase();
            
                // HEX kodunu oluştur
                let hexKodu = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
            
                result.value = hexKodu // HEX kodunu konsola yaz
            }
            
    })
}


if (document.getElementById("mol")) {

    const yöntem = document.getElementById("type-gender")
    const kütleContainer = document.getElementById("kütle-yöntem-container")
    const tanecikContainer = document.getElementById("tanecik-container")
    const igdContainer = document.getElementById("igd-yöntem-container")
    const molariteContainer = document.getElementById("molarite-yöntem-container")

    yöntem.addEventListener("change", function(){
        const yöntemŞekli = yöntem.value
        switch (yöntemŞekli) {
            case "kütle":
                allHide(kütleContainer, tanecikContainer, igdContainer, molariteContainer)
                kütleContainer.classList.remove("display-none")
                break;

            case "tanecik":
                allHide(kütleContainer, tanecikContainer, igdContainer, molariteContainer)
                tanecikContainer.classList.remove("display-none")
                break;
            case "igd":
                allHide(kütleContainer, tanecikContainer, igdContainer, molariteContainer)
                igdContainer.classList.remove("display-none")
                break;
            
            case "molarite":
                allHide(kütleContainer, tanecikContainer, igdContainer, molariteContainer)
                molariteContainer.classList.remove("display-none")
                break;
            default:
                allHide(kütleContainer, tanecikContainer, igdContainer, molariteContainer)
                break;
        }
    })

    document.getElementById("mol-form").addEventListener("submit", function(event){
        event.preventDefault()
        const yöntemŞekli = yöntem.value

        switch (yöntemŞekli) {
            case "kütle":
                const kütle = parseFloat(document.getElementById("kütle").value)
                const molarKütle = parseFloat(document.getElementById("molar-kütle").value)
                let sonuç = kütle / molarKütle
                result.value = sonuç
                break;

            case "tanecik":
                const AVOGADRO_NUMBER = 6.022 * Math.pow(10, 23); // Avogadro sayısı
                let input = document.getElementById("tanecik").value.trim();
        
                // Virgül ile ayrılmış sayıları noktaya çevir
                input = input.replace(/,/g, '.');
                
                // Bilimsel gösterimi işle
                // 1. "6 * 10^23" ve "6 x 10^23" formatları
                // 2. "6e23" formatını elde et
                input = input.replace(/\s*[\*\x]?\s*10[\^eE](\d+)/, "e$1");
                
                // Tanecik sayısını sayıya çevir
                const particleCount = parseFloat(input);
                
                if (isNaN(particleCount) || particleCount <= 0) {
                    document.getElementById("result").textContent = "Geçersiz tanecik sayısı.";
                    return;
                }
                
                // Mol sayısını hesapla
                const moles = particleCount / AVOGADRO_NUMBER;
                
                const roundedMoles = moles.toFixed(10); 
                result.value = roundedMoles
                break;
            
            case "igd": 
                const basınç = parseFloat(document.getElementById("basınç").value)
                const sıcaklık = parseFloat(document.getElementById("sıcaklık").value)
                const hacim = parseFloat(document.getElementById("hacim").value)
                const sabitR = 0.0821

                result.value = ((basınç * hacim) / (sabitR * sıcaklık)).toFixed(4)
                break;
                
            case "molarite":
                const molarite = parseFloat(document.getElementById("molarite").value )
                const molariteHacim = parseFloat(document.getElementById("molarite-hacim").value)
                result.value = molarite / molariteHacim
                break;
        }
    })
}

if (document.getElementById("burç-hesaplayici")){
    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault()

        let doğumTarihi = document.getElementById("doğum-tarihi").value
        /*yıl ay gün şeklinde*/

        doğumTarihi = doğumTarihi.split("-")

        const ay = doğumTarihi[1]
        const gün = doğumTarihi[2]

        let burç = "";

        // Burç hesaplama
        if ((ay == 3 && gün >= 21) || (ay == 4 && gün <= 19)) {
            burç = "Koç";
        } else if ((ay == 4 && gün >= 20) || (ay == 5 && gün <= 20)) {
            burç = "Boğa";
        } else if ((ay == 5 && gün >= 21) || (ay == 6 && gün <= 20)) {
            burç = "İkizler";
        } else if ((ay == 6 && gün >= 21) || (ay == 7 && gün <= 22)) {
            burç = "Yengeç";
        } else if ((ay == 7 && gün >= 23) || (ay == 8 && gün <= 22)) {
            burç = "Aslan";
        } else if ((ay == 8 && gün >= 23) || (ay == 9 && gün <= 22)) {
            burç = "Başak";
        } else if ((ay == 9 && gün >= 23) || (ay == 10 && gün <= 22)) {
            burç = "Terazi";
        } else if ((ay == 10 && gün >= 23) || (ay == 11 && gün <= 21)) {
            burç = "Akrep";
        } else if ((ay == 11 && gün >= 22) || (ay == 12 && gün <= 21)) {
            burç = "Yay";
        } else if ((ay == 12 && gün >= 22) || (ay == 1 && gün <= 19)) {
            burç = "Oğlak";
        } else if ((ay == 1 && gün >= 20) || (ay == 2 && gün <= 18)) {
            burç = "Kova";
        } else if ((ay === 2 && gün >= 19) || (ay == 3 && gün <= 20)) {
            burç = "Balık";
        }

        /*Sonuca yansıtma*/
        result.value = burç
    })
}