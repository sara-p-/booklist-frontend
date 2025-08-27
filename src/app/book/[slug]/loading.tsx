import styles from './loading.module.css'
import { convertStringToDate } from '@/lib/utils'

export default function Loading() {
  return (
    <div className={styles.container}>
      {/* <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div> */}
      <div className={styles.mainContainer}>
        <div className={styles.bookInfoContainer}>
          <div className={styles.imageContainer}></div>
          <div className={styles.infoContainer}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>a blank of blank and blank</h1>
              <h2 className={styles.author}>author name</h2>
            </div>
            <ul className={styles.list}>
              <li className={styles.item}>
                <p>
                  <span className={`${styles.label} h4`}>series: </span>
                  <span className={styles.valueLink}>a blank of blank</span>
                </p>
              </li>
              <li className={styles.item}>
                <p>
                  <span className={`${styles.label} h4`}>book number:</span> 1
                </p>
              </li>
              <li className={styles.item}>
                <p>
                  <span className={`${styles.label} h4`}>published:</span>{' '}
                  {convertStringToDate('2025-01-01')}
                </p>
              </li>
              <li className={styles.item}>
                <p>
                  <span className={`${styles.label} h4`}>length:</span> 100
                  pages
                </p>
              </li>
              <li className={styles.item}>
                <p>
                  <span className={`${styles.label} h4`}>rating:</span> 10/10
                </p>
              </li>
              <li className={styles.item}>
                <p>
                  <span className={`${styles.label} h4`}>spice:</span> 5 /5
                </p>
              </li>
              <li className={styles.item}>
                <p>
                  <span className={`${styles.label} h4`}>
                    amount completed:
                  </span>{' '}
                  100%
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bookSection}>
          <div className={`${styles.bookSectionContainer}`}>
            <h3 className={styles.bookSectionTitle}>description</h3>
            <div className={styles.bookSectionText}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Possimus optio eligendi magni magnam! Molestiae provident
                commodi saepe tenetur quo repellat, voluptate dolore ex,
                mollitia beatae autem ad delectus corrupti laudantium.
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero
                repellat mollitia aspernatur error quam, fuga, accusamus itaque
                atque inventore cum facere quia eveniet sed accusantium. Quidem
                nobis sint vitae, at magnam quia sapiente blanditiis esse quod
                velit aut cum vero qui repellat! Necessitatibus in odit culpa
                amet labore ratione placeat numquam excepturi repellendus
                commodi, aliquid earum sit mollitia sapiente aut tenetur non
                fugit cumque eos consequuntur. Optio vel perferendis fugiat,
                temporibus iste omnis maxime obcaecati? Nobis qui animi enim in
                asperiores, illum magnam sunt corporis odio! Adipisci, quas
                quam, eum vitae, deleniti molestiae magni natus optio distinctio
                atque quos quidem?
              </p>
            </div>
          </div>
          <div className={`${styles.bookSectionContainer}`}>
            <h3 className={styles.bookSectionTitle}>notes</h3>
            <div className={styles.bookSectionText}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Possimus optio eligendi magni magnam! Molestiae provident
                commodi saepe tenetur quo repellat, voluptate dolore ex,
                mollitia beatae autem ad delectus corrupti laudantium.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sidebarContainer}>
        <div className={styles.sidebarSection}>
          <p className={`${styles.sidebarSectionTitle} h3`}>stats</p>
          <ul className={styles.sidebarSectionList}>
            <li className={styles.sidebarParentItem}>
              <p className={`${styles.sidebarParentLabel} h4`}>genres:</p>
              <ul className={styles.sidebarChildList}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <li key={index} className={styles.sidebarChildItem}>
                    blank
                  </li>
                ))}
              </ul>
            </li>
            <li className={styles.sidebarParentItem}>
              <p className={`${styles.sidebarParentLabel} h4`}>tropes:</p>
              <ul className={styles.sidebarChildList}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <li key={index} className={styles.sidebarChildItem}>
                    blank
                  </li>
                ))}
              </ul>
            </li>
            <li className={styles.sidebarParentItem}>
              <p className={`${styles.sidebarParentLabel} h4`}>creatures:</p>
              <ul className={styles.sidebarChildList}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <li key={index} className={styles.sidebarChildItem}>
                    blank
                  </li>
                ))}
              </ul>
            </li>
            <li className={styles.sidebarParentItem}>
              <p className={`${styles.sidebarParentLabel} h4`}>booktags:</p>
              <ul className={styles.sidebarChildList}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <li key={index} className={styles.sidebarChildItem}>
                    blank
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
