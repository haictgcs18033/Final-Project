import { BrowserRouter, Switch } from 'react-router-dom';
import '../src/sass/Primary.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AdminLoginRoute, AdminRoute, CustomerRoute } from './routes/route';
import { AdminTemplate } from './templates/AdminTemplate';
import { CustomerTemplate } from './templates/CustomerTemplate';
import 'antd/dist/antd.dark.css';
import ScrollToTop from './routes/ScrollToTop';
import { AdminLoginTemplate } from './templates/AdminLoginTemplate';

function App() {
  const customerRoute = (route) => {
    return route.map((route, index) => {
      return <CustomerTemplate key={index} path={route.path} exact={route.exact}
        Component={route.component}></CustomerTemplate>
    })
  }
  const adminLoginRoute = (route) => {
    return route.map((route, index) => {
      return <AdminLoginTemplate key={index} path={route.path} exact={route.exact}
        Component={route.component}></AdminLoginTemplate>
    })
  }
  const adminRoute = (route) => {
    return route.map((route, index) => {
      return <AdminTemplate key={index} path={route.path} exact={route.exact}
        Component={route.component}></AdminTemplate>
    })
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        {adminLoginRoute(AdminLoginRoute)}
        {adminRoute(AdminRoute)}
        {customerRoute(CustomerRoute)}

      </Switch>
    </BrowserRouter>
  );
}

export default App;
