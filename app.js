let oblicz = document.getElementById('oblicz');

function zamknij_wynik(){
    document.getElementById('card').style.display = 'none';
    document.getElementById('form').style.display = 'flex';
}

oblicz.addEventListener("click",(e)=>{
    e.preventDefault;

    let wzrost = document.getElementById('wzrost').value;
    let waga = document.getElementById('waga').value;
    let il_napoju = document.getElementById('il_napoju').value;
    let proc_alk = document.getElementById('proc_alk').value;
    let czas_picia = document.getElementById('czas_picia').value;
    let czas_wypicia = document.getElementById('czas_wypicia').value;
    let mez = document.getElementById('mez');
    let kob = document.getElementById('kob');
    let na_czczo = document.getElementById('na_czczo');
    let zapelniony = document.getElementById('zapelniony');
    

    let czas_wchlaniania_min = 0;
    let promile = 0;
    let il_alk_dostarczanego_na_min = 0;
    let il_alk_wchlanianego_na_min = 0;
    let standardowy_proc_plyn = 0;
    let suma_plynow = 0;
    let roz_norm_bmi = 0;
    let norm_il_plynow = 0;
    let il_wody = 0;
    let il_alk_w_g_akt = 0;
    let ile_usun_zmien_godz = 0;
    let ile_usun_zmien_min = 0;
    let roznica_czasu_wypicia = 0;
    let roznica_czasu_picia = 0;
    let as_czy_es;
    let ponizej_czy_powyzej_BMI;

    function odejmij_od_szczyt_alk(){ //określa ile alkoholu powiniśmy mieć w czasie, gdy czas wypicia będzie większy niż ten do szczytowego
        ile_usun_zmien_min = ile_usun_zmien_godz / 60;
        console.log("ile_usun_zmien_min: ", ile_usun_zmien_min)
        roznica_czasu_wypicia = czas_wypicia - czas_wchlaniania_min;
        ile_usun_zmien_min = ile_usun_zmien_min * roznica_czasu_wypicia;
        console.log("ile_usun_zmien_godz: ", ile_usun_zmien_godz)
        il_alk_w_g_akt = il_alk_w_g - ile_usun_zmien_min;
        console.log("il_alk_w_g_akt: ", il_alk_w_g_akt)
        
    }
    function odejmij_od_szczyt_alk_z_czas_picia(){
        ile_usun_zmien_min = ile_usun_zmien_godz / 60;
        roznica_czasu_picia = czas_picia - czas_wchlaniania_min;
        ile_usun_zmien_min = ile_usun_zmien_min * roznica_czasu_picia;
        il_alk_w_g_akt = il_alk_w_g - ile_usun_zmien_min;
    }

    function il_alk_w_g_akt_wchl(){ //określa ile alkoholu powiniśmy mieć w czasie
        il_alk_w_g_akt = il_alk_wchlanianego_na_min * czas_wypicia;
    }


    let wzrost_kwad = (wzrost/100)*(wzrost/100);
    let BMI = (waga/wzrost_kwad); //BMI jest potrzebne aby określić ile w naszym ciele jest łącznie płynów

    let il_alk = il_napoju * (proc_alk/100);
    let il_alk_w_g = il_alk * 0.79; //ile gramów wypiliśmy alkoholu

    if(na_czczo.checked == true){
        czas_wchlaniania_min = 30; //przeciętnie ilość minut, kiedy pozmio alkoholu we krwi osiągnie szczyt
    }
    if(zapelniony.checked == true){
        czas_wchlaniania_min = 120; //przeciętnie ilość minut, kiedy pozmio alkoholu we krwi osiągnie szczyt
    }

    il_alk_wchlanianego_na_min = il_alk_w_g/czas_wchlaniania_min; //określa ile jest w stanie nasz orgamizm wchonąć alkoholu na minutę
    il_alk_dostarczanego_na_min = il_alk_w_g/czas_picia; //określa ile dostarczamy do żołądka alkoholu na minutę

    if(mez.checked == true){
        standardowy_proc_plyn = 0.7;
        ile_usun_zmien_godz = 11; //określa ile statystycznie ciało jest w stanie usunąć gramów alkoholu na godzinę
        as_czy_es = "eś";

    }
    if(kob.checked == true){
        standardowy_proc_plyn = 0.6;
        ile_usun_zmien_godz = 9;
        as_czy_es = "aś";
    }

    if(BMI > 25){
        ponizej_czy_powyzej_BMI = "powyżej zalecanego";
        roz_norm_bmi = (BMI - 25) * wzrost_kwad; //określa ile mamy nadwagi
        console.log(roz_norm_bmi);
        norm_il_plynow = standardowy_proc_plyn * (waga - roz_norm_bmi); //określa ile przeciętnie powiniśmy mieć
        console.log(norm_il_plynow);
        il_wody = 0.15 * roz_norm_bmi; //określa ile w tkance tłuszczowej mamy wody
        suma_plynow = norm_il_plynow + il_wody;
    }
    else if(BMI <= 18.5){ //to samo co powyżej, tyle że dotyczy niedowagi
        ponizej_czy_powyzej_BMI = "poniżej zalecanego";

        roz_norm_bmi = (BMI - 18.5) * wzrost_kwad;
        norm_il_plynow = standardowy_proc_plyn * (waga - roz_norm_bmi);
        il_wody = 0.15 * roz_norm_bmi;
        suma_plynow = norm_il_plynow + il_wody;
    }
    else{
        suma_plynow = standardowy_proc_plyn * waga;
        ponizej_czy_powyzej_BMI = "w normie";
        
    }

    if(czas_picia == 0){
        if(czas_wypicia <= czas_wchlaniania_min){
            il_alk_w_g_akt_wchl();
        }else{
            odejmij_od_szczyt_alk();
        }
    }else{
        if(il_alk_wchlanianego_na_min >= il_alk_dostarczanego_na_min){
            if(czas_picia <= czas_wchlaniania_min){
                il_alk_w_g_akt = il_alk_dostarczanego_na_min * czas_picia;
            }else{
                odejmij_od_szczyt_alk_z_czas_picia();
            }
        }else{
            if(czas_wypicia <= czas_wchlaniania_min){
                il_alk_w_g_akt_wchl();
            }else{
                odejmij_od_szczyt_alk();

            }
        }
    }
    
    if(il_alk_dostarczanego_na_min == Infinity){ //ten warunek powoduje, że dane końcowe będą bardziej rzetelne
        il_alk_dostarczanego_na_min = "???"; 
    }
    if(il_alk_wchlanianego_na_min == Infinity){
        il_alk_wchlanianego_na_min = "???";
    }

    promile = il_alk_w_g_akt / suma_plynow;

    document.getElementById('form').style.display = 'none';
    document.getElementById('card').style.display = 'flex';

    document.getElementById('wynik_promile').innerText = `Promile: ${promile.toFixed(2)}`;
    document.getElementById('il_alk_w_g_akt').innerHTML = `Masz ${il_alk_w_g_akt.toFixed(2)} gramów alkoholu we krwi aktualnie`;
    document.getElementById('il_alk_dostarczanego_na_min').innerText = `Dostarczył${as_czy_es} ${il_alk_dostarczanego_na_min.toFixed(2)} gramów alkoholu na minutę`;
    document.getElementById('il_alk_wchlanianego_na_min').innerText = `Twój organizm wchłania ${il_alk_dostarczanego_na_min.toFixed(2)} gramów alkoholu na minutę`;
    document.getElementById('BMI').innerText = `Twoje BMI wynosi ${BMI.toFixed(2)}, co jest ${ponizej_czy_powyzej_BMI}`;
    document.getElementById('plyny').innerText = `Posiadasz ${suma_plynow.toFixed(2)} kg płynów`;
});

