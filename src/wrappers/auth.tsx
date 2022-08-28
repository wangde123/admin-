import { Redirect } from 'umi';
import { IRouteComponentProps } from 'umi';

export default (props: IRouteComponentProps) => {
  const token = localStorage.getItem('token');

  if (token) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};
