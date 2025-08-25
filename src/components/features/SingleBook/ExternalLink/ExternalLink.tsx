import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import styles from './ExternalLink.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ExternalLink({
  href,
  title,
}: {
  href: string
  title: string
}) {
  return (
    <a className={styles.link} href={href} target='_blank'>
      {title}
      <FontAwesomeIcon icon={faUpRightFromSquare} />
    </a>
  )
}
