let cities = [
    {
    country :"SA",
    city : "Makkah al Mukarramah",
    arabicName : "مكة المكرمة"
},
    {
    country :"SA",
    city : "Ar Riyad",
    arabicName : "الرياض"
},
    {
    country :"SA",
    city : "Ash Sharqīyah",
    arabicName : "الشرقية"
},
    {
    country :"SA",
    city : "Tabūk",
    arabicName : "تبوك"
},
    {
    country :"SA",
    city : "Jeddah",
    arabicName : "جدة"
},
    {
    country :"EG",
    city : "Al Qāhirah	",
    arabicName : "مصر - القاهرة"
},
    {
    country :"YE",
    city : "Şanʻā’",
    arabicName : "اليمن - صنعاء"
},
    {
    country :"IQ",
    city : "Baghdād",
    arabicName : "العراق - بغداد"
},
    {
    country :"SY",
    city : "Dimashq",
    arabicName : "سوريا - دمشق"
},
    {
    country :"OM",
    city : "Masqaţ",
    arabicName : "عمان - مسقط"
},
    {
    country :"QA",
    city : "Ad Dawḩah",
    arabicName : "قطر - الدوحة"
},
    {
    country :"BH",
    city : "Al Manāmah",
    arabicName : "البحرين - المنامة"
},
    {
    country :"KW",
    city : "Al Kuwayt",
    arabicName : "الكويت - الكويت"
},
    {
    country :"US",
    city : "New York",
    arabicName : "امريكا - نيريورك"
},
    {
    country :"US",
    city : "Washington",
    arabicName : "امريكا - واشنطن"
},
    {
    country :"GB",
    city : "London, City of	",
    arabicName : "بريطانيا - لندن"
    }

];

function fillSelectInput(){
    for(city of cities){
        let content = `<option>${city.arabicName}</option>`;
        document.querySelector("select").innerHTML += content;
    }
   
}
fillSelectInput();

 
   
     
async function getPrayTime(country , city ,arabicName){
    let params = {
        country: country,
        city : city
    }
    let res = await axios.get("http://api.aladhan.com/v1/timingsByCity" , {
        params : params
    })
    let info = await res.data;
    let timePray = info.data.timings;
    let dateHijri = info.data.date.hijri.date;
    let date = info.data.date.readable;
    let day = info.data.date.hijri.weekday.ar;
    


    fillCard("day" , day)
    fillCard("city" , arabicName)
    fillCard("dateHijiry" , dateHijri)
    fillCard("date" , date)
    fillCard("Fajr-time" , timePray.Fajr)
    fillCard("Sunrise-time" , timePray.Sunrise)
    fillCard("Dhuhr-time" , timePray.Dhuhr)
    fillCard("Asr-time" , timePray.Asr)
    fillCard("Maghrib-time" , timePray.Maghrib)
    fillCard("Isha-time" , timePray.Isha)
    console.log(info);
    
}
getPrayTime(cities[0].country , cities[0].city , cities[0].arabicName);



function fillCard(id , prayTime){
    document.getElementById(id).innerHTML = prayTime;
}

let select = document.getElementById("cities");
select.addEventListener("change" , ()=>{
    let targetCity ;
    let targetCountry ;
    let targetArabicName;
    for(city of cities){
        if(select.value == city.arabicName){
            targetCity = city.city;
            targetCountry = city.country;
            targetArabicName = city.arabicName;

        }

        
     }
    console.log(select.value)
    getPrayTime(targetCountry , targetCity ,targetArabicName)

})

