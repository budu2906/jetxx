import { useEffect, useState } from 'react';
import s from './MainLayout.module.scss';
import Bets from './bets/Bets';
import Header from './header/Header';
import HistoryBets from './history-bets/HistoryBets';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearBets, setBet } from '../../store/slices/userSlices/betsSlice';
// import { setX } from '../../store/slices/userSlices/xSlice';
import Main from './main/Main';
import Settings from './settings/Settings';

const MainLayout = () => {
  const [i,setI] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isFinish, setIsFinish] = useState(true);
  const dispatch = useAppDispatch();
  const [isStarted, setIsStarted] = useState(false);
  const selector = useAppSelector(state => state.betSlice);
  let storageHistory = localStorage.getItem('vis_rounds');
  const [xHistory, setXHistory] = useState<number[]>(storageHistory ? JSON.parse(storageHistory) : []);
  const [x, setX] = useState(1);
  const balance = useAppSelector(state => state.balanceSlice);
  let firstNum = balance.value.toLocaleString().replace(',', '.').split('.')[0];
  let lastNum = balance.value.toLocaleString().replace(',', '.').split('.')[1];
  const [isActiveAnim, setIsActiveAnim] = useState(true);
  let arr = [100, 143, 200, 432, 500];
  let randomLength = 0 + Math.floor(Math.random() * 4);

  const [isActiveMain, setIsActiveMain] = useState(false);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    localStorage.setItem('count', '0');
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const generateBets = async () => {
    const adjectives = ['Cool', 'Awesome', 'Fantastic', 'Amazing', 'Incredible'];
    const nouns = [
      'zodo22',
      '39842',
      'dii8839',
      'danil',
      'Майкл',
      '3f3if8e',
      '39jdid39394',
      '3333333333333333',
      'Cool',
      'Awesome',
      'Fantastic',
      'Amazing',
      'Incredible',
      'kedfiew8f9',
      'Zoomer',
      'Skoof',
    ];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];

    let result = [];
    localStorage.setItem('randomLength', JSON.stringify(arr[randomLength]));
    for (let i = 0; i < nouns.length; i++) {
      let bet = await Number((1.01 + Math.random() * 2).toFixed(2));
      let randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
      let sum = await Number((1 + Math.random() * 10000).toFixed(2));
      let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      result.push({ name: randomNoun, bet, sum, color, isWin: false });
      dispatch(setBet({ name: randomNoun, bet, sum, color, isWin: false }));
    }
  };

  const generateX = () => {
    let x = 1.0;
    let storageX = localStorage.getItem('next_rounds');
    let radnomX: number = 1 + Math.random() * 2;
    if (xHistory[0]) {
      if (xHistory[0] >= 3) {
        radnomX = 1 + Math.random() * 1.8;
      } else if (xHistory[0] <= 1.5) {
        radnomX = 1.9 + Math.random() * 10;
      }
    }
    console.log(storageX);
    if (storageX) {
      let storageCount = JSON.parse(localStorage.getItem('count') as string) || 0;
      // if (storageCount > JSON.parse(storageHistory as string).length) {
      //   localStorage.setItem('count', '0');
      //   storageCount = JSON.parse(localStorage.getItem('count') as string);
      // }
      let second = JSON.parse(storageX)[i] || radnomX;
      console.log(parseFloat(second));
      let interval = setInterval(() => {
        x += 0.01;
        localStorage.setItem('x', x.toFixed(2));
        setX(parseFloat(x.toFixed(2)));
        if (x.toFixed(2) >= parseFloat(second).toFixed(2)) {
          console.log('f');
          setXHistory(prev => [x.toFixed(2), ...prev]);
          clearInterval(interval);
          setIsFinish(true);
        }
      }, 90);
      localStorage.setItem('count', JSON.stringify(storageCount + 1));
    } else {
      console.log(radnomX.toFixed(2));
      let interval = setInterval(() => {
        x += 0.01;
        localStorage.setItem('x', x.toFixed(2));
        setX(parseFloat(x.toFixed(2)));
        if (x.toFixed(2) >= radnomX.toFixed(2)) {
          console.log('f');
          setXHistory(prev => [x.toFixed(2), ...prev]);
          clearInterval(interval);
          setIsFinish(true);
      
         
        }
      }, 90);
    }
  };

  const getIsActiveMain = (state: boolean) => {
    setIsActiveMain(state);
  };

  useEffect(() => {
    if (isFinish) {
      setIsStarted(false);
      localStorage.setItem('x', '1.00');
      let timeout1 = setTimeout(() => {
        dispatch(clearBets());
        let timeout2 = setTimeout(() => {
          generateBets();
          clearTimeout(timeout2);
          let timeout3 = setTimeout(() => {
            generateBets();
            clearTimeout(timeout3);
            let timeout4 = setTimeout(() => {
              generateBets();
              clearTimeout(timeout4);
            }, 1000);
          }, 2500);
        }, 1300);
        // let timeoutIsFinish = setTimeout(() => {
        setIsFinish(false);
        // clearTimeout(timeoutIsFinish)
        // }, 2000)
        let timeout = setTimeout(() => {
          generateX();
          clearTimeout(timeout);
        }, 7900);
        clearTimeout(timeout1);
      }, 4000);
    }
  }, [isFinish]);

  // useEffect(() => {
  //   console.log(selector);
  // }, [selector]);

useEffect(()=>{
if(!isFinish){
  setI(prev=>prev+=1)
}
console.log(i)
}, [isFinish])

  const getIsActiveCheckbox = (state: boolean) => {
    setIsActiveAnim(state);
  };

  return (
    <div className={s.layout}>
      <div className={s.desctop}>
        <div className={s.conte}>
          <Header getIsActiveCheckbox={getIsActiveCheckbox} />
          <HistoryBets xHistory={xHistory} />
          <Main isActiveAnim={isActiveAnim} getIsActiveMain={getIsActiveMain} x={x} isFinish={isFinish} />
          <Settings x={x} isActiveMain={isActiveMain} isStarted={isStarted} isFinish={isFinish} />
          <Bets />
        </div>
      </div>
      <footer className={s.footer}>
        <a href='https://t.me/miliz777' target='_blank'>
          <img src='../../../public/assets/footer/icons8-стрелка-96.png' alt='' />
          Назад
        </a>
        <p className={s.balance}>
          <span>{firstNum}</span>{lastNum ? `,${lastNum}` : ''} ₽
        </p>
        <button className={s.popol}>Пополнить</button>
        <button className={s.menu}>
          <svg data-v-6b596a42='' xmlns='http://www.w3.org/2000/svg' width='21' height='19' viewBox='0 0 21 19' aria-hidden='true' role='img'>
            <g fill='none' fill-rule='evenodd'>
              <g fill='#FFF'>
                <path d='M19.5 16a1.5 1.5 0 010 3h-18a1.5 1.5 0 010-3h18zm0-8a1.5 1.5 0 010 3h-18a1.5 1.5 0 010-3h18zm0-8a1.5 1.5 0 010 3h-18a1.5 1.5 0 010-3h18z'></path>
              </g>
            </g>
          </svg>
        </button>
      </footer>
    </div>
  );
};

export default MainLayout;
