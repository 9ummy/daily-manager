import User from 'models/User';
import "utils/dbConnect";

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET' :
      try {
        const user = await User.findById(id);

        return res.status(200).json({
          success: true,
          data: user,
        });
      } catch (error) {
        return res.status(404).json({
          success: false,
        });
      }
    case 'PUT' :
      try {
        const user = await User.findByIdAndDelete(id, req.body, {
          new: true,
          nunValidators: true,
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