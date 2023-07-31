import { getDisplayedDate, getFormattedTime, getDateWithTime, getHumanDate } from '@/utils';
import Image from 'next/image';
import Debug from '../shared/Debug';
import styles from './horizontal.module.css';
function Horizontal({ data }: any) {
  const {
    schedules,
    message,
    address,
    active: { date, time },
  } = data;
  return (
    <>
      <div className={styles.wrapper} style={{background: 'rgb(226, 232, 240)'}}>
        <div className={styles.data} style={{background: '#ffffff'}}>
          <div className={styles.dataInner} style={{background: 'rgba(255, 255, 255, 0.7)'}}>
            <div className={styles.dataInnerContent} style={{color: '#000000'}}>
              <div className={styles.dataInnerMessageTitle}>Mariage de Marie et Charles</div>
              <div className={styles.dataInnerMessageDateAddress}>
                {schedules && schedules.length ? (
                  <>
                    {schedules.map(({date, time}: any, index: number) => (
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
                    Samedi 17 Juillet 2023
                    <span className={styles.separator}>|</span>
                    19:30
                  </p>
                )}
                {address ? address : 'Salle des fêtes de limbé'}
              </div>
              <div>
                <p className={styles.dataInnerMessage}>
                  {message ? message : 'Tenue correcte exigée'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.image}>
          <div className={styles.imageInner}  style={{color: '#000000'}}>
            <p className={styles.imageInnerName}>M. & Mme Achille MBOUGUENG</p>
            <div className={styles.innerImageWrapper}>
              <Image
                className={styles.imageInnerImage}
                fill={true}
                src="/images/qr-code-message.png"
                alt="qrcode"
              />
            </div>
            <div className={styles.imageInnerTicketLabelNumber}>
              <p>Ticket No</p>
              <p className={styles.imageInnerTicketNumber}>1323455</p>
            </div>
          </div>
        </div>
      </div>
      <Debug data={data} />
    </>
  );
}

export default Horizontal;
