import { useRef, useState } from 'react';
import s from './bets.module.scss';
import All from './all/All';
import My from './my/My';
import Top from './top/Top';
import { OptionsType, checkedComponentType } from '../../../types/widgets/bets/types';

const checkedComponent: checkedComponentType = {
  all: {
    component: <All />,
  },
  my: {
    component: <My />,
  },
  top: {
    component: <Top />,
  },
};

const Bets = () => {
  // TODO: нужно создать массив со ставками, мне лень, если делать будет нехуй создай пжпжпжпжп
  const navRef = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState<'all' | 'my' | 'top'>('all');
  let [options, setOptions] = useState<OptionsType[]>([
    {
      name: 'all',
      text: 'Все',
      isActive: true,
    },
    {
      name: 'my',
      text: 'Мои',
      isActive: false,
    },
    {
      name: 'top',
      text: 'Топ',
      isActive: false,
    },
  ]);

  const setPos = (e: any) => {
    if (e.currentTarget && e.target) {
      const parentRect = e.currentTarget.getBoundingClientRect();
      const childRect = e.target.getBoundingClientRect();

      const xPercent = ((childRect.left - parentRect.left) / parentRect.width) * 100;

      if (navRef.current) {
        setOptions(prev =>
          prev.map(item => {
            if (item.name === e.target.dataset.name) {
              return {
                ...item,
                isActive: true,
              };
            }
            return {
              ...item,
              isActive: false,
            };
          })
        );
        setChecked(e.target.dataset.name);
        navRef.current.style.left = `${xPercent}%`;
        // navRef.current.style.width = `${e.target.offsetWidth}px`;
      }
    }

  };

  return (
    <div className={s.wrapper}>
      <div className={s.options}>
        <ul onClick={setPos} className={s.options_header}>
          <div ref={navRef} className={s.navigator}></div>
          {options.map(item => (
            <li data-active={item.isActive} key={item.name}>
              <button data-name={item.name} className={`${item.isActive ? s.active : ''} ${s.option_btn}`}>
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {checkedComponent[checked].component}
    </div>
  );
};

export default Bets;
