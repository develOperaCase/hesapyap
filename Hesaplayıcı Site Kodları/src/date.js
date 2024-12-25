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

if (document.getElementById("yaşhesap")) {
    document.getElementById("form").addEventListener("submit", function(event) {
        event.preventDefault();

        let birthDate = document.getElementById("doğum-tarihi").value;
        let birthDateObject = new Date(birthDate);
        let todayObject = new Date();
        let çıktıŞekli = document.getElementById("çıktı-şekli").value;

        let years = todayObject.getFullYear() - birthDateObject.getFullYear();
        let months = todayObject.getMonth() - birthDateObject.getMonth();
        let days = todayObject.getDate() - birthDateObject.getDate();

        if (days < 0) {
            months--;
            const oncekiAy = new Date(todayObject.getFullYear(), todayObject.getMonth(), 0); // Geçerli ayın son günü
            days += oncekiAy.getDate(); // Günü önceki ayın gün sayısına ekle
        }
    
        if (months < 0) {
            years--;
            months += 12;
        }

        if (çıktıŞekli == "yıllık") {
            result.value = `${years} yıl, ${months} ay, ${days} gün`;
        } else if (çıktıŞekli == "aylık") {
            months += years * 12;
            result.value = `${months} ay, ${days} gün`;
        } else if (çıktıŞekli == "haftalık") {
            let totalDays = (years * 365.25) + (months * 30.44) + days; // Ortalama gün hesaplaması
            let week = Math.floor(totalDays / 7); // Haftaları hesapla
            days = totalDays % 7; // Kalan günleri bul
            result.value = `${week} hafta, ${Math.floor(days)} gün`;
        } else if (çıktıŞekli == "günlük") {
            let totalDays = (years * 365.25) + (months * 30.44) + days; // Ortalama gün hesaplaması
            result.value = `${Math.floor(totalDays)} gün`;
        }
    });
}

if(document.getElementById("iki-tarih")){
    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault()

        const ilkTarih = document.getElementById("ilk-tarih").value
        const ikinciTarih = document.getElementById("ikinci-tarih").value

        const startDate = new Date(ilkTarih)
        const endDate = new Date(ikinciTarih)

        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();
        let days = endDate.getDate() - startDate.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0); // Geçerli ayın son günü
            days += lastMonth.getDate(); // Kalan günleri önceki ayın gün sayısına ekle
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        result.value = `${years}yıl, ${months}ay, ${days}gün`
    })
}
