import { useEffect, useState } from 'react';
import s from './HistoryBets.module.scss';
// import { useAppSelector } from '../../../store';

type HistoryType = {
  x: number;
};

const HistoryBets = ({ xHistory }: { xHistory: number[] }) => {
  // ? 10x
  const [isActive, setIsActive] = useState(false);
  // const selector = useAppSelector(state => state.xSlice);

  let historyVis = localStorage.getItem('vis_round') || xHistory;

  useEffect(() => {
    console.log(xHistory)
  }, [xHistory]);

  return (
    <>
      <section className={s.history_bets}>
        <div className={s.history}>
          {xHistory.map((item, id) => (
            <div key={id} className={`${item >= 10 ? s.golden__hist : item<2 ? s.blue__hist : s.purple__hist} ${s.history_item}`}>
              {item}x
            </div>
          ))}
        </div>
        <div className={s.shadow}></div>
        <div className={s.panel}>
          <div className={s.btn_shadow}>
            <button onClick={() => setIsActive(true)} className={s.block}>
              <img src='../../../../public/assets/history/57edc186176820b3663ba2191ec251e3.svg' alt='' />
            </button>
          </div>
        </div>
        {isActive && (
          <div className={s.open_history}>
            <header className={s.header}>
              <div className={s.left}>
                <img src='../../../../public/assets/history/d9ba6ceb77e9ef980af74784d1cc4a93.svg' alt='' />
                <p>история раундов</p>
              </div>
              <div className={s.right}>
                <button onClick={() => setIsActive(false)} className={s.close}>
                  <img src='../../../../public/assets/history/f0bddf642297f006df0407ff5d6daee7.svg' alt='' />
                </button>
              </div>
            </header>
            <div className={s.history_popup}>
              {xHistory.map((item, id) => (
                <div key={id} className={`${item >= 10 ? s.golden__hist : item<2 ? s.blue__hist : s.purple__hist} ${s.history_item}`}>
                  {item}x
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default HistoryBets;
