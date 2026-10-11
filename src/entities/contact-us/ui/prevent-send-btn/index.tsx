import { useEffect, useMemo, useState } from 'react';
import { Timer } from 'lucide-react';

import { setLocalStorage } from '@/shared/lib';
import { Button } from '@/shared/ui';

import { emptyLocalstorageData, storageKey } from '../../model/constants';

const duration = 10; // sec
const interval = 1000; // ms
const oneSec = 1000; // ms

export const PreventSendBtn = () => {
  const stop = useMemo(() => {
    const start = Number(localStorage.getItem(storageKey) ?? 0);
    return start + duration * oneSec;
  }, []);

  const [sec, setSec] = useState(() =>
    Math.max(0, Math.ceil((stop - Date.now()) / oneSec)),
  );

  useEffect(() => {
    const id = setInterval(() => {
      const remaining = stop - Date.now();

      if (remaining <= 0) {
        clearInterval(id);
        setLocalStorage(storageKey, emptyLocalstorageData); // родитель отреагирует и размонтирует
        return;
      }
      setSec(Math.ceil(remaining / oneSec));
    }, interval);

    return () => clearInterval(id);
  }, [stop]);

  return (
    <Button disabled className="flex items-center w-[118px]">
      <div className="flex justify-between w-9">
        <Timer className="stroke-white" />
        {sec}
      </div>
    </Button>
  );
};
