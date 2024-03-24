import { useEffect, useRef, useState } from 'react';
import s from './Main.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store';
import { setBalance } from '../../../store/slices/userSlices/balanceSlice';




const Main = ({
  x,
  isFinish,
  getIsActiveMain,
  isActiveAnim,
}: {
  x: number;
  isFinish: boolean;
  getIsActiveMain: (state: boolean) => void;
  isActiveAnim: boolean;
}) => {
  const [visX, setVisX] = useState(x || 1.0);
  const [isFirst, setIsFirst] = useState(true);
  const dispatch = useAppDispatch();
  const [isActiveText, setIsActiveText] = useState(false);
  const [isActiveMain, setIsActiveMain] = useState(false); // ?
  const [isActiveLoaderWindow, setIsActiveLoaderWindow] = useState(true);
  const [width, setWidth] = useState(100);
  const letunRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(0);
  const isModalActive = useAppSelector(state => state.activateSlice.isModalActive);
  const isModalActive2 = useAppSelector(state => state.activateSlice.isModalActive2);
  
  const winBalance =useAppSelector(state=>state.activateSlice.winBalance)
  const takenBet = useAppSelector(state=> state.activateSlice.takenBet)
  const winBalance2 =useAppSelector(state=>state.activateSlice.winBalance2)
  const takenBet2 = useAppSelector(state=> state.activateSlice.takenBet2)
  useEffect(() => {
    
    if (isActiveMain) {
      setPosition({ x: 70, y: 40 });
      setSize(90);
    }
    if (isFinish) {
      setPosition({ x: 200, y: 200 });
      let timeout = setTimeout(() => {
        setPosition({ x: 0, y: 0 });
        setSize(0);
        clearTimeout(timeout);
      }, 5000);
    }
    // Условие зависит от размера родительского блока
  }, [isActiveMain, isFinish]);

  useEffect(() => {
    setVisX(1.0);
    // if (isFirst) {
    //   setIsActiveLoaderWindow(true);
    // } else {
    if (!isFinish) {
      // localStorage.clear();
      localStorage.removeItem('bet1');
      localStorage.removeItem('bet2');
      let interval = setInterval(() => {
        setWidth(prev => {
          if (prev === 0) {
            clearInterval(interval);
            return 0;
          }
          let n = (prev -= 1);
          return n;
        });
      }, 60);
      setWidth(100);
      setIsActiveLoaderWindow(true);
      setIsActiveMain(false);
      // let timeout = setTimeout(() => {
      //   setIsActiveLoaderWindow(false);
      //   setIsActiveMain(true);
      //   clearTimeout(timeout);
      // }, 5500);
    }
    // }
    // } else {
    // setIsActive(!isFinish);
    // }
  }, [isFinish]);

  useEffect(() => {
    console.log(isActiveAnim);
  }, [isActiveAnim]);

  useEffect(() => {
    if (width === 0) {
      setIsActiveLoaderWindow(false);
      setIsActiveText(true);
      let timeout = setTimeout(() => {
        setIsActiveText(false);
        setIsActiveMain(true);
        clearTimeout(timeout);
      }, 1500);
    }
  }, [width]);

  useEffect(() => {
    getIsActiveMain(isActiveMain);
  }, [isActiveMain]);

  useEffect(() => {
    setVisX(x);
    let xStorage1: { bet: string; sum: number } = JSON.parse(localStorage.getItem('bet1') as string);
    let xStorage2: { bet: string; sum: number } = JSON.parse(localStorage.getItem('bet2') as string);
    // if (xStorage1) {
    //   if (x === parseFloat(xStorage1.bet)) {
    //     console.log(`
    //     --------------------------=\n
    //       WIIIIn!!!!\n
    //       ${xStorage1.bet} : ${xStorage1.sum}
    //       \n
    //       _____________________________=
    //     `);
    //     dispatch(setBalance(xStorage1.sum * parseFloat(xStorage1.bet)));
    //   }
    // }
    // if (xStorage2) {
    //   if (x === parseFloat(xStorage2.bet)) {
    //     console.log(`
    //     --------------------------=\n
    //       WIIIIn!!!!\n
    //       ${xStorage2.bet} : ${xStorage2.sum} &
    //       \n
    //       _____________________________=
    //     `);
    //     dispatch(setBalance(xStorage2.sum * parseFloat(xStorage2.bet)));
    //   }
    // }
  }, [x]);

  return (
    <div className={s.main}>
      <div className={s.absolute}>
      {isModalActive&&(
<div className={s.modal}>
<div className={s.modal_item1}>
          <p>Вы успели забрать!</p>
          <p>x{takenBet.toFixed(2)}</p>

        </div>
        <div className={s.modal_item2}>
          <p>{winBalance.toFixed(2)} ₽</p>
          <p>Ваш выигрыш</p>
        </div>
</div>
      )}
{isModalActive2&&(
<div className={s.modal}>
<div className={s.modal_item1}>
<p>Вы успели забрать!</p>
          <p>x{takenBet.toFixed(2)}</p>

        </div>
        <div className={s.modal_item2}>
          <p>{winBalance.toFixed(2)} ₽</p>
          <p>Ваш выигрыш</p>
        </div>
</div>
      )}
      </div>
       
      
    
      <div className={s.head}>
        <div style={{ opacity: +isActiveMain, transition: 'all 0.32s ease 0s' }}>
          {/* <div style={{ opacity: 1, transition: 'all 0.32s ease 0s' }}> */}
          <div className={s.content}>
            
            {!isActiveAnim ? (
              <>
                <div style={isFinish ? { animationPlayState: 'paused' } : {}} className={s.sky}></div>
                <div style={isFinish ? { animationPlayState: 'paused' } : {}} className={s.clouds}></div>
                <div className={s.letun}>
                  <div
                    style={{
                      left: `${position.x}%`,
                      bottom: `${position.y}%`,
                    }}
                    ref={letunRef}
                    className={s.letun_cont}>
                    <div className={` ${s.letun_people}  ${isFinish? s.flyAnim : ''}`}>
                      <img className={s.tip} src='../../../../public/assets/main/tip.png' alt='' />
                      <img className={s.plamya} src='../../../../public/assets/main/plamya.svg' alt='' />
                      <img className={s.shadow} src='../../../../public/assets/main/shadow.png' alt='' />
                    </div>
                  </div>
                  <div style={{ width: `${size}%` }} className={`${isFinish ? s.svg_paused : ''} ${s.svg_cont}`}>
                    <img src='../../../../public/assets/main/3btnbse7useltup25o1 1.png' className={`${s.svg} svg_relative`} />
                  </div>
                </div>
              </>
            ) : null}
            <div style={isFinish ? { animationPlayState: 'paused' } : {}} className={`${isActiveAnim ? s.paused : ''} ${s.left}`}></div>
            <div style={isFinish ? { animationPlayState: 'paused' } : {}} className={`${isActiveAnim ? s.paused : ''} ${s.bottom}`}></div>
          </div>
          <div className={s.x_index}>
            <div className={`${isFinish ? s.last_anim : ''} ${s.x}`}>{parseFloat(visX.toString()).toFixed(2)}</div>
            <div className={`${isFinish ? s.flew_away_text_active : ''} ${s.flew_away_text}`}>Улетел</div>
          </div>
        </div>
        <p className={`${!isActiveText ? s.hide_loader_window : ''} ${s.ojidanie}`}>ОЖИДАНИЕ</p>
        <div className={`${!isActiveLoaderWindow ? s.hide_loader_window : ''} ${s.loader_window}`}>
          <img src='../../../../public/assets/main/loader.svg' alt='' />
          <p className={s.next_text}>Ожидание следующего раунда</p>
          <div className={s.loader}>
            <div style={{ width: `${width}%` }} className={s.loader_c}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
