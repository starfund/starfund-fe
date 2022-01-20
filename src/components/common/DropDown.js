import React, { useState } from 'react';

const DropDown = ({ title, subtitle, textBold, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="dropdown-header-ppv">
        <div>
          {title}
          <div className="event-item-ppv-desc" style={{ textAlign: 'left' }}>
            {subtitle}
          </div>
        </div>
        {isOpen && (
          <svg
            onClick={() => setIsOpen(false)}
            width="13"
            height="8"
            viewBox="0 0 13 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.335805 2.11453L5.63841 7.35533C5.75331 7.47118 5.89002 7.56314 6.04064 7.62589C6.19127 7.68864 6.35282 7.72095 6.51599 7.72095C6.67917 7.72095 6.84072 7.68864 6.99135 7.62589C7.14197 7.56314 7.27868 7.47118 7.39358 7.35533L12.6344 2.11453C12.7502 1.99962 12.8422 1.86292 12.9049 1.71229C12.9677 1.56167 13 1.40011 13 1.23694C13 1.07377 12.9677 0.912213 12.9049 0.76159C12.8422 0.610967 12.7502 0.47426 12.6344 0.359354C12.4028 0.129141 12.0895 -7.58171e-05 11.763 -7.58171e-05C11.4364 -7.58171e-05 11.1232 0.129141 10.8916 0.359354L6.51599 4.73493L2.14042 0.359354C1.91019 0.131004 1.59945 0.00226879 1.27519 0.000903606C1.11252 -3.67165e-05 0.951265 0.0311418 0.80067 0.0926528C0.650074 0.154164 0.513102 0.244797 0.397606 0.359354C0.277617 0.470126 0.180769 0.603576 0.112655 0.751994C0.0445404 0.900412 0.00651169 1.06086 0.000764847 1.22406C-0.00498199 1.38726 0.0216684 1.54998 0.079175 1.70282C0.136682 1.85566 0.223905 1.99559 0.335805 2.11453Z"
              fill="white"
            />
          </svg>
        )}
        {!isOpen && (
          <svg
            onClick={() => setIsOpen(true)}
            width="13"
            height="8"
            viewBox="0 0 13 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.335805 5.60642L5.63841 0.365618C5.75331 0.249766 5.89002 0.157812 6.04064 0.0950602C6.19127 0.0323082 6.35282 0 6.51599 0C6.67917 0 6.84072 0.0323082 6.99135 0.0950602C7.14197 0.157812 7.27868 0.249766 7.39358 0.365618L12.6344 5.60642C12.7502 5.72132 12.8422 5.85803 12.9049 6.00865C12.9677 6.15928 13 6.32083 13 6.48401C13 6.64718 12.9677 6.80873 12.9049 6.95936C12.8422 7.10998 12.7502 7.24669 12.6344 7.36159C12.4028 7.59181 12.0895 7.72102 11.763 7.72102C11.4364 7.72102 11.1232 7.59181 10.8916 7.36159L6.51599 2.98602L2.14042 7.36159C1.91019 7.58994 1.59946 7.71868 1.27519 7.72004C1.11252 7.72098 0.951265 7.68981 0.80067 7.62829C0.650074 7.56678 0.513101 7.47615 0.397606 7.36159C0.277618 7.25082 0.180769 7.11737 0.112655 6.96895C0.0445406 6.82054 0.00651135 6.66009 0.000764847 6.49689C-0.00498165 6.33369 0.0216687 6.17097 0.079175 6.01813C0.136681 5.86529 0.223905 5.72535 0.335805 5.60642Z"
              fill="white"
            />
          </svg>
        )}
      </div>
      {isOpen && (
        <div className="event-item-ppv-desc" style={{ textAlign: 'left' }}>
          <span style={{ fontWeight: 'bold' }}>{textBold}</span>
          {text}
        </div>
      )}
    </div>
  );
};

export default DropDown;