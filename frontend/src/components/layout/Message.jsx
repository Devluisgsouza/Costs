import styles from './Message.module.css'
import { useState, useEffect } from 'react'

function Message({ type, msg }) {
    const [visible, setVisible] = useState(false)
    const [hide, setHide] = useState(false)

    useEffect(() => {
        if (!msg) return

        setVisible(true)
        setHide(false)

        const hideTimer = setTimeout(() => {
            setHide(true)
        }, 2600)

        const removeTimer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => {
            clearTimeout(hideTimer)
            clearTimeout(removeTimer)
        }
    }, [msg])

    if (!visible) return null

    return (
        <div
            className={`${styles.message} ${styles[type]} ${
                hide ? styles.hide : ''
            }`}
        >
            {msg}
        </div>
    )
}

export default Message
