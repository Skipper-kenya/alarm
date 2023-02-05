let form=document.querySelector('#myForm');
let hr_inp=document.querySelector('#hours');
let min_inp=document.querySelector('#minutes');


let alert_cont=document.querySelector('.alarm-alert');







function checkUserInput(){
    let hr_value=hr_inp.value;
    let min_value=min_inp.value;

  

    if(hr_value > 24 ){
        alertDisplay('Hours cannot exceed 24hrs','danger');
       return false;
    }
    if(hr_value.trim() === ""){
        alertDisplay('Hours can\'t be blank','danger');
        return false
    }
    if(hr_value < 0){
        alertDisplay('Hours can\'t be less than zero','danger');
        return false
    }




    if(min_value > 60 ){
        alertDisplay('Minutes can\'t exceed 60mins','danger');
        return false;
     }
     if(min_value.trim() === ""){
        alertDisplay('Minutes can\'t be blank','danger');
        return false
    }
    if(hr_value < 0){
        alertDisplay('Minutes input can\'t be less than zero','danger');
        return false
    }

     return true
}


function inputValidity(){
    if(!checkUserInput()){
        alertDisplay('Ensure you have correct Entries');
        return false
    }
    
    alertDisplay('Successfully set','success');
    return true
}


function alertDisplay(message,action){
    alert_cont.innerHTML=message;
    alert_cont.classList.add(`alert-${action}`);

    let alert_time=setTimeout(()=>{
        alert_cont.innerHTML="";
        alert_cont.classList.remove(`alert-${action}`);
    },1000)
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    let i=0;
    let int=setInterval(()=>{
        settingAlarm();
        i++;
        if(i>120){
            clearInterval(int);
        }
    },1000)
    
})



let alarmCond=false;

function settingAlarm(){

    let alarm_cont=document.querySelector('.alarm-cont');
   let ringtone=document.querySelector('.ringtone');
   let stopBtn=document.querySelector('.stop');
   let snoozeBtn=document.querySelector('.snooze');
 
   
    let value1=hr_inp.value;
    let value2=min_inp.value;



    if(!checkUserInput()){
        return false;
    }


    let c_day=new Date();
    let curr_time=c_day.getTime();

    let oneday= 24 * 60 * 60 * 1000;
    let onehour= 60 * 60 * 1000;
    let oneminute= 60 * 1000;

    let cday=Math.floor((curr_time / oneday ));
    let chour=Math.floor((curr_time % oneday) / onehour);
    chour += 3;
    let cminute=Math.floor((curr_time % onehour) / oneminute);


    let alarm_fut=((value1 * 60 * 60 * 1000) + (value2 * 60 * 1000));
    let alarm_curr=((chour * 60 * 60 * 1000) + (cminute * 60 * 1000));

    let alarm_time=((alarm_fut - alarm_curr));

  
    if(alarm_time < 60000 && !alarmCond){ 
        ringtone.play();
        alarm_cont.classList.add('show-alar');

    }

    snoozeBtn.addEventListener('click',()=>{
        alarmCond=true;
        alarm_cont.classList.add('active');
        alarm_cont.classList.remove('show-alar');
        ringtone.pause();

        setTimeout(()=>{
        alarmCond=false;
        alarm_cont.classList.remove('active');
        alarm_cont.classList.add('show-alar');
        ringtone.play();
        },5000)

    })

    stopBtn.addEventListener('click',()=>{
         alarmCond=true;
        alarm_cont.classList.add('active');
        alarm_cont.classList.remove('show-alar');
        ringtone.pause();
    })


    
   

    function set_back_to_defaults(){
        if(value1.length < 2){
            hr_inp.innerHTML=`0${value1}`
        }else if(value2.length < 2){
            min_inp.innerHTML=`0${value2}`;
        }else{
            hr_inp.innerHTML=`${value1}`;
            min_inp.innerHTML=`${value2}`;
        }
    }
    

    set_back_to_defaults();



    return true;
   
}