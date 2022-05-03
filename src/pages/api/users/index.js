import User from "models/User";
import "utils/dbConnect";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET' :
      try {
        return res.status(200).json({
          success: true,
          data: user,
        });

      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case 'POST' :
      try {
        const user = await User.create(req.body);
        return res.status(201).json({
          success: true,
          data: user,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    default:
      res.setHeaders('Allow', ['GET', 'POST']);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
}
