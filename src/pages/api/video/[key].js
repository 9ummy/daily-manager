import axios from 'axios';

export default async (req, res) => {
  const {
    query : { key },
    method,
  } = req;

  if(method === 'POST'){
    try {
      axios.post(`https://dev.aistudios.com/api/odin/findProject`,
        {
          "appId":"aistudios.com",
          "platform":"web",
          "isClientToken":true,
          "token": req.body.token, // 변경의 여지가 큼
          "uuid": process.env.DEV_UUID,
          "sdk_v":"1.0",
          "clientHostname":"aistudios.com",
          "key": key
        })
        .then((response) => {
          return res.status(200).json({
            success : true,
            videoSrc : response.data.data.video
          })
        })
    } catch (error){
      console.log(error);
      return res.status(400).json({
        success : false,
      })
    }
  }

}