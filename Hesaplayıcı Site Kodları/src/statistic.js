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

if (document.getElementById("medyan")){
    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault()

        function findMedianFromTextarea() {
            // Textarea'dan değeri alalım (örneğin id'si "myTextarea" olan bir textarea)
            const textarea = document.getElementById('medyan-verileri');
            let inputValue = textarea.value;
            inputValue = inputValue.replace(/\s+/g, " ").trim()
          
            // Girilen değeri virgüllere göre ayırarak bir diziye dönüştürelim
            const numbers = inputValue.split(' ').map(Number);
          
            // Boş veya geçersiz girişleri kontrol edelim
            if (numbers.length === 0 || numbers.some(isNaN)) {
              return "Lütfen düzgün giriniz."
            }else {
                const sortedNumbers = numbers.sort((a, b) => a - b);
                const middle = Math.floor(sortedNumbers.length / 2);
                if (sortedNumbers.length % 2 === 1) {
                    return sortedNumbers[middle];
                }else {
                    return (sortedNumbers[middle - 1] + sortedNumbers[middle]) / 2;
                }
            }}

            result.value = findMedianFromTextarea()

    })
}

if (document.getElementById("mod")){
    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault()

        function findMode(arr) {
            let frequencyMap = {};  // Her öğenin kaç defa geçtiğini tutmak için bir obje
            let maxFreq = 0;        // Maksimum tekrar sayısı
            let mode = [];          // En sık görülen değerleri tutmak için
        
            // Frekans haritasını oluşturuyoruz
            arr.forEach(item => {
                frequencyMap[item] = (frequencyMap[item] || 0) + 1;  // Eğer öğe daha önce görülmemişse 1, görülmüşse 1 artır
                if (frequencyMap[item] > maxFreq) {
                    maxFreq = frequencyMap[item];  // Maksimum frekansı güncelle
                }
            });
        
            // Eğer tüm elemanlar eşit sıklıkta geçtiyse mod yoktur
            if (maxFreq === 1) {
                return "Mod yok!";  // Mod yok
            }
        
            // En sık geçen değeri buluyoruz
            for (let item in frequencyMap) {
                if (frequencyMap[item] === maxFreq) {
                    mode.push(item);  // Maksimum frekans sayısına sahip olan öğeleri diziye ekle
                }
            }
        
            // Tek bir mod varsa onu dön, yoksa modlar dizisini dön
            if (mode.length === 1) {
                return mode[0];
            } else {
                return mode;
            }
        }
        
        let textareaData = (document.getElementById("mod-verileri").value).replace(/\s+/g, " ").trim().split(" ")
        result.value = findMode(textareaData) 
    })
}

if (document.getElementById("aritmetik-ortalama")) {
    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault();
        
        // Verileri textarea'dan al ve string olarak tut
        const textarea = document.getElementById("ortalama-verileri");
        let inputData = textarea.value;  // Değer string olmalı
        inputData = inputData.replace(/\s+/g, " ").trim()
        
        // Verileri virgüllerle ayır ve bir dizi oluştur
        const veriler = inputData.split(" ").map(veri => parseFloat(veri.trim()));
        
        // Toplamı bul
        let sum = 0;
        let devam = true;
        veriler.forEach(veri => {
            if (Number.isNaN(veri)){
                result.value = "Lütfen sadece sayı girin."
                devam = false
            }else {
                sum += veri;  // Her veriyi sayıya çevirerek toplama ekle

            }
            
        });
        if (devam){
            let ortalama = sum / veriler.length;
            result.value = ortalama
        } 
    });
}

if (document.getElementById("varyans")) {
    document.getElementById("form").addEventListener("submit", function(event) {
        event.preventDefault();

        const textarea = document.getElementById("varyans-verileri");
        let inputData = textarea.value;
        inputData = inputData.replace(/\s+/g, " ").trim()
        const veriler = inputData.split(" ").map(veri => parseFloat(veri.trim()));

        // Giriş verilerinin sayı olduğundan emin ol
        if (veriler.some(isNaN)) {
            result.value = "Sadece sayı giriniz."
            return;
        }        

        function varyans(veriler) {
            const toplam = veriler.reduce((acc, veri) => acc + veri, 0);
            const ortalama = toplam / veriler.length;

            const farklar = veriler.map(veri => ortalama - veri);
            const kareler = farklar.map(fark => fark * fark);

            const karelerToplami = kareler.reduce((acc, kare) => acc + kare, 0);

            if (document.getElementById("checkbox").checked){
                const varyansimiz = karelerToplami / (veriler.length - 1); // Örneklem varyansı
                return varyansimiz
            }else {
                const varyansimiz = karelerToplami / (veriler.length); // Popülasyon varyansı
                return varyansimiz
            }
        
        }

        result.value = varyans(veriler)
    });
}

if (document.getElementById("standart-sapma")){

    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault()
        const textarea = document.getElementById("standart-sapma-verileri");
        let inputData = textarea.value;
        inputData = inputData.replace(/\s+/g, " ").trim()
        const veriler = inputData.split(" ").map(veri => parseFloat(veri.trim()));
    
        function varyans(veriler) {
            const toplam = veriler.reduce((acc, veri) => acc + veri, 0);
            const ortalama = toplam / veriler.length;
    
            const farklar = veriler.map(veri => ortalama - veri);
            const kareler = farklar.map(fark => fark * fark);
    
            const karelerToplami = kareler.reduce((acc, kare) => acc + kare, 0);
    
            if (document.getElementById("checkbox").checked){
                const varyansimiz = karelerToplami / (veriler.length - 1); // Örneklem varyansı
                return varyansimiz
            }else {
                const varyansimiz = karelerToplami / (veriler.length); // Popülasyon varyansı
                return varyansimiz
            }
        }
        const standartSapma = Math.sqrt(varyans(veriler))
        result.value = standartSapma
    })
}