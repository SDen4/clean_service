import { Loader } from 'lucide-react';

export const Fallback = () => (
  <div className="flex flex-col items-center w-full gap-10 min-h-[50vh]">
    <Loader className="animate-spin w-10 h-10" />
    <h4>Загрузка...</h4>
  </div>
);
