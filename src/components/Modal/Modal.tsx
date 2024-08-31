import { FC } from 'react'

import { Button } from '../Button'
import { Portal } from '../Portal'
import styles from './Modal.module.css'

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const Modal: FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null

  return (
    <Portal>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <p className={styles.modalContent}>
            Are you sure you want to delete this chat?
          </p>
          <div className={styles.controlButtons}>
            <Button onClick={onConfirm} className={styles.confirmButton}>
              Yes
            </Button>
            <Button onClick={onClose} className={styles.cancelButton}>
              No
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  )
}
