import { getUrl } from './Urls';
import { generateResponse } from './responseGenerator';
import { dataURItoBlob } from '../../utilities/multipart';

 const createNetworkRequest = async (method, type, data) => {
    console.log("TYPE",method,type,data)
    console.log(getUrl(type))
    try {
        const response = await fetch(getUrl(type), {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log("response",response);
    
        const parsedResponse = await response.json();
        console.log("response",parsedResponse);
        const responseData = await generateResponse(parsedResponse);
        console.log("responseData",responseData)
        return responseData;
    } catch (error) {
            console.log("ERROR IN UTULITY",error)
    }
   
}
const createNetworkGetRequest = async (method, type, data) => {
    console.log("TYPE",method,type,data)
    const response = await fetch(getUrl(type), {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
    });
   

    const parsedResponse = await response.json();
    console.log("response",parsedResponse);
    const responseData = await generateResponse(parsedResponse);
    console.log("responseData",responseData)
    return responseData;
}

const createFormData = async (photo) => {
    console.log("inside form Data", photo)
    const formData = new FormData();
    // const modifiedData = Platform.OS === "android" ? photo.fileName : photo.fileName;
    formData.append("image",{uri:photo.uri,name:photo.fileName,type:'image/jpeg'})
  
    return formData;
};
// const formData = new FormData()
// console.log(profileUrl)
// formData.append("file", { uri: profileUrl, name: 'image.jpg', type: 'image/jpeg' })
// console.log(profileUrl)
// return async dispatch => {
//     const response = await fetch(`${VARIABLES.serverUrl}/storage`,
//         {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//             body: formData
//         }
//     );
const createFileUploadNetworkRequest = async (method, type, data) => {
    const image = await createFormData(data)
    const response = await fetch(getUrl(type), {
        method: method,
        headers: {
             'Content-Type': 'multipart/form-data',
        },
        body: image
})
const parsedResponse = await response.json();
const responseData = await generateResponse(parsedResponse);
return responseData;
}

export default  {
    createFileUploadNetworkRequest,
    createNetworkGetRequest,
    createFormData,
    createNetworkRequest

}