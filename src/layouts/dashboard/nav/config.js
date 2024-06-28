// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/app/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Manufacturer',
    path: '/app/manufacturer',
    icon: icon('ic_reports'),
  },
  {
    title: 'Supplier',
    path: '/app/supplier',
    icon: icon('ic_reports'),
  },
  {
    title: 'Users',
    path: '/app/user',
    icon: icon('ic_user'),
  }
];

export default navConfig;
