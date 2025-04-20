import React from 'react';
import styles from '../style/chat.module.css';
import { useNavigate } from 'react-router-dom';

const Claude = () => {
    const rout = useNavigate()

    return (
        <div className={styles.chatContainer}>
            <div className={styles.appContainer}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <nav className={styles.menu}>
                        <button className={`${styles.menuItem} ${styles.active}`}>New Chat</button>
                    </nav>
                </aside>
                {/* Main Chat Area */}
                <main className={styles.chatArea}>
                    <header className={styles.chatHeader}>
                        <h2>Claude</h2>
                        <div className={styles.controls}>
                            <button className={styles.controlBtn} onClick={() => rout(-1)}>Back</button>
                        </div>
                    </header>
                    <div className={styles.chatBox} id="chatBox"></div>
                    <footer className={styles.chatFooter}>
                        <input type="text" id="userInput" placeholder="Send a message..." />
                        <button id="sendButton">Send</button>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default Claude;