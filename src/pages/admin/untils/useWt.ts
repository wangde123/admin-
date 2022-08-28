import { useState, useEffect } from 'react';
import request from 'umi-request';
export const useWt = () => {
    const [wtNm, setwtNm] = useState<string>('');
    const [wtTemp, setwtTemp] = useState<string>('');

    useEffect(() => {
        request
            .get(
                'http://api.k780.com/?app=weather.realtime&weaId=94&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json',
            )
            .then((res) => {
                // setwtNm(res.result.realTime.wtNm),
                //     setwtTemp(res.result.realTime.wtTemp);
            });
    }, []);

    return [wtNm, wtTemp]

}