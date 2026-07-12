import { Link } from 'react-router-dom';

import { mainPageImport } from '@/entities/page';

import { ROUTES } from '@/shared/config';

import logo from '../../assets/logoCompressed.png';

export const LinkLogo = () => (
  <Link to={ROUTES.MAIN} onMouseEnter={mainPageImport}>
    <div className="flex gap-1 items-center">
      <img src={logo} alt="company logo" />
      <h1>БэП Ремонт</h1>
    </div>
  </Link>
);
