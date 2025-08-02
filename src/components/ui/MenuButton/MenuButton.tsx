import styles from './MenuButton.module.css'
import Link from 'next/link'

interface MenuButtonProps {
  href: string
  label: string
  isActive?: boolean
  onClick: (label: string) => void
}

export default function MenuButton({
  href,
  label,
  isActive,
  onClick,
}: MenuButtonProps) {
  function handleClick() {
    onClick(label)
  }

  return (
    <Link
      href={href}
      className={`${styles.menuButton} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
    >
      {label}
    </Link>
  )
}
