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

if (document.getElementById("VKI-form")) {
    /*BMİ hesaplama */
    document.getElementById("VKI-form").addEventListener('submit', function(event) {
        event.preventDefault(); // Formun normal submit işlemini engelle
    
        // Form verilerini al
        const heightValue = parseFloat(document.getElementById('height').value);
        const weightValue = parseFloat(document.getElementById('weight').value);
    
        // Birim dönüşümü
        const heightUnit = document.getElementById('height-gender').value;
        const weightUnit = document.getElementById('weight-gender').value;
    
        let heightInMeters = heightValue;
        let weightInKg = weightValue;
    
        // Boy birimini metreye çevir
        if (heightUnit === 'cm') {
            heightInMeters = heightValue / 100;
            } 
        else if (heightUnit === 'ft') {
            heightInMeters = heightValue * 0.3048;
        }
        // Ağırlık birimini kilograma çevir
        if (weightUnit === 'lb') {
            weightInKg = weightValue * 0.453592;
        }
    
        // BMI hesaplama
        const heightSquared = heightInMeters ** 2;
        const BMI = weightInKg / heightSquared;
    
        result.value = BMI.toFixed(2)
    
    })}

if (document.getElementById("BMH")) {

    document.getElementById("BMH-form").addEventListener("submit", function(event){
        event.preventDefault()

        const cinsiyet = document.getElementById("cinsiyet").value
        const boy = parseFloat(document.getElementById("height").value)
        const kilo = parseFloat(document.getElementById("weight").value)
        const yaş = parseFloat(document.getElementById("years").value)

        if (cinsiyet == "karı") {
            let BMH = 447.6 + (9.2 * kilo) + (3.1 * boy) - (4.3 * yaş)
            result.value = BMH + " kalori/gün"

        }else if (cinsiyet == "erkek") {
            let BMH = (88.36 + (13.4 * kilo) + (4.8 * boy) - (5.7 * yaş)).toFixed(2)
            result.value = BMH + " kalori/gün"
        } 
    })
}

if (document.getElementById("kalori")) {
    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault()
        const etkinlik = document.getElementById("etkinlik").value
        const bmh = parseFloat(document.getElementById("bmh").value)

        switch (etkinlik) {
            case "çok-az":
                result.value = (bmh * 1.2).toFixed(2) + " kalori"
                break;
            case "az":
                result.value = (bmh * 1.375).toFixed(2) + " kalori"
                break;
            case "orta":
                result.value = (bmh * 1.55).toFixed(2) + " kalori"
                break;
            case "fazla":
                result.value = (bmh * 1.725).toFixed(2) + " kalori"
                break;
            case "çok-fazla":
                result.value = (bmh * 1.9).toFixed(2) + " kalori"
        }
    })
}

if (document.getElementById("âdet")) {
    const form = document.getElementById("form")
    const yöntem = document.getElementById("yöntem")

    /*Labeli duruma göre değiştirmek için yaptım*/
    yöntem.addEventListener("change", function() {
        const label = document.getElementById("başlangıç-bitiş")
        const yöntemValue = document.getElementById("yöntem").value
        const reglSüresi = document.getElementById("regl-süresi-container")
        switch (yöntemValue) {
            case "başlangıç":
                label.innerHTML = "Son adet başlangıç"
                reglSüresi.classList.add("display-none")
                break;
            case "bitiş":
                label.innerHTML = "Son adet bitiş"
                reglSüresi.classList.remove("display-none")
                break;
        }})

        /*döngü süresi girildi mi girilmediyse 28 gün döndürücez*/
        function döngüSüresiCheck() {
            if (document.getElementById("döngü-süresi").value) {
                const döngü = parseInt(document.getElementById("döngü-süresi").value, 10) 
                return döngü
            } else {
                const döngü = 28
                return döngü
            }
        }
    /*formu gönderme*/
    form.addEventListener("submit", function(event){
        event.preventDefault()
        /*döngü srüesi girildi mi kontrol et*/

        const döngüSüresi = döngüSüresiCheck()

        /*yöntem seçimi*/
        if (yöntem.value == "başlangıç") {
            let tarih = document.getElementById("başlangıç-bitiş-tarihi").value

            const [year, month, day] = tarih.split('-');
            const başlangıçTarihi = new Date(`${year}-${month}-${day}`);

            başlangıçTarihi.setDate(başlangıçTarihi.getDate() + döngüSüresi);

            // Sonuç tarihini 'dd-mm-yyyy' formatına dönüştürme
            const newDay = String(başlangıçTarihi.getDate()).padStart(2, '0');
            const newMonth = String(başlangıçTarihi.getMonth() + 1).padStart(2, '0');
            const newYear = başlangıçTarihi.getFullYear();
            const nextPeriodStartDate = `${newDay}.${newMonth}.${newYear}` 

            result.value = nextPeriodStartDate;

        }else if (yöntem.value == "bitiş") {
            let tarih = document.getElementById("başlangıç-bitiş-tarihi").value

            let reglSüresi
            if (document.getElementById("regl-süresi").value) {
                reglSüresi = parseInt(document.getElementById("regl-süresi").value, 10);

            }else {
                reglSüresi = 5;
            }
            
            const [year, month, day] = tarih.split('-');
            const başlangıçTarihi = new Date(`${year}-${month}-${day}`);

            başlangıçTarihi.setDate(başlangıçTarihi.getDate() + (döngüSüresi - reglSüresi));

            // Sonuç tarihini 'dd-mm-yyyy' formatına dönüştürme
            const newDay = String(başlangıçTarihi.getDate()).padStart(2, '0');
            const newMonth = String(başlangıçTarihi.getMonth() + 1).padStart(2, '0');
            const newYear = başlangıçTarihi.getFullYear();
            const nextPeriodStartDate = `${newDay}.${newMonth}.${newYear}` 

            result.value = nextPeriodStartDate;
        }
    })

}

if (document.getElementById("su-ihtiyacı")) {
    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault()

        const kilo = parseFloat(document.getElementById("kilo").value)

        result.value = kilo * 33 + "mL"
    })
}