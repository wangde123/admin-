import styles from './nav.less';
import { useState, useEffect, useMemo } from 'react';
import { useWt } from '../untils/useWt';
// import useTime from '../untils/useTime';
import { useSelector } from 'umi';

const Index = () => {
  const [wtNm, wtTemp] = useWt();
  const [sjc, setSjc] = useState<string | number>(0);
  const timer = useMemo(() => {
    const date = new Date(sjc);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const mm = date.getMinutes();
    const s = date.getSeconds();
    return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
  }, [sjc]);
  useEffect(() => {
    setSjc(new Date().getTime());
    const time = setInterval(() => {
      setSjc(new Date().getTime());
    }, 1000);
    return () => {
      clearInterval(time);
    };
  }, []);

  const title = useSelector((state: any) => state.admin.title);
  // console.log(title);
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.left}>{title}</div>
        <div>
          <span>{wtNm}</span>-{wtTemp}度-{timer}
        </div>
      </nav>
    </>
  );
};
export default Index;
