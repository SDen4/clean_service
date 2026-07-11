import { Link } from 'react-router-dom';

import logo from '../../assets/logoCompressed.png';

export const LinkLogo = () => (
  <Link to="/">
    <div className="flex gap-1 items-center">
      <img src={logo} alt="company logo" />
      <h1>БЭП Ремонт</h1>
    </div>
  </Link>
);
