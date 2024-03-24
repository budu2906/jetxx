import { useEffect, useState } from 'react';
import s from './Admin.module.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { setMaxX, setMinX } from '../../store/slices/userSlices/xSlice';

const Admin = () => {
  const [val, setVal] = useState(1);
  const dispatch = useAppDispatch()

  const handleBlure = (e: any) => {
    setVal(parseFloat(e.target.value).toFixed(2));
  };

  useEffect(() => {
    localStorage.setItem('balance', val.toString());
  }, [val])

  const getVisRounds = (e: any) => {
    let arr = e.target.value.replaceAll('\n', '').split('x');
    arr.splice(arr.length-1, 1);
    localStorage.setItem('vis_rounds', JSON.stringify(arr));
  };

  const setMin = (e:any)=>{
   let min = e.target.value
   dispatch(setMinX(min))
   localStorage.setItem('min', JSON.stringify(min))
    return min
  }
const setMax = (e:any)=>{
  let max = e.target.value
  dispatch(setMaxX(max))
  localStorage.setItem('max', JSON.stringify(max))
  return max
}

  const getNextRounds = (e: any) => {
    let arr = e.target.value.replaceAll('"', '').split('x').reverse();
    arr.splice(0, 1);
    console.log(arr);
    localStorage.setItem('next_rounds', JSON.stringify(arr));
  };

  return (
    <main className={s.admin}>
      <form className={s.form}>
        <input value={val} onBlur={handleBlure} onInput={e => setVal(e.target.value)} inputMode='decimal' type='text' placeholder='Ваш счёт' />
        <textarea onInput={getVisRounds} cols={30} rows={5} placeholder='Видимые раунды'></textarea>
        <textarea onInput={getNextRounds} cols={30} rows={5} placeholder='Последующие раунды'></textarea>
        <input onInput={setMax} type="number" placeholder="max" name="max" id="max" />
        <input onInput={setMin} type="number" placeholder="min" name="min" id="min" />
        <Link to={'/'}>Добавить</Link>
      </form>
    </main>
  );
};

export default Admin;
