import {
  BadgeDollarSign,
  BadgePercent,
  BrushCleaning,
  Cog,
  HandPlatter,
  Users,
  Wrench,
} from 'lucide-react';

import { ServiceItem } from '@/entities/text';

const serviceList = [
  {
    text: 'Ремонт и обслуживание поломоечных машин, промышленных и профессиональных пылесосов любых марок',
    icon: Wrench,
  },
  { text: 'Продажа профессиональной химии и инвентаря', icon: BadgePercent },
  { text: 'Продажа техники для клининга', icon: BadgeDollarSign },
  {
    text: 'Услуги аренды уборочной техники (поломоечные машины, пылесосы, парогенераторы)',
    icon: HandPlatter,
  },
  {
    text: 'Профессиональная уборка: Торговые центры + Складские площадки + Гостиницы + Офисы + Производственные площадки',
    icon: BrushCleaning,
  },
  { text: 'Свои выездные бригады', icon: Users },
  { text: 'Подбор и продажа запчастей и комплектующих', icon: Cog },
];

const ServicesPage = () => {
  return (
    <div className="flex flex-col gap-9">
      <h2 className="mb-2">Услуги</h2>

      {serviceList.map((el) => (
        <ServiceItem key={el.text} item={el} />
      ))}
    </div>
  );
};

export default ServicesPage;
