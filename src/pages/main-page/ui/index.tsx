import { PageWrapper } from '@/entities/page';

export const MainPage = () => (
  <PageWrapper>
    <h2>Главная страница</h2>
    <div className="bg-red-500 p-4 text-white text-2xl">
      Если я красный — Tailwind работает!
    </div>
  </PageWrapper>
);
