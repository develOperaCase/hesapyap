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

function allNotRequired(...args) {
    args.forEach(arg => {
        arg.setAttribüte.removeAttribute("required");
    })
}


if (document.getElementById("enflasyon")) {
    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault()
        const yeniFiyat = parseFloat(document.getElementById("yeni-fiyat").value)
        const eskiFiyat = parseFloat(document.getElementById("eski-fiyat").value)

        let enflasyonOranı = ((yeniFiyat - eskiFiyat)/eskiFiyat) * 100

        // Yuvarlama ve formatlama
        let formattedEnflasyonOranı;
        if (Number.isInteger(enflasyonOranı)) {
            formattedEnflasyonOranı = enflasyonOranı.toString(); // Tam sayı olarak kalır
        } else {
            formattedEnflasyonOranı = enflasyonOranı.toFixed(2); // İki ondalık basamağa yuvarlanır
        }

        result.value = "%" + formattedEnflasyonOranı
    })
}

if (document.getElementById("kar-zarar")) {
    const cins = document.getElementById("cins")
    /*containerlar*/
    const toplamGelirContainer = document.getElementById("toplam-gelir-container")
    const dogrudanMaliyetContainer = document.getElementById("doğrudan-maliyet-container")
    const brütGelirContainer = document.getElementById("brüt-gelir-container")
    const genelGiderContainer = document.getElementById("genel-giderler-container")

    /*inputlar*/
    const toplamGelir = document.getElementById("toplam-gelir")
    const dogrudanMaliyet = document.getElementById("doğrudan-maliyet")
    const brütGelir = document.getElementById("brüt-gelir")
    const genelGider = document.getElementById("genel-giderler")

    cins.addEventListener("change", function(){
        switch (cins.value) {
            case "brüt":
                allHide(toplamGelirContainer, dogrudanMaliyetContainer, brütGelirContainer, genelGiderContainer)
                toplamGelirContainer.classList.remove("display-none")
                dogrudanMaliyetContainer.classList.remove("display-none")
                toplamGelir.setAttribute("required", "true")
                dogrudanMaliyet.setAttribute("required", "true")
                brütGelir.removeAttribute("required")
                genelGider.removeAttribute("required")
                break;

            case "net":
                allHide(toplamGelirContainer, dogrudanMaliyetContainer, brütGelirContainer, genelGiderContainer)
                brütGelirContainer.classList.remove("display-none")
                genelGiderContainer.classList.remove("display-none")
                toplamGelir.removeAttribute("required")
                dogrudanMaliyet.removeAttribute("required")
                brütGelir.setAttribute("required", "true")
                genelGider.setAttribute("required", "true")

                break;

                
        }
    })

    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault()
        
        if (cins.value=="brüt"){
            result.value = parseFloat(toplamGelir.value) - parseFloat(dogrudanMaliyet.value)
        }else if (cins.value = "net") {
            result.value = parseFloat(brütGelir.value) - parseFloat(genelGider.value)
        }
    })
}

if (document.getElementById("arazibirimleri")) {
    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault()
        const değer = parseFloat(document.getElementById("değer").value)
        const değerBirimi = document.getElementById("değer-birimi").value
        const dönüşümBirimi = document.getElementById("dönüşüm-birimi").value

        function metrekareDönüşüm(deger, dönBirim){
            if (dönBirim == "km²"){
                return (deger / 1000000)
            }else if(dönBirim == "eski-dönüm"){
                return deger / 918.4
            }else if (dönBirim == "yeni-dönüm"){
                return deger / 1000
            }else if (dönBirim == "dekar"){
                return deger / 1000
            }else if (dönBirim == "hektar"){
                return deger / 10000
            }
        }
        function toMetrekareDönüşüm(dönüşüm, deger){
            if (dönüşüm == "km²"){
                return (deger * 1000000)
            }else if (dönüşüm == "eski-dönüm"){
                return (deger * 918.4)
            }else if (dönüşüm == "yeni-dönüm"){
                return(deger*1000)
            }else if (dönüşüm == "dekar"){
                return (deger * 1000)
            }else if (dönüşüm == "hektar"){
                return (deger * 10000)
            }
        }

        if (değerBirimi == dönüşümBirimi) {
            result.value = değer
        }else if (değerBirimi == "m²") {
            result.value = metrekareDönüşüm(değer,dönüşümBirimi)
        }else if (değerBirimi == "km²" && dönüşümBirimi == "m²"){
            result.value = toMetrekareDönüşüm(değerBirimi, değer)
        }else if (değerBirimi == "km²" && dönüşümBirimi == "eski-dönüm"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi, değer), dönüşümBirimi)
        }else if (değerBirimi == "km²"&& dönüşümBirimi == "yeni-dönüm"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi, değer), dönüşümBirimi)
        }else if (değerBirimi == "km²" && dönüşümBirimi == "dekar"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi, değer), dönüşümBirimi)
        }else if (değerBirimi == "km²" && dönüşümBirimi == "hektar"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi, değer), dönüşümBirimi)
        }else if (değerBirimi == "eski-dönüm" && dönüşümBirimi == "m²"){
            result.value = toMetrekareDönüşüm(değerBirimi, değer)
        }else if (değerBirimi == "eski-dönüm" && dönüşümBirimi == "km²"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi,değer), dönüşümBirimi)
        }else if (değerBirimi == "eski-dönüm" && dönüşümBirimi == "yeni-dönüm"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi,değer), dönüşümBirimi)
        }else if (değerBirimi == "eski-dönüm" && dönüşümBirimi == "dekar"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi,değer), dönüşümBirimi)
        }else if (değerBirimi == "eski-dönüm" && dönüşümBirimi == "hektar"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi,değer), dönüşümBirimi)
        }else if (değerBirimi == "yeni-dönüm" && dönüşümBirimi == "m²"){
            result.value = toMetrekareDönüşüm(değerBirimi, değer)
        }else if (değerBirimi == "yeni-dönüm" && dönüşümBirimi == "km²"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi,değer), dönüşümBirimi)
        }else if (değerBirimi == "yeni-dönüm" && dönüşümBirimi == "eski-dönüm"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi,değer), dönüşümBirimi)
        }else if (değerBirimi == "yeni-dönüm" && dönüşümBirimi == "dekar"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi,değer), dönüşümBirimi)
        }else if (değerBirimi == "yeni-dönüm" && dönüşümBirimi == "hektar"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi,değer), dönüşümBirimi)
        }else if (değerBirimi == "dekar" && dönüşümBirimi == "m²"){
            result.value = toMetrekareDönüşüm(değerBirimi, değer)
        }else if (değerBirimi == "dekar" && dönüşümBirimi == "km²"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi,değer), dönüşümBirimi)
        }else if (değerBirimi == "dekar" && dönüşümBirimi == "eski-dönüm"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi,değer), dönüşümBirimi)
        }else if (değerBirimi == "dekar" && dönüşümBirimi == "yeni-dönüm"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi,değer), dönüşümBirimi)
        }else if (değerBirimi == "dekar" && dönüşümBirimi == "hektar"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi,değer), dönüşümBirimi)
        }else if (değerBirimi == "hektar" && dönüşümBirimi == "m²"){
            result.value = toMetrekareDönüşüm(değerBirimi, değer)
        }else if (değerBirimi == "hektar" && dönüşümBirimi == "km²"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi,değer), dönüşümBirimi)
        }else if (değerBirimi == "hektar" && dönüşümBirimi == "eski-dönüm"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi,değer), dönüşümBirimi)
        }else if (değerBirimi == "hektar" && dönüşümBirimi == "yeni-dönüm"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi,değer), dönüşümBirimi)
        }else if (değerBirimi == "hektar" && dönüşümBirimi == "dekar"){
            result.value = metrekareDönüşüm(toMetrekareDönüşüm(değerBirimi,değer), dönüşümBirimi)
        }
    })
}