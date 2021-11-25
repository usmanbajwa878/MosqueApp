import {BASE_URL} from "../../constants/AppConstants";

export const getUrl = (type) => {
  let url = "";

  switch (type) {
    case "GetMosqueByKey":
      return (url = `${BASE_URL}/mosque/getanySpecificmosque`);
    case "signup":
      return (url = `${BASE_URL}/user/signup`);
    case "fileUpload":
      return (url = `${BASE_URL}/upload/fileUpload`);
    case "forgetPassword":
      return (url = `${BASE_URL}/user/changePassword`);
    case "createElephant":
      return (url = `${BASE_URL}/elephant/newElephant`);
    case "getElephant":
      return (url = `${BASE_URL}/elephant/getElephant`);
    case "getAllElephant":
      return (url = `${BASE_URL}/elephant/getAllElephant`);
    case "getSpecfic":
      return (url = `${BASE_URL}/elephant/getSpecificElephant`);
    
    case "completeTrip":
      return (url = `${BASE_URL}/trip/completeTrip`);
    case "addCard":
      return (url = `${BASE_URL}/card/registerPaymentCard`);
    case "getCard":
      return (url = `${BASE_URL}/card/getPaymentCard`);
    case "deletePaymetCard":
      return (url = `${BASE_URL}/card/deletePaymentCard`);
    case "makeTransaction":
      return (url = `${BASE_URL}/Transaction/makeTransaction`);
    case "getTransaction":
      return (url = `${BASE_URL}/Transaction/getTransaction`);
    default:
      break;
  }
};