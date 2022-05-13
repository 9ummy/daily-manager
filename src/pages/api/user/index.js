import bcrypt from 'bcrypt';
import User from 'models/User';
import 'utils/dbConnect';

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const user = await User.findOne(req.body);

        return res.status(200).json({
          success: true,
          data: user,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case 'POST':
      try {
        const user = await User.create({
          ...req.body,
          pw: bcrypt.hashSync(req.body.pw, 10),
        });

        return res.status(201).json({
          // 201 created
          success: true,
          data: user,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          message: '가입이 실패했습니다.',
        });
      }
    default:
      res.setHeaders('Allow', ['GET', 'POST']);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
};
