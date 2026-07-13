import { Link } from 'react-router-dom';

import { mainPageImport } from '@/entities/page';

import logo from '@/shared/assets/logoCompressed.png';
import { ROUTES } from '@/shared/config';

export const LinkLogo = () => (
  <Link to={ROUTES.MAIN} onMouseEnter={mainPageImport}>
    <div className="flex gap-1 items-center">
      <img src={logo} alt="company logo" />
      <h1>БэП Ремонт</h1>
    </div>
  </Link>
);
