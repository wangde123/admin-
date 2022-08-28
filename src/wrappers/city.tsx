import { Redirect } from 'umi';
import { IRouteComponentProps, useSelector } from 'umi';

export default (props: IRouteComponentProps) => {
  const city = useSelector((state: any) => state.admin.auth);
  console.log(city);

  const auth = JSON.parse(localStorage.getItem('auth') || '[]');

  if (auth.includes(city)) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};
