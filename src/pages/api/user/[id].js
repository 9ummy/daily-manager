import User from 'models/User';
import "utils/dbConnect";

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  const bcrypt = require('bcrypt');

  switch (method) {
    case 'GET' :
      try {
        const user = await User.findOne({
          id : id
        });
        if(user){
          return res.status(200).json({
            success: true,
            data: user,
          });
        } else {
          return res.status(204).json({ // 204 no data
            success: true,
            data : null
          });
        }
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case 'PUT' :
      try {
        let setData = req.body;
        if(setData.pw){
          setData.pw = bcrypt.hashSync(setData.pw, 10);
        }

        await User.update({id : id}, {
          $set: setData
        });

        return res.status(200).json({
          success: true
        });

      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case 'DELETE' :
      try {
        await User.deleteOne({ _id: id });
        return res.status(200).json({
          success: true,
          data: { id },
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    default:
      res.setHeaders('Allow', ['GET', 'PUT', 'DELETE']);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);

  }


}