import { useEffect, useState } from 'react';
import s from './Settings.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store';
import First from './first/First';
import Last from './last/Last';
// let n = 0.39;

const Main = ({ isFinish, x, isStarted, isActiveMain }: { isFinish: boolean; x: number; isStarted: boolean; isActiveMain: boolean }) => {
  const [first, setFirst] = useState('2.00');
  const [last, setLast] = useState('2.00');

  let btns = [{ sum: 50 }, { sum: 100 }, { sum: 200 }, { sum: 500 }];

  const [isState, setIsState] = useState<'loader' | 'game'>();

  const balance = useAppSelector(state => state.balanceSlice).value;
  const [isActiveClickFirst, setIsActiveClickFirst] = useState(false);
  const [isActiveClickLast, setIsActiveClickLast] = useState(false);
  const dispatch = useAppDispatch();

  const [firstController, setFirstController] = useState(10.0);
  const [lastController, setLastController] = useState(10.0);

  const [isActiveWithdrawalCheckboxFirst, setIsActiveWithdrawalCheckboxFirst] = useState(false);
  const [isActiveWithdrawalCheckboxLast, setIsActiveWithdrawalCheckboxLast] = useState(false);

  const [autoRateFirst, setAutoRateFirst] = useState(false);
  const [autoRateLast, setAutoRateLast] = useState(false);

  const maxSum = 10000;

  const autoBetFn = async (e: any) => {
    // let result = await validation(e);
    // if (result) {
    if (e.target.value.split('').includes('.')) {
      if (e.target.value.replace('.', '').length <= 5) {
        setFirst(e.target.value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, ''));
      }
    } else {
      if (e.target.value.replace('.', '').length < 4) {
        setFirst(e.target.value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, ''));
      }
    }
    // }
  };

  const autoStavFn = async (e: any) => {
    // let result = await validation(e);
    // if (result) {
    if (e.target.value.split('').includes('.')) {
      if (e.target.value.replace('.', '').length <= 5) {
        setLast(e.target.value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, ''));
      }
    } else {
      if (e.target.value.replace('.', '').length < 4) {
        setLast(e.target.value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, ''));
      }
    }
    // }
  };

  const increment = (setFn: (val: any) => number) => {
    setFn((prev: number) => {
      if (!prev || prev <= 0) {
        return 10.0;
      }
      if (prev >= maxSum) {
        return maxSum;
      }
      prev += 10;
      console.log(parseFloat(prev.toFixed(2)));
      return parseFloat(prev.toFixed(2));
    });
  };

  const decrement = (setFn: (val: any) => void) => {
    setFn((prev: number) => {
      if (!prev || prev <= 10) {
        return 10.0;
      }
      if (prev <= 10) {
        return 10.0;
      }
      prev -= 10;
      return parseFloat(prev.toFixed(2));
    });
  };

  const handleBlur = (setFn: (val: any) => void) => {
    setFn((prev: number) => {
      // let indexPoint = prev.toString().indexOf('.');
      // let res = prev
      //   .toString()
      //   .split('')
      //   .slice(indexPoint + 1, prev.toString().length);
      if (prev <= 10.0) {
        return 10.0;
      }
      if (prev >= maxSum) {
        return maxSum;
      }
      console.log(parseFloat(prev.toString()));
      return parseFloat(prev.toString());
    });
  };

  const handleBetBlur = (setFn: (val: any) => void) => {
    setFn((prev: number) => {
      if (prev <= 1) {
        return 1;
      }
      console.log(parseFloat(prev.toString()));
      return parseFloat(prev.toString()).toFixed(2);
    });
  };

  const inputHandle = (e: any, setFn: (val: any) => void) => {
    setFn((prev: number) => {
      if (e.target.value.replace('.', '').length >= 6) {
        return prev;
      }
      return e.target.value;
    });
  };

  const setStav = (e: any, setFn: (val: any) => void) => {
    btns.forEach(item => {
      if (item.sum === parseInt(e.target.dataset.sum)) {
        setFn((prev: number) => {
          if (item.sum + prev >= maxSum) {
            return maxSum;
          }
          return (prev += item.sum);
        });
      }
    });
  };

  useEffect(() => {
    // ? game - отмена
    // ? loader - ожидание
    if (isFinish) {
      setIsState('loader');
    } else {
      setIsState('game');
    }
  }, [isFinish]);

  return (
    <section className={s.main}>
      <div className={`${s.block} ${s.left}`}>
        <div className={s.header}>
          <label
            htmlFor='auto_bet_1'
            className={`${autoRateFirst ? s.active_auto_bet : ''} ${isActiveClickLast ? s.not_active_label : ''}  ${s.auto_bet}`}>
            <input onChange={() => setAutoRateFirst(prev => !prev)} id='auto_bet_1' type='checkbox' />
            <div></div>
            Автоставка
          </label>
          <label
            htmlFor='auto_vivod_1'
            className={`${isActiveMain ? s.not_active_label : ''} ${isActiveWithdrawalCheckboxFirst ? s.active_auto_bet : ''}`}>
            <input onChange={() => setIsActiveWithdrawalCheckboxFirst(prev => !prev)} id='auto_vivod_1' type='checkbox' />
            <div></div>
            Автовывод
          </label>
          <div className={`${isActiveWithdrawalCheckboxFirst ? s.unactive_bet : ''} ${s.bet}`}>
            <div className={s.content}>
              <p>x</p>
              <p>{first}</p>
            </div>
            <input onBlur={_ => handleBetBlur(setFirst)} id='coef-input' type='text' inputMode='decimal' onInput={autoBetFn} value={first} />
          </div>
        </div>
        <div className={s.footer}>
          <div className={`${isActiveClickFirst ? s.active_amount_controller : ''} ${s.bet_amount_controller}`}>
            <div className={s.input_controller}>
              <button onClick={e => decrement(setFirstController)} className={`${s.inc_btn} ${s.decrement}`}>
                <img src='../../../../public/assets/controller/97de90559589bee034295a9d2e9e626a.svg' alt='' />
              </button>
              <div className={s.input_controller_input}>
                <input
                  onBlur={_ => handleBlur(setFirstController)}
                  onInput={e => inputHandle(e, setFirstController)}
                  type='text'
                  value={firstController.toLocaleString().replace(',', '.')}
                />
                <div className={s.overlay}>
                  <p>{firstController.toLocaleString().replace(',', '.')}</p>
                  <p className={s.symb}>₽</p>
                </div>
              </div>
              <button onClick={_ => increment(setFirstController)} className={`${s.inc_btn} ${s.increment}`}>
                <img src='../../../../public/assets/controller/02f73e3c8eee420b71b6f7c6b409b20d.svg' alt='' />
              </button>
            </div>
            <div className={s.increment_btns}>
              {btns.map(item => (
                <button className={s.inc_btn} data-sum={item.sum} onClick={e => setStav(e, setFirstController)} key={item.sum}>
                  +{item.sum}
                </button>
              ))}
            </div>
          </div>
          <First
            setAutoRate={setAutoRateFirst}
            autoRate={autoRateFirst}
            isActiveWithdrawalCheckbox={isActiveWithdrawalCheckboxFirst}
            setIsActiveClick={setIsActiveClickFirst}
            x={x}
            isActiveMain={isActiveMain}
            s={s}
            isFinish={isFinish}
            first={first}
            firstController={firstController}
          />
        </div>
      </div>
      <div className={`${s.block} ${s.right}`}>
        <div className={s.header}>
          <label
            htmlFor='auto_bet_2'
            className={`${autoRateLast ? s.active_auto_bet : ''} ${isActiveClickLast ? s.not_active_label : ''} ${s.auto_bet}`}>
            <input onChange={() => setAutoRateLast(prev => !prev)} id='auto_bet_2' type='checkbox' />
            <div></div>
            Автоставка
          </label>
          <label
            htmlFor='auto_vivod_2'
            className={`${isActiveMain ? s.not_active_label : ''} ${isActiveWithdrawalCheckboxLast ? s.active_auto_bet : ''}`}>
            <input onChange={() => setIsActiveWithdrawalCheckboxLast(prev => !prev)} id='auto_vivod_2' type='checkbox' />
            <div></div>
            Автовывод
          </label>
          <div className={`${isActiveWithdrawalCheckboxLast ? s.unactive_bet : ''} ${s.bet}`}>
            <div className={s.content}>
              <p>x</p>
              <p>{last}</p>
            </div>
            <input onBlur={_ => handleBetBlur(setLast)} id='coef-input' type='text' inputMode='decimal' onInput={autoStavFn} value={last} />
          </div>
        </div>
        <div className={s.footer}>
          <div className={`${isActiveClickLast ? s.active_amount_controller : ''} ${s.bet_amount_controller}`}>
            <div className={s.input_controller}>
              <button onClick={e => decrement(setLastController)} className={`${s.inc_btn}  ${s.decrement}`}>
                <img src='../../../../public/assets/controller/97de90559589bee034295a9d2e9e626a.svg' alt='' />
              </button>
              <div className={s.input_controller_input}>
                <input
                  onBlur={_ => handleBlur(setLastController)}
                  onInput={e => inputHandle(e, setLastController)}
                  type='text'
                  value={lastController.toLocaleString().replace(',', '.')}
                />
                <div className={s.overlay}>
                  <p>{lastController.toLocaleString().replace(',', '.')}</p>
                  <p>₽</p>
                </div>
              </div>
              <button onClick={_ => increment(setLastController)} className={`${s.inc_btn} ${s.increment}`}>
                <img src='../../../../public/assets/controller/02f73e3c8eee420b71b6f7c6b409b20d.svg' alt='' />
              </button>
            </div>
            <div className={s.increment_btns}>
              {btns.map(item => (
                <button className={s.inc_btn} data-sum={item.sum} onClick={e => setStav(e, setLastController)} key={item.sum}>
                  +{item.sum}
                </button>
              ))}
            </div>
          </div>
          <Last
            setAutoRate={setAutoRateLast}
            autoRate={autoRateLast}
            isActiveWithdrawalCheckbox={isActiveWithdrawalCheckboxLast}
            setIsActiveClick={setIsActiveClickLast}
            x={x}
            isActiveMain={isActiveMain}
            s={s}
            isFinish={isFinish}
            last={last}
            lastController={lastController}
          />
        </div>
      </div>
    </section>
  );
};

export default Main;
