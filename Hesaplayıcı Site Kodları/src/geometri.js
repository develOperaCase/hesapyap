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

function removeRequired(...args){
    args.forEach(arg => {
        arg.removeAttribute("required");
    })
}

if (document.getElementById("Area")){
    const şekil = document.getElementById("shape-gender")
    const kareKenar = document.getElementById("kenar")
    const üçgenTaban = document.getElementById("taban")
    const üçgenYükseklik = document.getElementById("yükseklik")
    const dikdörtgenKısaKenar = document.getElementById("kısa")
    const dikdörtgenUzunKenar = document.getElementById("uzun")
    const dairePi = document.getElementById("pi-sayısı")
    const daireYarıçap = document.getElementById("yarıçap")
    /*Seçilen şeklin kutucuğunu gösterme*/
    şekil.addEventListener("change", function(){
        const şekil2 = şekil.value
        const kareContainer = document.getElementById("kare-hesaplama")
        const üçgenContaner = document.getElementById("üçgen-hesaplama")
        const daireContainer = document.getElementById("daire-hesaplama")
        const dikdörtgenContainer = document.getElementById("dikdörtgen-hesaplama")

        switch (şekil2){
            case "":
                allHide(kareContainer, üçgenContaner, daireContainer, dikdörtgenContainer)
                break;
            case "kare":
                allHide(kareContainer, üçgenContaner, daireContainer, dikdörtgenContainer)
                kareContainer.classList.remove("display-none")
                removeRequired(kareKenar, üçgenTaban, üçgenYükseklik, dikdörtgenKısaKenar, dikdörtgenUzunKenar, daireYarıçap)
                kareKenar.setAttribute("required", "true")
                break;

            case "üçgen":
                allHide(kareContainer, üçgenContaner, daireContainer, dikdörtgenContainer)
                üçgenContaner.classList.remove("display-none")
                removeRequired(kareKenar, üçgenTaban, üçgenYükseklik, dikdörtgenKısaKenar, dikdörtgenUzunKenar, daireYarıçap)
                üçgenTaban.setAttribute("required", "true")
                üçgenYükseklik.setAttribute("required", "true")
                break;
            case "daire":
                allHide(kareContainer, üçgenContaner, daireContainer, dikdörtgenContainer)
                daireContainer.classList.remove("display-none")
                removeRequired(kareKenar, üçgenTaban, üçgenYükseklik, dikdörtgenKısaKenar, dikdörtgenUzunKenar, daireYarıçap)
                daireYarıçap.setAttribute("required", "true")
                break;
            case "dikdörtgen":
                allHide(kareContainer, üçgenContaner, daireContainer, dikdörtgenContainer)
                dikdörtgenContainer.classList.remove("display-none")
                removeRequired(kareKenar, üçgenTaban, üçgenYükseklik, dikdörtgenKısaKenar, dikdörtgenUzunKenar, daireYarıçap)
                dikdörtgenKısaKenar.setAttribute("required", "true")
                dikdörtgenUzunKenar.setAttribute("required", "true")
                break;
        }
    })

    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault()

        switch (şekil.value){
            case "kare":
                result.value = parseFloat(kareKenar.value) ** 2
                break;

            case "üçgen":
                result.value = (parseFloat(üçgenTaban.value) * parseFloat(üçgenYükseklik.value)) / 2
                break;

            case "dikdörtgen":
                result.value = parseFloat(dikdörtgenKısaKenar.value) * parseFloat(dikdörtgenUzunKenar.value)

            case "daire":
                const piSayısı = document.getElementById("pi-sayısı").value
                if (piSayısı){
                    result.value = (parseFloat(piSayısı) * (parseFloat(daireYarıçap.value) ** 2))
                }else {
                    result.value = (Math.PI * (parseFloat(daireYarıçap.value) ** 2)).toFixed(4)
                }
        }
    })
}

if (document.getElementById("çevre")){
    const şekil = document.getElementById("shape-gender")
    const kareKenar = document.getElementById("kare-kenar")
    const üçgenKenarA = document.getElementById("üçgen-kenar-a")
    const üçgenKenarB = document.getElementById("üçgen-kenar-b")
    const üçgenKenarC = document.getElementById("üçgen-kenar-c")
    const dikdörtgenKısaKenar = document.getElementById("dikdörtgen-kısa-kenar")
    const dikdörtgenUzunKenar = document.getElementById("dikdörtgen-uzun-kenar")
    const daireYarıçap = document.getElementById("yarıçap")
    const piSayısı = document.getElementById("pi-sayısı")


    şekil.addEventListener("change", function(){
        const şekil2 = şekil.value
        const kareContainer = document.getElementById("kare-hesaplama")
        const üçgenContaner = document.getElementById("üçgen-hesaplama")
        const daireContainer = document.getElementById("daire-hesaplama")
        const dikdörtgenContainer = document.getElementById("dikdörtgen-hesaplama")

        switch (şekil2){
            case "":
                allHide(kareContainer, üçgenContaner, daireContainer, dikdörtgenContainer)
                break;
            case "kare":
                allHide(kareContainer, üçgenContaner, daireContainer, dikdörtgenContainer)
                kareContainer.classList.remove("display-none")
                removeRequired(kareKenar, üçgenKenarA, üçgenKenarB, üçgenKenarC, dikdörtgenKısaKenar ,dikdörtgenUzunKenar, daireYarıçap)
                kareKenar.setAttribute("required", "true")
                break;

            case "üçgen":
                allHide(kareContainer, üçgenContaner, daireContainer, dikdörtgenContainer)
                üçgenContaner.classList.remove("display-none")
                removeRequired(kareKenar, üçgenKenarA, üçgenKenarB, üçgenKenarC, dikdörtgenKısaKenar ,dikdörtgenUzunKenar, daireYarıçap)
                üçgenKenarA.setAttribute("required", "true")
                üçgenKenarB.setAttribute("required", "true")
                üçgenKenarC.setAttribute("required", "true")
                break;
            case "daire":
                allHide(kareContainer, üçgenContaner, daireContainer, dikdörtgenContainer)
                daireContainer.classList.remove("display-none")
                removeRequired(kareKenar, üçgenKenarA, üçgenKenarB, üçgenKenarC, dikdörtgenKısaKenar ,dikdörtgenUzunKenar, daireYarıçap)              
                daireYarıçap.setAttribute("required", "true")
                break;
            case "dikdörtgen":
                allHide(kareContainer, üçgenContaner, daireContainer, dikdörtgenContainer)
                dikdörtgenContainer.classList.remove("display-none")
                removeRequired(kareKenar, üçgenKenarA, üçgenKenarB, üçgenKenarC, dikdörtgenKısaKenar ,dikdörtgenUzunKenar, daireYarıçap)
                dikdörtgenUzunKenar.setAttribute("required", "true")
                dikdörtgenKısaKenar.setAttribute("required", "true")
                break;
        }
    })

    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault();

        switch (şekil.value) {
            case "kare":
                result.value = (parseFloat(kareKenar.value) * 4)
                break;

            case "dikdörtgen":
                const dikdörtgenÇevre = (parseFloat(dikdörtgenKısaKenar.value) * 2) + (parseFloat(dikdörtgenUzunKenar.value) * 2)
                result.value = dikdörtgenÇevre
                break;

            case "üçgen":
                const üçgenA = parseFloat(üçgenKenarA.value)
                const üçgenB = parseFloat(üçgenKenarB.value)
                const üçgenC = parseFloat(üçgenKenarC.value)
                result.value = üçgenA + üçgenB + üçgenC;
                break;

            case "daire":
                if (piSayısı.value){
                    result.value = 2 * parseFloat(piSayısı.value) * parseFloat(daireYarıçap.value)
                }else {
                    result.value = 2 * Math.PI * parseFloat(daireYarıçap.value)
                }
                break;
        }
    
    })
}

if (document.getElementById("hipotenüs")) {
    const yöntem = document.getElementById("yöntem");
    const hipotenüsContainer = document.getElementById("hipotenüs-container");
    const kenarBContainer = document.getElementById("kenarB-container");
    const hipotenüs = document.getElementById("hipotenüs-inpt");
    const kenarB = document.getElementById("kenarB");
    const kenarA = document.getElementById("kenarA");
    const sonucDegiskeni = document.getElementById("sonuc-degiskeni")
    
    // Yöntem değiştiğinde formu düzenleme
    yöntem.addEventListener("change", function() {
        switch (yöntem.value) {
            case "hipotenüs":
                hipotenüsContainer.classList.add("display-none");
                kenarBContainer.classList.remove("display-none");
                hipotenüs.required = false;
                kenarB.required = true;
                break;
                
            case "kenar":
                kenarBContainer.classList.add("display-none");
                hipotenüsContainer.classList.remove("display-none");
                hipotenüs.required = true;
                kenarB.required = false;
                break;
        }
    });

    document.getElementById("form").addEventListener("submit", function(event) {
        event.preventDefault();

        // Değerleri sayıya çevirme
        const kenarAValue = Number(kenarA.value);
        const kenarBValue = Number(kenarB.value);
        const hipotenüsValue = Number(hipotenüs.value);

        if (yöntem.value == "hipotenüs") {
            let sonuc = (kenarAValue**2 + kenarBValue**2)
            let devam = true

            /*Eğer 0 dan küçük ise geçersiz sonuç döndürme*/
            if (sonuc <= 0){
                result.value = "Geçersiz Sonuç"
                devam = false
            }

            /*Eğer 0 dan büyük ise işleme devam ediyoruz*/
            if (devam){
                if (sonucDegiskeni.value == "karekök"){
                result.value = `√${sonuc}`
            }else {
                result.value = Math.sqrt(kenarAValue**2 + kenarBValue**2);
            }
            }

        }
        else {
            let sonuc = (hipotenüsValue**2 - kenarAValue**2)
            let devam = true

            /*0 dan küçük ise geçersiz sonuç döndür*/
            if (sonuc <= 0){
                result.value = "Geçersiz Sonuç"
                devam = false
            }

            /*Sonuç 0 dan büyük ise işleme devam edilir*/
            if (devam){
                if (sonucDegiskeni.value == "karekök"){
                    result.value = `√${sonuc}`
                }else {
                    result.value = Math.sqrt(hipotenüsValue**2 - kenarAValue**2);
                }                
            }
        }
    });
}

