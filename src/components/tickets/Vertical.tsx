import { getDateWithTime, getHumanDate } from '@/utils';
import Image from 'next/image';
import Debug from '../shared/Debug';
import styles from './vertical.module.css';
function Vertical({ data }: any) {
  const {
    template: { schedules, text, address, title }
  } = data;
  
  return (
    <>
      <div className={styles.wrapper} style={{ background: 'rgb(226, 232, 240)' }}>
        <div className={styles.data} style={{ background: '#ffffff' }}>
          <div className={styles.dataInner} style={{ background: 'rgba(255, 255, 255, 0.7)' }}>
            <div className={styles.dataInnerContent} style={{ color: '#000000' }}>
              <div className={styles.dataInnerMessageTitle}>
                {title ? title : "Anniversaire d'Achille"}
              </div>
              <div className={styles.dataInnerMessageDateAddress}>
                {schedules && schedules.length ? (
                  <>
                    {schedules.map(({ date, time }: any, index: number) => (
                      <p
                        className={styles.dataInnerMessageDateAddressDate}
                        key={`schedule-${index}`}
                      >
                        {getHumanDate(getDateWithTime(date, time))}
                      </p>
                    ))}
                  </>
                ) : (
                  <p className={styles.dataInnerMessageDateAddressDate}>
                    11 Septembre
                    <span className={styles.separator}>|</span>
                    19:30
                  </p>
                )}
                {address ? address : 'Salle des fêtes de Rennes'}
              </div>
              <div className={styles.dataInnerMessage}>
                  {text} 
              </div>
            </div>
          </div>
        </div>
        <div className={styles.image}>
          <div className={styles.imageInner} style={{ color: '#000000' }}>
            <div className={styles.innerImageWrapper}>
              <Image
                className={styles.imageInnerImage}
                fill={true}
                src="/images/qr-code-message.png"
                alt="qrcode"
              />
            </div>
            <div className={styles.ticketName}>
              <div className={styles.imageInnerTicketLabelNumber}>
                <p>Ticket No</p>
                <p className={styles.imageInnerTicketNumber}>1323455</p>
              </div>
              <p className={styles.imageInnerName}>M. & Mme Achille MBOUGUENG</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Vertical;
