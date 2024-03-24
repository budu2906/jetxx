import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { hideModal, setBet, setWin, showModal } from '../../../../store/slices/modalSlice';
import { decBalance, setBalance } from '../../../../store/slices/userSlices/balanceSlice';

const First = ({
  s,
  isFinish,
  first,
  isActiveMain,
  firstController,
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
  first: string;
  isActiveMain: boolean;
  firstController: number;
}) => {
  const [isActive, setIsActive] = useState({ state: false, data: { patt: '', bet: '', sum: 1.0 } });
  const [isState, setIsState] = useState<'otmena' | 'ojidanie' | 'game'>('otmena');
  const [isWin, setIsWin] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false)
  const dispatch = useAppDispatch();
  const balance = useAppSelector(state => state.balanceSlice);
  let patt = { otmena: 'ОТМЕНИТЬ', ojidanie: 'ОЖИДАНИЕ', game: 'ЗАБРАТЬ' };
  
  const [isPlaing, setIsPlaing] = useState(false);
  const data = new Date();

  useEffect(() => {
    console.log(isActiveMain);
    if (isFinish) {
      if (isActive.state) {
        if (isState === 'game') {
          if (autoRate) {
            
            setIsActive(prev => {
              return {
                data: { patt: 'bet1', bet: first, sum: firstController },
                state: true,
              };
            });
            setIsState('otmena');
          } else {
            setIsActive(prev => {
              return {
                data: { patt: 'bet1', bet: first, sum: firstController },
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
                patt: 'bet1',
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
          localStorage.setItem('bet1', JSON.stringify(isActive.data));
          setIsPlaing(true);
          console.log('Игра началась, вы в ней учавтсвуете');
          dispatch(decBalance(isActive.data.sum));
          return setIsState('game');
        }
      } else {
        if (isState === 'game') {
          console.log('clickckckc');
          setIsModalActive(true)
          setIsActive(prev => {
            return {
              data: {
                patt: 'bet1',
                bet: x.toString(),
                sum: parseFloat((isActive.data.sum * x).toString()).toFixed(2),
              },
              state: false,
            };
          });
          if (isWin) {
            setIsWin(false);
          } else {
            console.log('f');
            localStorage.setItem(
              'historyBets',
              JSON.stringify([
                {
                  patt: 'bet1',
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
          }
          dispatch(setBalance(isActive.data.sum * x));
          localStorage.setItem('balance', JSON.stringify(balance.value + isActive.data.sum * x));
          localStorage.removeItem('bet1');
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
                patt: 'bet1',
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
            dispatch(showModal());
            dispatch(setBet(x))
            dispatch(setWin(isActive.data.sum * x))
            
      const modalTimeOut = setTimeout(()=>{
      dispatch(hideModal())
      },3000)}

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
                data: { patt: 'bet1', bet: first, sum: firstController },
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
          data: { patt: 'bet1', bet: first, sum: firstController },
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
      dispatch(showModal());
      dispatch(setBet(x))
      dispatch(setWin(isActive.data.sum * x))
      
const modalTimeOut = setTimeout(()=>{
dispatch(hideModal())
},3000)


    }
  };

  return (
    // <button onClick={() => handleClick('bet1', first, firstController)} className={`${isActive.state ? s[isState] : ''} ${s.bet_btn}`}>
    //   <div>{isActive.state ? <p>{patt[isState]}</p> : <p>СТАВКА</p>}</div>
    // </button>
    <button onClick={() => handleClick('bet1', first, firstController)} className={`${isActive.state ? s[isState] : ''} ${s.bet_btn}`}>
      <div className={`${isActive.state ? s[isState] : ''} ${s.btn}`}>
        {isActive.state ? (
                    <p onClick={()=> {
                  
           
            
           
             }}>
            <span >{isState === 'game' ? `${parseFloat((isActive.data.sum * x).toString()).toFixed(2)} ₽` : ''}</span>
            {patt[isState]}
          </p>
        ) : (
          <p>СТАВКА</p>
        )}
      </div>
    </button>
  );
};

export default First;
