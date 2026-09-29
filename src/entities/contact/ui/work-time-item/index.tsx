import { CalendarDays, Clock7 } from 'lucide-react';

export const WorkTimeItem = () => (
  <>
    <div className="flex items-center gap-2">
      <Clock7 />
      <h6>09:00 - 19:00</h6>
    </div>

    <div className="flex items-center gap-2">
      <CalendarDays />
      <h6>Пн - Вс</h6>
    </div>
  </>
);
