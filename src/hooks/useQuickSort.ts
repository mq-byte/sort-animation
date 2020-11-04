import {useCallback, useMemo, useRef, useState} from "react";

export const useQuickSort = (arr: number[])=>{
    const isStop = useRef(true);
    const isEnd = useRef(true);
    const [data,setData] = useState({
        index: 0,
        lock: 1,
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
                if(data.lock === arr.length){
                    isStop.current = false;
                    return
                }
                if(data.data[data.lock] >= data.data[data.index]){
                    console.log('前进');
                    //不交换，向后移动
                    data.exchange = false;
                    data.index++;
                    if(data.index === data.lock){
                        data.lock++;
                        data.index = 0
                    }
                    setData({...data});
                }else {
                    console.log('插入');
                    isEnd.current = false;
                    //开始数据交换
                    let t = data.data[data.lock];
                    for (let i = data.lock;i >= data.index;i--){
                        data.data[i] = data.data[i - 1]
                    }
                    console.log('oooooo',JSON.stringify(data.data),data.lock,data.index);
                    data.data[data.index] = t;
                    data.exchange = true;
                    setData({...data});
                    //交换结束，停止排序，等待回调结束
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

