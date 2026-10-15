import { contactUsPageImport } from '@/entities/page';

import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/ui';

export const PriceInfoText = () => (
  <small>
    Информация о товарах и ценах, размещённая на сайте, носит справочный
    характер и не является публичной офертой (ст. 437 ГК РФ). Сайт является
    информационной витриной. Указанные цены не являются окончательными; наличие
    товара, актуальная стоимость и условия приобретения уточняются при обращении
    по{' '}
    <Link
      to={`/${ROUTES.CONTACTS}`}
      onMouseEnter={contactUsPageImport}
      className="text-blue-500 underline"
    >
      телефону
    </Link>
    ,{' '}
    <Link
      to={`/${ROUTES.CONTACTS}`}
      onMouseEnter={contactUsPageImport}
      className="text-blue-500 underline"
    >
      электронной почте
    </Link>{' '}
    или через{' '}
    <Link
      to={`/${ROUTES.CONTACT_US}`}
      onMouseEnter={contactUsPageImport}
      className="text-blue-500 underline"
    >
      форму обратной связи
    </Link>
  </small>
);
