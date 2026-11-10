import React from 'react';
import styles from './MessageNoInfo.module.css';

interface MessageNoInfoProps {
  message: string;
  buttonText: string;
  onAction: () => void;
}

export const MessageNoInfo: React.FC<MessageNoInfoProps> = ({
  message,
  buttonText,
  onAction,
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
      <button className={styles.button} onClick={onAction}>
        {buttonText}
      </button>
    </div>
  );
};