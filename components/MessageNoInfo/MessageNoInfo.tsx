import React from 'react';
import styles from './MessageNoInfo.module.css';

interface MessageNoInfoProps {
  message: string;
  buttonText: string;
  onClick: () => void;
}

export const MessageNoInfo: React.FC<MessageNoInfoProps> = ({
  message,
  buttonText,
  onClick,
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
      <button className={styles.button} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
};