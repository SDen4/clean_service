import { PageWrapper } from '@/entities/page';

export const MainPage = () => (
  <PageWrapper>
    <h2>Главная страница</h2>
    <div className="md:bg-red-500 xl:bg-blue-500 p-4 text-white text-2xl">
      Если я красный/синий — Tailwind работает!
    </div>
  </PageWrapper>
);
