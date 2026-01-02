import cron from 'node-cron';
import ReservationModel from '../../schema/Reservation.Model';
import { buildReservationDateTime } from '../utils/helper';


export function startReservationCron(){
    cron.schedule('* * * * *', async () => {
        try {
            const now = new Date();
            const reservation = await ReservationModel.find()

             for (const r of reservation) {
            const reservationDateTime = buildReservationDateTime(
                r.reservationDate,
                r.reservationTime
            );

        if (reservationDateTime <= now) {
          await ReservationModel.deleteOne({ _id: r._id });
          console.log(`🗑 Reservation expired: ${r._id}`);
        }
    }
        } catch (err) {
              console.error('CRON ERROR:', err);
        }
}) 
}
