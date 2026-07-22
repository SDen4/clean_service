import { mainPageImport } from '@/entities/page';

import logo from '@/shared/assets/logoCompressed.png';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/ui';

export const LinkLogo = () => (
  <Link to={ROUTES.MAIN} onMouseEnter={mainPageImport}>
    <div className="flex gap-1 items-center">
      <img src={logo} className="w-24" alt="company logo" />
      <h1>БэП Ремонт</h1>
    </div>
  </Link>
);
