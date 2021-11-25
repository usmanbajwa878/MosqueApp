import { facilityData } from "../Data/facilitiesData";
import {Linking,Platform,Alert} from 'react-native';
import Share from 'react-native-share';
import moment from 'moment';
import { LanguageData } from "../Data/languageData";

export const getIcon = (text) =>{
   const data = facilityData.filter((item)=>item.name.toLowerCase().replace(/\s/g, '') === text.toLowerCase().replace(/\s/g, ''))
    return data[0].image
}

export const getActiveLanguageIcon = (lng) =>{
  const data = LanguageData.filter((item)=>item.title.toLowerCase() === lng.toLowerCase());
  return data[0].image
}


export const callNumber = phone => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    }
    else  {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
  };


export const shareHandler = (item) =>{
    const ShareOptions = {
        title:'Share Mosque Details',
        failOnCancel:false,
        message:`
        ${item.name}
        ${item.phoneNumber}
        ${item.location}
        ${item.city}
        ${item.country}
        ${item.timings.map((prayer) =>`\t${prayer.name} ${prayer.time}\n`)}
        `
    };
    Share.open(ShareOptions).then((res)=>console.log(res)).catch((err)=>console.log(err))

}

// export const getTimeDifference = serverTime => {
//  const isAm = serverTime.split(' ')[1] === 'am' ? true : false
//  console.log("FOR ",serverTime)
//     let newTime = serverTime.split(':')[0];
//     newTime = newTime.split('0')[1]
//     console.log("NEW TIME",newTime)
//     let today = new Date();
//     let totalTimeLeft = 0;
//     const currentTimeSpan = today.toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ')[1];
//     console.log("CURRENT TME SPAN",currentTimeSpan)
//    console.log("FOR ",newTime)
//     if(currentTimeSpan === 'AM'){
//         let h = today.getHours();
//         const hourDifference = 12 - h;
//         if(isAm){
//             console.log("INSIDE FIRST")
//             totalTimeLeft = hourDifference + parseInt(newTime) + 12;
//         }else{
//             console.log("INSIDE SECOND")
//             totalTimeLeft = hourDifference + parseInt(newTime)
//         }
        
//     }else {

//         let h = today.getHours();

//        h =  today.toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ')[0];
//        console.log("current",h)
//        const hourDifference = 12 - h;
//         console.log("HOUR DIFF",hourDifference)
//         if(isAm){
           
//             totalTimeLeft = hourDifference + parseInt(newTime)
//             console.log("INSIDE THIRD",totalTimeLeft,hourDifference,newTime)
//         }else{
            
//             totalTimeLeft = hourDifference + parseInt(newTime) + 12
       
//         }
//     }  
//     return totalTimeLeft;
//   };

export const getTimeDifference = (severTime) =>{

  let prayerHour24Format = convertFrom12To24Format(severTime).split(':')[0];
  let currentHours = new Date().getHours();//current Time in 24 hour format
  let Hourdiff = 0;
    if(parseInt(currentHours) >= parseInt(prayerHour24Format) ){ //17 22
      Hourdiff = (24 - parseInt(currentHours)) + parseInt(prayerHour24Format)
    }else {
      Hourdiff = parseInt(prayerHour24Format) - parseInt(currentHours)
    }
    return Hourdiff
}
  
  
  export const getDistance = (lat1,lng1,lat2,lng2) =>{
   const distance = geolib.getDistance({latitude:lat1,longitude:lng1},{latitude:lat2,longitude:lng2});
   return geolib.convertDistance(distance, 'km'); 
  }

  export const getMapOptions = (lat,lng,title) =>{
    const options = {
        latitude: lat,
        longitude:lng,
        title:title,
        dialogTitle: title,
        dialogMessage: 'Select one of Options to Locate ',
        cancelText: 'Cancel',
      };
      return options;
      

  }

  export const  getHijri =(randomDate, lang) => {
    let date = randomDate || new Date();
    lang = lang || 'en';
    let options = {
      year: 'numeric', month: 'long', day: 'numeric'
    };
    return date.toLocaleString(lang + '-u-ca-islamic', options);
  }
  export const getDayAndDate = () =>{
    let date = new Date();
    let options = {
      year: 'numeric', month: 'long', day: 'numeric',
      weekday:'short'
    };
    return date.toLocaleString("en-US", options);

  }

  // export const getCurrentPrayer = (timings) =>{
  //   let differenceTimeArray = [];
  //   let differenceArray = []
  //   console.log("timing",timings)
  //   timings.map((item,index)=>{
  //     if(index < 5){
  //       differenceTimeArray.push({diff:getTimeDifferencePrayer(item.time),name:item.name})
  //     }
  //   });
  //   const sortedArray = differenceTimeArray.sort((a,b)=>a.diff-b.diff);
  //   console.log("sorted",sortedArray)
  //   const currentPrayer = sortedArray[0];
  //   return currentPrayer;

  // }


  export const getCurrentPrayer = (timings,inLoopPrayer) =>{
    let differenceTimeArray = [];
    let differenceArray = []
    let currentPrayer;
    console.log("timing",timings)
    timings.map((item,index)=>{
      if(index < 5){
        differenceTimeArray.push({diff:{hourDiff:getTimeDifferencePrayer(item.time).Hourdiff,minuteDiff:getTimeDifferencePrayer(item.time).minuteDiff},name:item.name})
      }
    });
    const sortedArray = differenceTimeArray.sort((a,b)=>a.diff.hourDiff-b.diff.hourDiff);
    console.log("sorted",sortedArray);
    if(inLoopPrayer &&  inLoopPrayer?.name === sortedArray[0].name){
      currentPrayer = sortedArray[1]
    }else {
       currentPrayer = sortedArray[0];
    }

    return currentPrayer;

  }



  export const convertFrom24To12Format = (time24) => {
    const number = moment(time24, ["HH:mm a"]).format("hh:mm a");
    console.log("time conversion from 24 to 12 from ",time24,number)
    return number;
  }
  export const convertFrom12To24Format = (time12) => {
    const number = moment(time12, ["hh:mm a"]).format("HH:mm");
    console.log("time conversion from 12 to 24 from ",time12,number)
    return number;
  }
    


export const getTimeDifferencePrayer = prayerTime =>{
  let prayerHour24Format = convertFrom12To24Format(prayerTime).split(':')[0];
  let prayerMinute24Format = parseInt(convertFrom12To24Format(prayerTime).split(':')[1]);

  let currentHours = new Date().getHours();//current Time in 24 hour format
  let currentMinutes = parseInt( new Date().getMinutes());
  let Hourdiff = 0;
  let minuteDiff = 0;
    if(parseInt(currentHours) >= parseInt(prayerHour24Format) ){ //17 22
      Hourdiff = (24 - parseInt(currentHours)) + parseInt(prayerHour24Format)
    }else {
      Hourdiff = parseInt(prayerHour24Format) - parseInt(currentHours)
    }
if(currentMinutes > prayerMinute24Format){ //60 30
  minuteDiff = (60-prayerMinute24Format) - currentMinutes
}else { //40 20
minuteDiff = (60-currentMinutes) + prayerMinute24Format
}
 
    console.log("Hourdiff minuteDiff",Hourdiff,minuteDiff);
    return {Hourdiff,minuteDiff};
}