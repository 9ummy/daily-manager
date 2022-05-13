import axios from 'axios';

export default async (req, res) => {
  const { method } = req;
  if (method === 'POST') {
    try {
      axios
        .post('https://dev.aistudios.com/api/odin/makeVideo', {
          appId: 'aistudios.com',
          platform: 'web',
          isClientToken: true,
          token: req.body.token,
          uuid: process.env.DEV_UUID,
          sdk_v: '1.0',
          clientHostname: 'aistudios.com',
          text: req.body.text,
          ...req.body.model,
        })
        .then((response) => {
          return res.status(200).json({
            success: true,
            videoKey: response.data.data.key,
          });
        });
    } catch (error) {
      return res.status(400).json({
        success: false,
      });
    }
  } else {
    return res
      .status(405)
      .json({ success: false })
      .end(`Method ${method} Not Allowed`);
  }
};
