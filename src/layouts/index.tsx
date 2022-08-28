import { IRouteComponentProps, Redirect } from 'umi';

export default function Layout({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) {
  if (location.pathname === '/') {
    return <Redirect to="/login"></Redirect>;
  }
  return children;
}
