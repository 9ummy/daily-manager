import Schedule from 'models/Schedule';
import 'utils/dbConnect';

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const schedules = await Schedule.find().sort({ time: 'asc' });
        return res.status(200).json({
          success: true,
          data: schedules,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case 'POST':
      try {
        const schedule = await Schedule.create(req.body);
        return res.status(201).json({
          success: true,
          data: schedule,
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
};
