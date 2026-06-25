import styles from './Input.module.css'

function Input({ type, text, name, placeholder, handleOnChange, value, autoFocus, maxLength }) {
  return (
    <div className={styles.form_control}>
      {text && <label htmlFor={name}>{text}</label>}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        autoFocus={autoFocus}
        maxLength={maxLength}
        step={type === 'number' ? '0.01' : undefined}
      />
    </div>
  )
}

export default Input
