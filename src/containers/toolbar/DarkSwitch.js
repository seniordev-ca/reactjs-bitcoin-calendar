import React, { useState, useEffect } from 'react';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import { getCurrentColor, setCurrentColor } from 'helpers/Utils';
import { DarkIcon, LightIcon } from '../../components/svg';

const DarkSwitch = ({ className }) => {
  const [switchChecked, setSwitchChecked] = useState(false);

  useEffect(() => {
    const color = getCurrentColor();
    setSwitchChecked(color.indexOf('dark') > -1);
  }, []);

  const changeMode = () => {
    let color = getCurrentColor();

    if (color === 'dark') {
      color = 'light';
    } else if (color === 'light') {
      color = 'dark';
    }

    document.getElementsByTagName('html')[0].setAttribute('data-theme', color);
    setCurrentColor(color);
    setSwitchChecked(color === 'dark');
    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
  };

  return (
    <div className={`align-items-center ${className}`}>
      <span className="theme-svg">
        <LightIcon />
      </span>
      <div className="align-middle mx-2">
        <Switch
          id="tooltip_switch"
          className="custom-switch custom-switch-primary custom-switch-small"
          checked={switchChecked}
          onChange={changeMode}
        />
      </div>
      <span className="theme-svg">
        <DarkIcon />
      </span>
    </div>
  );
};
export default DarkSwitch;
