import {
  BadgeDollarSign,
  BrushCleaning,
  Cog,
  Forklift,
  ShoppingCart,
  UserRoundCog,
  Users,
  Wrench,
} from 'lucide-react';

import { ServiceItem } from '@/entities/text';

const serviceList = [
  {
    text: 'Ремонт и обслуживание поломоечных машин',
    description: 'Любые торговые марки',
    icon: Wrench,
  },
  {
    text: 'Ремонт и обслуживание промышленных и профессиональных пылесосов',
    description: 'Любые торговые марки',
    icon: UserRoundCog,
  },
  {
    text: 'Услуги аренды уборочной техники',
    description: 'Поломоечные машины, пылесосы, парогенераторы',
    icon: Forklift,
  },
  {
    text: 'Подбор и продажа запчастей и комплектующих',
    description: 'Добавить сюда торговые марки или описание',
    icon: Cog,
  },
  {
    text: 'Продажа профессиональной химии и инвентаря',
    description: 'Добавить сюда торговые марки или описание',
    icon: ShoppingCart,
  },

  {
    text: 'Продажа техники для клининга',
    description: 'Добавить сюда торговые марки или описание',
    icon: BadgeDollarSign,
  },
  {
    text: 'Профессиональная уборка',
    description:
      'Торговые центры, складские площадки, гостиницы, офисы, производственные площадки',
    icon: BrushCleaning,
  },
  {
    text: 'Свои выездные бригады',
    description: 'Добавить сюда описание',
    icon: Users,
  },
];

const ServicesPage = () => {
  return (
    <div className="flex flex-col gap-9">
      <h2 className="mb-2">Услуги</h2>

      <div className="flex flex-wrap gap-12 justify-center">
        {serviceList.map((el) => (
          <ServiceItem key={el.text} item={el} />
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
