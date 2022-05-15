import axios from 'axios';
import bcrypt from 'bcrypt';
import User from 'models/User';
import 'utils/dbConnect';

export default async (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    try {
      const query = {
        id: req.body.id,
      };
      const user = await User.findOne(query);

      if (user && bcrypt.compareSync(req.body.pw, user.pw)) {
        axios
          .get(
            `https://dev.aistudios.com/api/odin/generateClientToken?appId=aistudios.com&userKey=${process.env.DEV_UUID}`,
          )
          .then((getResponse) => {
            const postReq = {
              appId: 'aistudios.com',
              platform: 'web',
              isClientToken: true,
              token: getResponse.data.token,
              uuid: process.env.DEV_UUID,
              sdk_v: '1.0',
              clientHostname: 'aistudios.com',
            };
            axios
              .post('https://dev.aistudios.com/api/odin/generateToken', postReq)
              .then((postResponse) => {
                return res.status(200).json({
                  success: true,
                  data: {
                    uuid: process.env.DEV_UUID,
                    token: postResponse.data.token,
                    tokenExpire: postResponse.data.tokenExpire,
                    ...user,
                  },
                });
              });
          });
      } else {
        return res.status(401).json({
          success: false,
          message: 'loginFailed',
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'errorcatched',
      });
    }
  } else {
    return res
      .status(405)
      .json({ success: false })
      .end(`Method ${method} Not Allowed`);
  }
};
