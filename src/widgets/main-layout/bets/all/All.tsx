import { useEffect, useState } from 'react';
import s from './All.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../store';
import Bet from './bet/Bet';

const All = () => {
  const [sum, setSumm] = useState(0);
  const bets = useAppSelector(state => state.betSlice);
  const dispatch = useAppDispatch();
  let randNumCount = 0;
  let rand = localStorage.getItem('randomLength');

  randNumCount+=JSON.parse(rand as string);
  const setSummFn = () => {
    const step = 1;
    let n = sum;
    let interval = setInterval(() => {
      n = n + step;
      if (n === bets.length+400) {
        randNumCount=0;
        clearInterval(interval);
      }
      setSumm(n);
    }, 1);
  };

  const clearSummFn = () => {
    if (sum <= 0) {
      return 0;
    }
    const step = 1;
    let n = sum;
    let interval = setInterval(() => {
      n = n - step;
      if (n === 0) {
        clearInterval(interval);
      }
      setSumm(n);
    });
  };

  useEffect(() => {
    if (bets.length !== 0) {
      setSummFn();
    } else {
      clearSummFn();
    }
  }, [bets]);

  // useEffect(() => {
  //   console.log(x);
  // }, [x])

  return (
    <section className={s.all}>
      <section className={s.header}>
        <div className={s.left}>
          <span>Всего ставок:</span>
          <br />
          <p className={s.length}>{sum}</p>
        </div>
        <div className={s.prev}>
          <div className={s.shadow}>
            <button>
              <img src='../../../../../public/assets/bets/3dcd3911867699236ae66d057a566025.svg' alt='' />
              Пред. раунд
            </button>
          </div>
        </div>
      </section>
      <section className={s.bets}>
        {bets.map(bet => (
          <Bet s={s} bet={bet} />
        ))}
      </section>
    </section>
  );
};

export default All;
