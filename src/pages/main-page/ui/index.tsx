import { PageWrapper } from '@/entities/page';

import bannerMain from '@/shared/assets/bannerMain3.jpg';
import texture from '@/shared/assets/texture.png';

const fontStyles =
  'text-[9vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw] xl:text-[4vw] text-sky-900';

const testStyles = `absolute ${fontStyles} max-w-[70%]`;

const thesisText =
  'text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] xl:text-[3vw] text-sky-900 dark:text-blue-100 text-center p-10 leading-none';

const Divider = () => <div className="h-[1px] w-full bg-sky-500" />;

const MainPage = () => (
  <PageWrapper>
    <div
      style={{ backgroundImage: `url(${bannerMain})` }}
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[75vh] overflow-hidden bg-cover bg-center bg-no-repeat dark:opacity-50 bg-sky-200"
    >
      <div
        style={{ backgroundImage: `url(${texture})` }}
        className="absolute top-0 bottom-0 left-0 right-0"
      />
      <h1 className={`${testStyles} right-10 top-10 text-right`}>
        Сервисное обслуживание поломоечной техники
      </h1>
      <h1 className={`${testStyles} left-10 bottom-10`}>Запчасти и ремонт</h1>
    </div>

    <h2 className={thesisText}>
      Мы понимаем, что ремонт клининговой техники — это вопрос доверия и
      быстрого возврата оборудования в строй
    </h2>

    <Divider />

    <h2 className={thesisText}>
      Мы — команда инженеров в Екатеринбурге, которая построила сервис без
      скрытых наценок
    </h2>

    <Divider />

    <h2 className={thesisText}>
      У нас нет раздутого штата и расходов на дорогие офисы, поэтому стоимость
      ремонта честно ниже на 20–30%, чем в крупных сервисных центрах. Вы платите
      только за реальную работу и качественные запчасти
    </h2>

    <Divider />

    <h2 className={thesisText}>
      Мы обслуживаем поломоечные машины, парогенераторы, промышленные и
      профессиональные пылесосы любых марок
    </h2>
  </PageWrapper>
);

export default MainPage;
