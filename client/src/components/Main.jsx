import React, {useRef, useContext} from "react";
import '../style/style.css'
import Logo from'../image/logo.png'
import { useNavigate } from "react-router-dom";
import { translations } from "./lang";
import { Context } from "./context";
import axios from "axios";

const Main = (props) => {
    const context = useContext(Context)
    const rout = useNavigate()

    const languageButton = useRef()
    const languageDropdown = useRef()

    const engbut = useRef()
    const rubut = useRef()
    const currentLanguage = useRef()

    const SwitchLangToEN = (e) => {
        setLanguage('en')
    }
    const SwtchLangToRu = (e) => {
        setLanguage('ru')
    }
    const ShowClasslist = (e) => {
        e.stopPropagation();
        languageDropdown.current.classList.toggle('show')
    }

    const Close = (e) => {
        if (!languageButton.current.contains(e.target) && !languageDropdown.current.contains(e.target)) {
            languageDropdown.current.classList.remove('show');
        }
    }

    // Translate
    const setLanguage = (langCode) => {
        context.setlang(langCode);
        localStorage.setItem('language', langCode);
        currentLanguage.current.textContent = localStorage.getItem('language').toUpperCase()
    };

    const t = (key) => {
        return translations[context.lang]?.[key]
    }


    return(
        <div onClick={Close}>
            <header id="header" class="fixed-header">
            <div class="container">
                <div class="logo">
                    <img src={Logo} alt="Multi-AI Logo" class="logo-image"/>
                    <h1>Multi-<span class="gradient-text">AI</span></h1>
                </div>
                
                <nav class="desktop-nav">
                    <ul>
                        <li><a href="#models" class="nav-link">{t('header.models')}</a></li>
                        <li><a href="#features" class="nav-link">{t('header.features')}</a></li>
                        <li><a href="#donate" class="nav-link">{t('header.help')}</a></li>
                    </ul>
                </nav>
                
                <div class="header-right">
                    <div class="language-switcher">
                        <button class="language-button" onClick={ShowClasslist} ref={languageButton}>
                            <span id="current-language" ref={currentLanguage}>RU</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="language-dropdown" id="language-dropdown" ref={languageDropdown}>
                            <button data-lang="ru" ref={rubut} onClick={SwtchLangToRu}>Русский</button>
                            <button data-lang="en" ref={engbut} onClick={SwitchLangToEN}>English</button>
                        </div>
                    </div>
                    
                    <button class="mobile-menu-toggle">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
            <div class="mobile-menu" id="mobile-menu">
                <button class="close-menu">
                    <i class="fas fa-times"></i>
                </button>
                <nav>
                    <ul>
                        <li><a href="#models">Нейросети</a></li>
                        <li><a href="#features">Преимущества</a></li>
                        <li><a href="#donate">Поддержка</a></li>
                    </ul>
                </nav>
                <div class="mobile-language">
                    <h3>Язык</h3>
                    <div class="mobile-language-options">
                        <button data-lang="ru">Русский</button>
                        <button data-lang="en">English</button>
                    </div>
                </div>
            </div>
        </header>
        
        <main>
        <section id="hero" class="hero-section">
            <div class="container">
                <div class="hero-content">
                    <div class="label">
                        <i class="fas fa-globe"></i>
                        <span>{t('features.1.title')}</span>
                    </div>
                    <h1>{t('hero.title')} <span class="gradient-text">{t('hero.title2')}</span> {t('hero.title3')}</h1>
                    <p>{t('hero.subtitle')}</p>
                    <div class="cta-buttons">
                        <a href="#models" class="primary-button"> 
                            {t('hero.button.primary')}
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    
                        <a href="#features" class="secondary-button">
                            {t('hero.button.secondary')}
                        </a>
                    </div>
                </div>
            </div>
            <div class="hero-bg-element hero-bg-1"></div>
            <div class="hero-bg-element hero-bg-2"></div>
        </section>
        <section id="models" class="models-section">
            <div class="container">
                <div class="section-header">
                    <div class="label">
                        <i class="fas fa-sparkles"></i>
                        <span>{t('model.free')}</span>
                    </div>
                    <h2>{t('models.title')}</h2>
                    <p>{t('models.subtitle')}</p>
                </div>
                
                <div class="models-grid">
                    <div class="model-card" data-model="chatgpt">
                        <div class="model-header">
                            <div class="model-icon bg-green">
                                <i class="fas fa-comment-alt"></i>
                            </div>
                            <h3>ChatGPT</h3>
                        </div>
                        <p>{t('model.chatgpt.desc')}</p>
                        <a onClick={() => rout('/chatgpt')} class="model-link" style={{"cursor": "pointer"}}>
                        {t('models.try')} <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    <div class="model-card" data-model="claude">
                        <div class="model-header">
                            <div class="model-icon bg-purple">
                                <i class="fas fa-robot"></i>
                            </div>
                            <h3>Claude</h3>
                        </div>
                        <p>{t('model.claude.desc')}</p>
                        <a onClick={() => rout('/claude')} class="model-link" style={{"cursor": "pointer"}}>
                            {t('models.try')} <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    <div class="model-card" data-model="gemini">
                        <div class="model-header">
                            <div class="model-icon bg-blue">
                                <i class="fas fa-gem"></i>
                            </div>
                            <h3>Gemini</h3>
                        </div>
                        <p>{t('model.gemini.desc')}</p>
                        <a onClick={() => rout('/gemini')} class="model-link" style={{"cursor": "pointer"}}>
                            {t('models.try')} <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    <div class="model-card" data-model="deepseek">
                        <div class="model-header">
                            <div class="model-icon bg-teal">
                                <i class="fas fa-search"></i>
                            </div>
                            <h3>DeepSeek</h3>
                        </div>
                        <p>{t('model.deepseek.desc')}</p>
                        <a onClick={() => rout('/deepseek')} class="model-link" style={{"cursor": "pointer"}}>
                        {t('models.try')} <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    <div class="model-card" data-model="qwen">
                        <div class="model-header">
                            <div class="model-icon bg-red">
                                <i class="fas fa-brain"></i>
                            </div>
                            <h3>Qwen</h3>
                        </div>
                        <p>{t('model.qwen.desc')}</p>
                        <a onClick={() => rout('/qwen')} class="model-link" style={{"cursor": "pointer"}}>
                            {t('models.try')} <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    <div class="model-card" data-model="grok">
                        <div class="model-header">
                            <div class="model-icon bg-orange">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <h3>Grok</h3>
                        </div>
                        <p>{t('model.grok.desc')}</p>
                        <a onClick={() => rout('/grok')} class="model-link" style={{"cursor": "pointer"}}>
                            {t('models.try')} <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <section id="features" class="features-section">
            <div class="container">
                <div class="section-header">
                    <h2>{t('features.title')}</h2>
                    <p>{t('features.subtitle')}</p>
                </div>
                
                <div class="features-container">
                    <div class="features-column">
                        <div class="feature-item">
                            <div class="feature-icon">
                                <i class="fas fa-globe"></i>
                            </div>
                            <div class="feature-content">
                                <h3>{t('features.1.title')}</h3>
                                <p>{t('features.1.desc')}</p>
                            </div>
                        </div>
                        
                        <div class="feature-item">
                            <div class="feature-icon">
                                <i class="fas fa-wallet"></i>
                            </div>
                            <div class="feature-content">
                                <h3>{t('features.2.title')}</h3>
                                <p>{t('features.2.desc')}</p>
                            </div>
                        </div>
                        
                        <div class="feature-item">
                            <div class="feature-icon">
                                <i class="fas fa-bolt"></i>
                            </div>
                            <div class="feature-content">
                                <h3>{t('features.3.title')}</h3>
                                <p>{t('features.3.desc')}</p>
                            </div>
                        </div>
                    </div>
                    <div class="features-divider"></div>
                    <div class="features-column">
                        <div class="feature-item">
                            <div class="feature-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <div class="feature-content">
                                <h3>{t('features.4.title')}</h3>
                                <p>{t('features.4.desc')}</p>
                            </div>
                        </div>
                        
                        <div class="feature-item">
                            <div class="feature-icon">
                                <i class="fas fa-sync-alt"></i>
                            </div>
                            <div class="feature-content">
                                <h3>{t('features.5.title')}</h3>
                                <p>{t('features.5.desc')}</p>
                            </div>
                        </div>
                        
                        <div class="feature-item">
                            <div class="feature-icon">
                                <i class="fas fa-headphones"></i>
                            </div>
                            <div class="feature-content">
                                <h3>{t('features.6.title')}</h3>
                                <p>{t('features.6.desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>          
            </div>
        </section>
        <section id="donate" class="donate-section">
            <div class="container">
                <div class="donate-content">
                    <h2>{t('donate.title')}</h2>
                    <p>{t('donate.desc')}</p>
                    <a href="https://yoomoney.ru/to/4100119087258612" target="_blank" class="donate-button">
                        <i class="fas fa-heart"></i>
                        {t('donate.button')}
                    </a>
                </div>
            </div>
        </section>
        </main>
    
    <footer>
        <div class="container">
            <div class="footer-top">
                <div class="footer-info">
                    <div class="footer-logo">
                        <img src={Logo} alt="Multi-AI Logo" width="40" height="40"/>
                        <h3>Multi-<span class="gradient-text">AI</span></h3>
                    </div>
                    <p>{t('footer.desc')}</p>
                </div>
                
                <div class="footer-links">
                    <div class="footer-link-group">
                        <a href="https://t.me/SS_Super_Support" target="_blank" class="support-link">
                            <i class="fas fa-comment-lock"></i>
                            <span>{t('footer.contact.support')}</span>
                        </a>
                        <p class="support-hours">{t('footer.contact.hours')}</p>
                    </div>
                    
                    <div class="footer-link-group">
                        <a/>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p class="copyright">{t('footer.copyright')}</p>
                <div class="legal-links">
                    <button id="terms-button">{t('footer.terms')}</button>
                    <button id="privacy-button">{t('footer.privacy')}</button>
                    <button id="legal-button">{t('footer.legal')}</button>
                </div>
            </div>
        </div>
    </footer>
    <div class="modal" id="terms-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Условия использования</h2>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <p>Здесь будут условия использования сервиса...</p>
            </div>
        </div>
    </div>
    
    <div class="modal" id="privacy-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Политика конфиденциальности</h2>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <p>Здесь будет политика конфиденциальности...</p>
            </div>
        </div>
    </div>
    
    <div class="modal" id="legal-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Правовая информация</h2>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <p>Здесь будет правовая информация...</p>
            </div>
        </div>
    </div>
    </div>
    )
}

export default Main