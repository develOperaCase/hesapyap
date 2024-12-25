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

function allRequiredFalse(...args){
    args.forEach(arg => {
        arg.required = false
    })
}

/*Fakötriyel Hesaplayıcı*/
if (document.getElementById("faktöriyel")) {
    document.getElementById("faktöriyel-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const sayi = parseInt(document.getElementById("sayi").value);
        const result = document.getElementById("result");
        
        if (sayi < 0) {
            result.value = "Geçersiz İşlem";
            return;
        } else if (sayi === 0 || sayi === 1) {
            result.value = sayi + "! = " + 1 ;
            return;
        }

        let fak = BigInt(1);
        for (let i = BigInt(2); i <= sayi; i++) {
            fak *= i;
        }
        
        result.value =sayi + "! = " + BigInt(fak).toString();

        const textarea = result
        
        // Textarea'nın yüksekliğini sıfırla, sonra içeriği okur ve ayarla
        textarea.style.height = "30px"; // İlk olarak yüksekliği sıfırla
        textarea.style.height = `${textarea.scrollHeight}px`; // İçeriğe göre ayarla

    });
}

/*İki nokta arası mesafe hesaplayıcı*/
if (document.getElementById("ikinokta")) {
    const boyut = document.getElementById("boyut-gender");
    const zContainer = document.getElementById("z-container");
    const result = document.getElementById("result"); // Sonucu göstereceğiniz input'u seçin

    boyut.addEventListener("change", function() {
        if (boyut.value === "2D") {
            zContainer.classList.add("display-none");
            const z1= document.getElementById("z1").removeAttribute("required")
            const z2= document.getElementById("z2").removeAttribute("required")
        } else {
            zContainer.classList.remove("display-none");
            const z1= document.getElementById("z1").setAttribute("required", true)
            const z2= document.getElementById("z2").setAttribute("required", true)
        }
    });

    document.getElementById("ikinokta-form").addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Değerleri form gönderildiğinde alın
        const xArray = [
            parseFloat(document.getElementById("x1").value),
            parseFloat(document.getElementById("x2").value)
        ];
        const yArray = [
            parseFloat(document.getElementById("y1").value),
            parseFloat(document.getElementById("y2").value)
        ];
        const zArray = [
            parseFloat(document.getElementById("z1").value),
            parseFloat(document.getElementById("z2").value)
        ];

        let cevap;
        switch (boyut.value) {
            case "2D":
                cevap = Math.sqrt(
                    Math.pow(xArray[1] - xArray[0], 2) + 
                    Math.pow(yArray[1] - yArray[0], 2)
                );
                result.value = cevap.toFixed(2); // Sonucu input'a yaz
                break;

            case "3D":
                cevap = Math.sqrt(
                    Math.pow(xArray[1] - xArray[0], 2) + 
                    Math.pow(yArray[1] - yArray[0], 2) + 
                    Math.pow(zArray[1] - zArray[0], 2)
                );
                result.value = cevap.toFixed(2); // Sonucu input'a yaz
                break;
        }
    });
}

/*Eğim Hesaplama*/
if (document.getElementById("egim")) {
    const typeGender = document.getElementById("type-gender")
    const klasikContainer = document.getElementById("klasik-yöntem")
    const tanjantContainer = document.getElementById("tanjant-container")
    const analitikContainer = document.getElementById("analitik-container")
    const y2 = document.getElementById("y2")
    const y1 = document.getElementById("y1")
    const x2 = document.getElementById("x2")
    const x1 = document.getElementById("x1")
    const tanjan = document.getElementById("tanjant")
    const denklem = document.getElementById("denklem")

    typeGender.addEventListener("change", function() {
        switch (typeGender.value) {
            case "klasik":
                allHide(tanjantContainer, analitikContainer)
                klasikContainer.classList.remove("display-none")
                allRequiredFalse(y2,y1,x2,x1,tanjan,denklem)
                y2.required = true
                y1.required = true
                x2.required = true
                x1.required = true
                break;
            case "trigonometri":
                allHide(klasikContainer,analitikContainer)
                tanjantContainer.classList.remove("display-none")
                allRequiredFalse(y2,y1,x2,x1,tanjan,denklem)
                tanjan.required = true
                break;
            case "analitik":
                allHide(klasikContainer, tanjantContainer)
                analitikContainer.classList.remove("display-none")
                allRequiredFalse(y2,y1,x2,x1,tanjan,denklem)
                denklem.required = true
                break;
            case "":
                allHide(klasikContainer, tanjantContainer, analitikContainer)

    }
    })

    document.getElementById("egim-form").addEventListener("submit", function(event) {
        event.preventDefault();

        switch (typeGender.value) {
            case "klasik":
                let y2th = y2.value
                let y1th = y1.value
                let x2th = x2.value
                let x1th = x1.value

                let sonuc = (y2th-y1th) / (x2th-x1th)

                if (x2th-x1th == 0 && y2th-y1th == 0) {
                    sonuc = "Belirsizlik"
                }else if (x2th-x1th == 0) {
                    sonuc = "Tanımsız"
                }
                result.value = sonuc
                break;
            case "trigonometri":
                const tanjantDerecesi = tanjan.value
                if (tanjantDerecesi == 90 || tanjantDerecesi == 270) {
                    result.value = "Tanımsız"
                }else if (tanjantDerecesi == 45) {
                    result.value = 1
                }else {
                    let radian = tanjantDerecesi * (Math.PI / 180)
                    let tanjan = Math.tan(radian)
                    result.value = tanjan
                }
                break;
            case "analitik":
                const equation = denklem.value.trim();
                // RegExp ile 'mx + y' şeklindeki denklemi ayırma
                const regex = /^([-+]?\d*)x\s*([-+]\s*\d+)?$/;
                const match = equation.match(regex);

                if (match) {
                // 'm' değeri
                    let m = match[1] || 1;
                    if (m === '+' || m === '') {
                        m = 1;
                    } else if (m === '-') {
                        m = -1;
                    } else {
                        m = parseFloat(m);
                    }

                    // Sonucu göster
                    result.value = m
                } else {
                    result.value = "Geçersiz denklem"
                }
                break;}})}

/*Açı dönüştürme*/
if (document.getElementById("açı")) {
    const girilenCins = document.getElementById("açı-gender")
    const dönüşümCinsi = document.getElementById("dönüşüm-gender")  
    const piContainer = document.getElementById("pi-container")

    function updatePiContainerVisibility() {
        const dönüşüm = dönüşümCinsi.value;
        const girilen = girilenCins.value;
    
        if (dönüşüm === "radyan" || girilen === "radyan") {
            piContainer.classList.remove("display-none");
        } else {
            piContainer.classList.add("display-none");
        }
    }
    
    dönüşümCinsi.addEventListener("change", updatePiContainerVisibility);
    girilenCins.addEventListener("change", updatePiContainerVisibility);

    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault()  
        const girilenDeger = parseFloat(document.getElementById("girilen-deger").value)
        const piDegeri = document.getElementById("pi-container")

        function piVarMı() {
            if (document.getElementById("pi-sayısı").value) {
                return document.getElementById("pi-sayısı").value
            }else {
                return Math.PI
            }
        }

        if (girilenCins.value == dönüşümCinsi.value) {
            result.value = girilenDeger
        } else if (girilenCins.value == "derece" && dönüşümCinsi.value == "radyan") {
            let sonuc = girilenDeger * (piVarMı() / 180)
            result.value = sonuc
        }else if (girilenCins.value == "derece" && dönüşümCinsi.value == "gradyan") {
            let sonuc = girilenDeger * 10/9
            result.value = sonuc
        } else if (girilenCins.value == "radyan" && dönüşümCinsi.value == "derece") {
            let sonuc = girilenDeger * (180/piVarMı())
            result.value = sonuc
        } else if (girilenCins.value== "radyan" && dönüşümCinsi.value == "gradyan") {
            let sonuc = girilenDeger * (200/piVarMı())
            result.value = sonuc
        } else if (girilenCins.value == "gradyan" && dönüşümCinsi.value == "derece") {
            let sonuc = girilenDeger * (180/200)
            result.value = sonuc
        } else if (girilenCins.value == "gradyan" && dönüşümCinsi.value == "radyan") {
            let sonuc = girilenDeger * (piVarMı()/200)
            result.value = sonuc
        }
})}

/*Sayi tabani çevirici*/
if (document.getElementById("sayıtabani")) {
    document.getElementById("sayitabani-form").addEventListener("submit", function(event){
    event.preventDefault()
    // Girdi doğrulama işlevi
function validateInput(value, base) {
    if (base === 2) {
        // İkili sayılar sadece 0 ve 1 içermelidir
        return /^[01]+$/.test(value);
    } else if (base === 10) {
        // Ondalık sayılar sadece 0-9 içermelidir
        return /^[0-9]+$/.test(value);
    } else if (base === 16) {
        // Onaltılı sayılar 0-9 ve A-F içermelidir
        return /^[0-9A-F]+$/.test(value);
    }
    return false;
}

    const inputNumber = document.getElementById('girdi-sayısı').value.toUpperCase();
    const inputBase = parseInt(document.getElementById('girdi-gender').value);
    const outputBase = parseInt(document.getElementById('çıktı-gender').value);

    // Sayıyı girdi tabanında decimal (ondalık) tabana çevir
    let decimalNumber;

    // Girdi doğrulama
    if (!validateInput(inputNumber, inputBase)) {
        result.value = "Tabana uygun değil";
        return;
    }

    // Girdi tabanını ondalık tabana çevir
    try {
        decimalNumber = parseInt(inputNumber, inputBase);
    } catch (e) {
        result.value = "Geçersiz girdi"
        return;
    }

    // Decimal sayıyı çıkış tabanına çevir
    let sonuc;
    if (outputBase === 10) {
        sonuc = decimalNumber.toString(10);
    } else if (outputBase === 2) {
        sonuc = decimalNumber.toString(2);
    } else if (outputBase === 16) {
        sonuc = decimalNumber.toString(16).toUpperCase();
    }
    result.value = sonuc;
    })
}

/*Oran hesaplayıcı kısmı*/
if(document.getElementById("oran-hesaplayıcı")){
    
    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault()
        const pay = parseFloat(document.getElementById("pay").value)
        const payda = parseFloat(document.getElementById("payda").value)

        if (pay == 0 && payda == 0){
            result.value = "Belirsizlik"
        }else if (pay == 0){
            result.value = 0
        }else if (payda == 0){
            result.value = "Tanımsız"
        }else {
            result.value = pay / payda
        }
    })
}

if (document.getElementById("yüzde-hesaplayici")){
    const yöntem = document.getElementById("yöntem")
    const işlem1 = document.getElementById("1.işlem")
    const işlem2 = document.getElementById("2.işlem")
    const işlem1Label = document.getElementById("1.işlem-label")
    const işlem2Label =document.getElementById("2.işlem-label")

    yöntem.addEventListener("change", function(){
        
        switch (yöntem.value){
            case "1.":
                işlem1Label.innerHTML = "Sayı"
                işlem2Label.innerHTML = "Yüzdesi"
                işlem1.placeholder = "Sayıyı giriniz"
                işlem2.placeholder = "Yüzdeyi giriniz"
                break;
            case "2.":
                işlem1Label.innerHTML = "1.Sayı"
                işlem2Label.innerHTML = "2.Sayı"
                işlem1.placeholder = "1.Sayıyı giriniz"
                işlem2.placeholder = "2.Sayıyı giriniz"
                break;
        }
    })

    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault()

        if (yöntem.value == "2."){
            result.value = "%" + (parseFloat(işlem1.value) /parseFloat(işlem2.value)) * 100 
        }else if (yöntem.value == "1."){
            result.value =  (parseFloat(işlem2.value) / 100) * parseFloat(işlem1.value)
        }
    })
}