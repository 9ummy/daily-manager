import User from 'models/User';
import 'utils/dbConnect';
import axios, { Axios } from 'axios';

export default async (req, res) => {
  const { method } = req;
  const bcrypt = require('bcrypt');

  if (method === 'POST') {
    try {
      const query = {
        id: req.body.id,
      };
      const user = await User.findOne(query);

      if (user && bcrypt.compareSync(req.body.pw, user.pw)) {
        axios.get("https://dev.aistudios.com/api/odin/generateClientToken?appId=aistudios.com&userKey=6443234b-77d5-4013-bfd6-bb9399f317d9")
          .then((response) => {
            return res.status(200).json({
              success: true,
              data: {
                token : response.data.token,
                ...user
              },
            });
          })
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

}