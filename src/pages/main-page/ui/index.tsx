import { PageWrapper } from '@/entities/page';

const MainPage = () => (
  <PageWrapper>
    <h1>Главная страница БэП Ремонт</h1>
    <div className="md:bg-red-500 xl:bg-blue-500 p-4 text-white text-2xl">
      Если я красный/синий — Tailwind работает!
    </div>
  </PageWrapper>
);

export default MainPage;
