import { useState, useEffect, useMemo } from "react";

const useTime = () => {
    const [sjc, setSjc] = useState(0);
    useEffect(() => {
        setSjc(new Date().getTime());
        const timer = setInterval(() => {
            setSjc(new Date().getTime());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    const time = useMemo(() => {
        const date = new Date(sjc);
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        const h = date.getHours();
        const mm = date.getMinutes();
        const s = date.getSeconds();
        return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
    }, [sjc]);

    return time;
};

export default useTime;