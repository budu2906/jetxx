import { useEffect, useState } from 'react';
import s from './My.module.scss';

type MyBetsType = {
  patt: string;
  bet: string;
  sum: number;
  finishSum: number;
  time: string;
  isWin: boolean;
};

const My = () => {
  const [myBets, setMyBets] = useState<MyBetsType[]>([]);

  useEffect(() => {
    let storage = localStorage.getItem('historyBets');
    if (storage) {
      setMyBets(JSON.parse(storage));
    }
  }, []);

  const returnSize = (num: number) => {
    if (num.toString().length <= 4) {
      return 12;
    }
    if (num.toString().length <= 10) {
      return 11;
    }
    if (num.toString().length < 15) {
      return 8;
    }
  };

  return (
    <section className={s.my}>
      {myBets.slice(0,10)
        .filter((obj: any, index: number, self: any) => index === self.findIndex((o: any) => o.time === obj.time && o.patt === obj.patt))
        .map((item: MyBetsType, index: number) => (
          <div key={index} className={`${item.isWin ? s.active_bet : ''} ${parseFloat(item.bet) >= 10 ? s.golden : ''} ${s.bet}`}>
            <div className={s.time}>
              <p>{item.time}</p>
            </div>
            <div style={{ fontSize: `${returnSize(item.sum)}px` }} className={s.sum}>
              {item.sum} ₽
            </div>
            <div className={s.bet_cont}>
              <div  className={`${Number(item.bet) >= 10 ? s.golden__hist : Number(item.bet)<2 ? s.blue__hist : s.purple__hist}`}>{item.bet}x</div>
            </div>
            <div style={{ fontSize: `${returnSize(item.sum)}px` }} className={s.finish_sum}>
              {item.isWin ? `${item.finishSum} ₽` : '-'}
            </div>
            <div className={s.history_send_cont}>
              <button className={s.send_btn}>
                <svg width='12' height='12' viewBox='0 0 12 12' fill='#8d8cb1a8' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M7.28428 6.09823L3.51867 6.72583C3.43048 6.74053 3.35685 6.80121 3.32557 6.88498L2.02662 10.3637C1.90228 10.6834 2.237 10.9884 2.54383 10.835L11.5438 6.335C11.8202 6.1968 11.8202 5.80237 11.5438 5.66418L2.54383 1.16418C2.237 1.01076 1.90228 1.31578 2.02662 1.63551L3.32557 5.1142C3.35685 5.19797 3.43048 5.25865 3.51867 5.27335L7.28428 5.90095C7.33876 5.91003 7.37556 5.96155 7.36648 6.01603C7.35946 6.05818 7.32643 6.0912 7.28428 6.09823Z'></path>
                </svg>
              </button>
              <button className={s.send_btn}>
                <svg width='12' height='12' viewBox='0 0 12 12' fill='#8d8cb1a8' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M6 0L0 2.21538C0 2.21538 -3.39746e-05 2.21538 0.857143 7.38462C1.28572 9.96915 3.64273 11.9999 5.99979 12C8.357 12.0001 10.7143 9.96931 11.1429 7.38462L12 2.21538L6 0ZM5.62047 7.82977L8.94214 4.92331L8.20132 4.07666L5.523 6.42019L4.16607 5.52971L3.54883 6.47026L5.62047 7.82977Z'></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
    </section>
  );
};

export default My;
