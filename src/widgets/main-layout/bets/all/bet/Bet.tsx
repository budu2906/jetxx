import React, { useEffect, useState } from 'react';
import { BetType } from '../../../../../types/widgets/bets/types';

type Props = {
  s: any;
  bet: BetType;
};

const Bet = ({ s, bet }: Props) => {
  const [x, setX] = useState(1);
  const [isWinBets, setIsWonBets] = useState<BetType[]>([]);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      let storageX = parseFloat(localStorage.getItem('x') as string);
      setX(storageX);
    //   console.log(storageX);
      if (storageX === bet.bet) {
        setIsWin(true);
      
        clearInterval(interval);
      }
      // bets.forEach(item => {
      //   console.log('f');
      //   // if (item.bet === storageX) {
      //   //   console.log(item)
      //   //   setIsWonBets(prev => [...prev, item]);
      //   // }
      // })
    }, 100);
  }, []);

  const returnSize = (num: number) => {
    if (num.toString().length <= 5) {
      return 14;
    }
    if (num.toString().length <= 10) {
      return 10;
    }
    if (num.toString().length < 15) {
      return 8;
    }
  }

  return (
    <div className={`${isWin ? s.active_bet : ''} ${s.bet}`}>
      <div style={{ background: bet.color }} className={s.img}>
        {bet.name.slice(0, 2)}
      </div>
      <p className={s.name}>{bet.name}</p>
      <p style={{ fontSize: `${returnSize(bet.sum)}px` }} className={s.sum}>
        {bet.sum} ₽
      </p>
      <p className={s.finaly_bet}>{isWin ? <div className={`${s.finaly_bet_vis} ${bet.bet >= 10 ? s.golden__hist : bet.bet<2 ? s.blue__hist : s.purple__hist}`}>{bet.bet.toFixed(2)}x</div> : '-'}</p>
      {/* <p className={s.finaly_bet}>
        <div className={s.finaly_bet_vis}>{bet.bet}x</div>
      </p> */}
      <p style={{ fontSize: `${returnSize(bet.sum)}px` }} className={s.finaly_sum}>
        {isWin ? <p className={s.finaly_sum_vis}>{(bet.bet * bet.sum).toFixed(2)} ₽</p> : '-'}
      </p>
    </div>
  );
};

export default Bet;
