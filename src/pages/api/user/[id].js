import bcrypt from 'bcrypt';
import User from 'models/User';
import 'utils/dbConnect';

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const user = await User.findOne({
          id: id,
        });
        if (user) {
          return res.status(200).json({
            success: true,
            data: user,
          });
        } else {
          return res.status(204).json({
            // 204 no data
            success: true,
            data: null,
          });
        }
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case 'PUT':
      try {
        const setData = req.body;
        if (setData.pw) {
          setData.pw = bcrypt.hashSync(setData.pw, 10);
        }

        await User.updateOne(
          { id: id },
          {
            $set: setData,
          },
        );

        return res.status(200).json({
          success: true,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case 'DELETE':
      try {
        const query = {
          id: id,
        };
        const user = await User.findOne(query);
        if(bcrypt.compareSync(req.body.pw, user.pw) == false){
          return res.status(204).json({
            success: false
          });
        } else {
          await User.deleteOne({ id: id });
          return res.status(200).json({
            success: true
          });
        }
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    default:
      return res.status(405).json({ success: false }).end(`Not Allowed`);
  }
};
