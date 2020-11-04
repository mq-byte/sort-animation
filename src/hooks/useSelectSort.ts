import {useCallback, useMemo, useRef, useState} from "react";

export const useSelectSort = (arr: number[])=>{
    const isStop = useRef(true);
    const isEnd = useRef(true);
    const [data,setData] = useState({
        index: 1,
        lock: 0,
        data: [...arr],
        exchange: false
    });

    const _next = useMemo(()=>{
        let isStart = false;
        const setIsStart = (v:boolean)=>{isStart = v};
        const n = (call:any)=>{
            setIsStart(false);
            call();
        }
        return (onEnd:(x:any,y:any)=>void)=>{
            console.log(isStop.current,'-----------------');
            if(isStart || isStop.current) return;
            setIsStart(true);
            setTimeout(()=>{
                if(data.data[data.lock] > data.data[data.index]){
                    console.log('交换');
                    isEnd.current = false;
                    //开始数据交换
                    let t = data.data[data.lock];
                    data.data[data.lock] = data.data[data.index];
                    data.data[data.index] = t;
                    data.exchange = true;
                    setData({...data});
                    //交换结束，停止排序，等待回调结束
                }else {
                    console.log('前进');
                    //不交换，向前移动
                    data.exchange = false;
                    data.index++;
                    if(data.index === arr.length){
                        data.lock++;
                        if(data.lock === arr.length - 1){
                            isStop.current = true;
                            data.lock++;

                        }else {
                            data.index = data.lock + 1;
                        }

                    }
                    setData({...data});
                }

                onEnd(n, {...data});
            },300)
        }
    },[])

    const next = useCallback((onEnd:(x:any,y:any)=>void)=>{
        console.log('Bubble next',isStop.current)
        _next(onEnd)
    },[_next])

    const setStop = useCallback((v:boolean)=>{
        console.log('Bubble setStop',isStop.current)
        isStop.current = v;
    },[]);

    return {
        data,
        next,
        setStop
    };
}

