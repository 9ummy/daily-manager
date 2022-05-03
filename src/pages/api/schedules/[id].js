import Schedule from 'models/Schedule';
import 'utils/dbConnect';

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const schedule = await Schedule.findById(id);
        return res.status(200).json({
          success: true,
          data: schedule,
        });
      } catch (error) {
        return res.status(404).json({
          success: false,
        });
      }
    case 'PUT':
      try {
        const schedule = await Schedule.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        return res.status(200).json({
          success: true,
          data: schedule,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case 'DELETE':
      try {
        await Schedule.deleteOne({ _id: id });
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
};
