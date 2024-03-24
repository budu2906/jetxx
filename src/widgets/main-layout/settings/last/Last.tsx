import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { hideModal, hideModal2, setBet, setBet2, setWin, setWin2, showModal, showModal2 } from '../../../../store/slices/modalSlice';
import { decBalance, setBalance } from '../../../../store/slices/userSlices/balanceSlice';

const Last = ({
  s,
  isFinish,
  last,
  isActiveMain,
  lastController,
  x,
  setIsActiveClick,
  autoRate,
  setAutoRate,
  isActiveWithdrawalCheckbox,
}: {
  isActiveWithdrawalCheckbox: boolean;
  autoRate: boolean;
  setAutoRate: (state: boolean) => void;
  x: number;
  setIsActiveClick: (state: boolean) => void;
  s: any;
  isFinish: boolean;
  last: string;
  isActiveMain: boolean;
  lastController: number;
}) => {
  const [isActive, setIsActive] = useState({ state: false, data: { patt: '', bet: '', sum: 1.0 } });
  const [isState, setIsState] = useState<'otmena' | 'ojidanie' | 'game'>('otmena');
  const [isWin, setIsWin] = useState(false);
  const dispatch = useAppDispatch();
  const balance = useAppSelector(state => state.balanceSlice);
  let patt = { otmena: 'ОТМЕНИТЬ', ojidanie: 'ОЖИДАНИЕ', game: 'ЗАБРАТЬ' };
  const [isPlaing, setIsPlaing] = useState(false);
  const data = new Date();
  
const betSelector = useAppSelector(state=>state.activateSlice.takenBet)
  useEffect(() => {
    console.log(isActiveMain);
    if (isFinish) {
      if (isActive.state) {
        if (isState === 'game') {
          if (autoRate) {
            setIsActive(prev => {
              return {
                data: { patt: 'bet2', bet: last, sum: lastController },
                state: true,
              };
            });
            setIsState('otmena');
          } else {
            setIsActive(prev => {
              return {
                data: { patt: 'bet2', bet: last, sum: lastController },
                state: false,
              };
            });
            dispatch(decBalance(isActive.data.sum * x));
          }
          console.log('cclclcl');
          localStorage.setItem(
            'historyBets',
            JSON.stringify([
              {
                patt: 'bet2',
                bet: x.toString(),
                sum: isActive.data.sum,
                finishSum: parseFloat((isActive.data.sum * x).toString()).toFixed(2),
                time: `${data.getHours()}.${data.getMinutes()}.${
                  data.getSeconds().toString().length < 2
                    ? data.getSeconds() < 10
                      ? `0${data.getSeconds()}`
                      : `${data.getSeconds()}0`
                    : data.getSeconds()
                }`,
                isWin: false,
              },
              ...(JSON.parse(localStorage.getItem('historyBets') as string) || []),
            ])
          );
        }
      }
    }
    if (!isActiveMain) {
      console.log('ss');
      console.log(isState);
      // ? есть экран загрузки и игра закончена
      if (isActive.state) {
        console.log('Ожидание');
        setIsState('ojidanie');
      }
    } else {
      if (isActive.state) {
        if (isState === 'ojidanie') {
          localStorage.setItem('bet2', JSON.stringify(isActive.data));
          setIsPlaing(true);
          console.log('Игра началась, вы в ней учавтсвуете');
          dispatch(decBalance(isActive.data.sum));
          return setIsState('game');
        }
      } else {
        if (isState === 'game') {
          console.log('clickckckc');
       
     

         setIsActive(prev => {
          
            return {
              data: {
                patt: 'bet2',
                bet: x.toString(),
                sum: parseFloat((isActive.data.sum * x).toString()).toFixed(2),
              },
              state: false,
            };
          });
          // if (isWin) {
          // setIsWin(false);
          // } else {
          console.log('f');
          localStorage.setItem(
            'historyBets',
            JSON.stringify([
              {
                patt: 'bet2',
                bet: x.toString(),
                sum: isActive.data.sum,
                finishSum: parseFloat((isActive.data.sum * x).toString()).toFixed(2),
                time: `${data.getHours()}.${data.getMinutes()}.${
                  data.getSeconds().toString().length < 2
                    ? data.getSeconds() < 10
                      ? `0${data.getSeconds()}`
                      : `${data.getSeconds()}0`
                    : data.getSeconds()
                }`,
                isWin: true,
              },
              ...(JSON.parse(localStorage.getItem('historyBets') as string) || []),
            ])
          );
          // }
          dispatch(setBalance(isActive.data.sum * x));
          
          localStorage.setItem('balance', JSON.stringify(balance.value + isActive.data.sum * x));
          localStorage.removeItem('bet2');
        }
        setIsState('otmena');
      }
    }
  }, [isActiveMain, isActive, isWin, isFinish]);

  useEffect(() => {
    //? это должно работать когда мы включили автовывод
    if (isActiveWithdrawalCheckbox) {
      if (x === parseFloat(isActive.data.bet)) {
        if (isActive.state) {
          localStorage.setItem(
            'historyBets',
            JSON.stringify([
              {
                patt: 'bet2',
                bet: x.toString(),
                sum: isActive.data.sum,
                finishSum: parseFloat((isActive.data.sum * x).toString()).toFixed(2),
                time: `${data.getHours()}.${data.getMinutes()}.${
                  data.getSeconds().toString().length < 2
                    ? data.getSeconds() < 10
                      ? `0${data.getSeconds()}`
                      : `${data.getSeconds()}0`
                    : data.getSeconds()
                }`,
                isWin: true,
              },
              ...(JSON.parse(localStorage.getItem('historyBets') as string) || []),
            ])
          );
          if(isState==="game"){
            dispatch(showModal2());
            dispatch(setBet2(x))
            dispatch(setWin2(isActive.data.sum * x))
            
      const modalTimeOut2 = setTimeout(()=>{
      dispatch(hideModal2())
      },3000)
           
          }
          console.log('POBEDA');
          if (autoRate) {
            console.log('autoRate');
            setIsState('otmena');
            dispatch(setBalance(isActive.data.sum * x));
            localStorage.setItem('balance', JSON.stringify(balance.value + isActive.data.sum * x));
          } else {
            console.log(' no autoRate');
            setIsActive(prev => {
              return {
                data: { patt: 'bet2', bet: last, sum: lastController },
                state: false,
              };
            });
          }
        }
        setIsWin(true);
      }
    }
  }, [x]);

  useEffect(() => {
    if (!isActive.state) {
      setAutoRate(false);
    }
    setIsActiveClick(isActive.state);
  }, [isActive.state]);

  useEffect(() => {
    if (autoRate) {
      setIsActive(prev => {
        return {
          data: { patt: 'bet2', bet: last, sum: lastController },
          state: true,
        };
      });
    }
  }, [autoRate]);

  const handleClick = (patt: string, el: string, sum: number) => {
    if (balance.value < sum) {
      console.log('Не достаточно недег');
      return false;
    }
    if (isState === 'ojidanie' && isActive.state) {
      return false;
    }
    setIsActive(prev => {
      return { state: !prev.state, data: { patt, bet: el, sum } };
    });
    if(isState==="game"){
      dispatch(showModal2());
      dispatch(setBet2(x))
      dispatch(setWin2(isActive.data.sum * x))
      
const modalTimeOut2 = setTimeout(()=>{
dispatch(hideModal2())
},3000)
     
    }
  };

  return (
    // <button onClick={() => handleClick('bet2', last, lastController)} className={`${isActive.state ? s[isState] : ''} ${s.bet_btn}`}>
    //   <div>{isActive.state ? <p>{patt[isState]}</p> : <p>СТАВКА</p>}</div>
    // </button>
    <button onClick={() => handleClick('bet2', last, lastController)} className={`${isActive.state ? s[isState] : ''} ${s.bet_btn}`}>
      <div className={`${isActive.state ? s[isState] : ''} ${s.btn}`}>
        {isActive.state ? (
          <p onClick={()=> {
         
       
    
 
   }}>
            <span >{isState === 'game' ? `${parseFloat((isActive.data.sum * x).toString()).toFixed(2)} ₽` : ''}</span>
            {patt[isState]}
          </p>
        ) : (
          <p>CTABKA</p>
        )}
      </div>
    </button>
  );
};

export default Last;
