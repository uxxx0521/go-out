import React, { useState, useEffect, useRef } from 'react';
import styles from './LandingPage.module.css';
import { useNavigate } from 'react-router-dom';

interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface Step {
    step: string;
    title: string;
    description: string;
}

interface Business {
    icon: string;
    name: string;
}

interface PricingPlan {
    name: string;
    price: string;
    popular: boolean;
    features: string[];
    buttonText: string;
    buttonStyle: 'primary' | 'secondary';
}

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const statsRef = useRef<HTMLElement>(null);
    const [statsAnimated, setStatsAnimated] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > 50);
        };

        const observerOptions: IntersectionObserverInit = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    setStatsAnimated(true);
                    animateCounters();
                }
            });
        }, observerOptions);

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, [statsAnimated]);

    const animateCounters = (): void => {
        const counters = document.querySelectorAll('.stats-counter');
        counters.forEach(counter => {
            const target = counter.textContent;
            if (!target) return;

            const isPercentage = target.includes('%');
            const isMultiplier = target.includes('x');
            const numericValue = parseInt(target.replace(/[^\d]/g, ''));

            let current = 0;
            const increment = Math.ceil(numericValue / 50);

            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(timer);
                }

                let displayValue = current.toLocaleString();
                if (isPercentage) displayValue += '%';
                if (isMultiplier) displayValue += 'x';
                if (target.includes('+')) displayValue += '+';

                counter.textContent = displayValue;
            }, 30);
        });
    };
    const handleSignIn = () => navigate('/signin');
    const handleStartTrial = () => navigate('/signup');

    const scrollToSection = (sectionId: string): void => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    const features: Feature[] = [
        {
            icon: "📱",
            title: "Digital Stamp Cards",
            description: "Replace physical cards with beautiful digital versions. Customers never lose their progress again."
        },
        {
            icon: "📊",
            title: "Real-Time Analytics",
            description: "Track customer visits, popular times, and loyalty program performance with detailed insights."
        },
        {
            icon: "🎯",
            title: "Smart Promotions",
            description: "Create targeted campaigns, double-stamp days, and special offers to drive more visits."
        },
        {
            icon: "🔒",
            title: "Fraud Protection",
            description: "Location-based validation and time limits prevent fake stamps and ensure genuine visits."
        },
        {
            icon: "⚡",
            title: "Lightning Fast",
            description: "QR code scanning takes seconds. No app downloads required for customers to start earning."
        },
        {
            icon: "🎮",
            title: "Gamification",
            description: "Multiple stamp tiers, bonus rewards, and achievement systems keep customers engaged."
        }
    ];

    const steps: Step[] = [
        {
            step: "1",
            title: "Setup Your Campaign",
            description: "Create your business profile and configure your stamp card rewards. Set how many stamps customers need for rewards."
        },
        {
            step: "2",
            title: "Display QR Code",
            description: "Print our beautiful QR code cards or show the code on any device. Customers scan to join your loyalty program instantly."
        },
        {
            step: "3",
            title: "Watch Growth Happen",
            description: "Track customer visits, redemptions, and loyalty growth through your dashboard. Watch repeat visits increase automatically."
        }
    ];

    const businesses: Business[] = [
        { icon: "☕", name: "Coffee Shops" },
        { icon: "🍕", name: "Restaurants" },
        { icon: "🥖", name: "Bakeries" },
        { icon: "🍦", name: "Ice Cream Shops" },
        { icon: "🌮", name: "Food Trucks" },
        { icon: "🥗", name: "Health Food" },
        { icon: "🍱", name: "Delis" },
        { icon: "🧁", name: "Dessert Shops" }
    ];

    const pricingPlans: PricingPlan[] = [
        {
            name: "Starter",
            price: "$29",
            popular: false,
            features: [
                "Up to 500 customers",
                "Basic analytics",
                "Email support",
                "QR code generation"
            ],
            buttonText: "Start Free Trial",
            buttonStyle: "secondary"
        },
        {
            name: "Professional",
            price: "$79",
            popular: true,
            features: [
                "Up to 2,000 customers",
                "Advanced analytics",
                "Priority support",
                "Custom promotions",
                "Multiple locations"
            ],
            buttonText: "Start Free Trial",
            buttonStyle: "primary"
        },
        {
            name: "Enterprise",
            price: "$199",
            popular: false,
            features: [
                "Unlimited customers",
                "Full analytics suite",
                "24/7 phone support",
                "API access",
                "White-label options"
            ],
            buttonText: "Contact Sales",
            buttonStyle: "secondary"
        }
    ];

    return (
        <div className={styles.landingPage}>
            {/* Navigation */}
            <nav className={`${styles.navigation} ${isScrolled ? styles.navigationScrolled : ''}`}>
                <div className={styles.navigationContainer}>
                    <div className={styles.navigationContent}>
                        <div className={styles.logo}>
                            Go Out! 🎯
                        </div>

                        {/* Desktop Navigation */}
                        <div className={styles.desktopNav}>
                            <button onClick={() => scrollToSection('features')} className={styles.navLink}>Features</button>
                            <button onClick={() => scrollToSection('how-it-works')} className={styles.navLink}>How It Works</button>
                            <button onClick={() => scrollToSection('pricing')} className={styles.navLink}>Pricing</button>
                            <button onClick={() => scrollToSection('contact')} className={styles.navLink}>Contact</button>
                        </div>

                        <div className={styles.desktopActions}>
                            <button className={styles.signInBtn} onClick={handleSignIn}>Sign In</button>
                            <button className={styles.primaryBtn} onClick={handleStartTrial}>
                                Start Free Trial
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className={styles.mobileMenuBtn}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            ☰
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <div className={styles.mobileMenu}>
                            <div>
                                <button onClick={() => scrollToSection('features')} className={styles.mobileNavLink}>Features</button>
                                <button onClick={() => scrollToSection('how-it-works')} className={styles.mobileNavLink}>How It Works</button>
                                <button onClick={() => scrollToSection('pricing')} className={styles.mobileNavLink}>Pricing</button>
                                <button onClick={() => scrollToSection('contact')} className={styles.mobileNavLink}>Contact</button>
                                <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <button className={styles.signInBtn} onClick={handleSignIn}>Sign In</button>
                                    <button className={styles.primaryBtn} onClick={handleStartTrial}>
                                        Start Free Trial
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContainer}>
                    <h1 className={styles.heroTitle}>
                        Digital Loyalty Cards<br />
                        <span className={styles.heroTitleAccent}>Made Simple</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Transform your physical stamp cards into engaging digital experiences.
                        Increase customer retention and grow your business with zero hassle.
                    </p>
                    <div className={styles.heroActions}>
                        <button className={styles.heroPrimaryBtn} onClick={handleStartTrial}>
                            🚀 Start Free Trial
                        </button>
                        <button className={styles.heroSecondaryBtn}>
                            📱 See Demo
                        </button>
                    </div>
                    <p className={styles.heroNote}>No credit card required • 14-day free trial</p>
                </div>
            </section>

            {/* Stats Section */}
            <section ref={statsRef} className={styles.statsSection}>
                <div className={styles.statsContainer}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={`${styles.statNumber} stats-counter`}>500+</div>
                            <div className={styles.statLabel}>Local Businesses</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={`${styles.statNumber} stats-counter`}>50K+</div>
                            <div className={styles.statLabel}>Active Customers</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={`${styles.statNumber} stats-counter`}>85%</div>
                            <div className={styles.statLabel}>Customer Retention</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={`${styles.statNumber} stats-counter`}>2.5x</div>
                            <div className={styles.statLabel}>Visit Frequency</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem/Solution Section */}
            <section className={styles.problemSolutionSection}>
                <div className={styles.problemSolutionContainer}>
                    <div className={styles.problemSolutionGrid}>
                        <div>
                            <h2 className={styles.sectionTitle}>
                                Tired of Lost Stamp Cards?
                            </h2>
                            <div className={styles.featureList}>
                                <div className={styles.featureItem}>
                                    <span className={styles.featureIcon}>❌</span>
                                    <span>Customers lose physical stamp cards</span>
                                </div>
                                <div className={styles.featureItem}>
                                    <span className={styles.featureIcon}>❌</span>
                                    <span>Staff forgets to stamp cards during busy hours</span>
                                </div>
                                <div className={styles.featureItem}>
                                    <span className={styles.featureIcon}>❌</span>
                                    <span>No data on customer behavior or preferences</span>
                                </div>
                                <div className={styles.featureItem}>
                                    <span className={styles.featureIcon}>❌</span>
                                    <span>Fraudulent stamps and fake cards</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className={styles.sectionTitle}>
                                Go Digital with Go Out!
                            </h2>
                            <div className={styles.featureList}>
                                <div className={styles.featureItem}>
                                    <span className={styles.featureIcon}>✅</span>
                                    <span>Never lose stamps again - stored in the cloud</span>
                                </div>
                                <div className={styles.featureItem}>
                                    <span className={styles.featureIcon}>✅</span>
                                    <span>Simple QR code scanning - fast and reliable</span>
                                </div>
                                <div className={styles.featureItem}>
                                    <span className={styles.featureIcon}>✅</span>
                                    <span>Rich analytics and customer insights</span>
                                </div>
                                <div className={styles.featureItem}>
                                    <span className={styles.featureIcon}>✅</span>
                                    <span>Fraud-proof with location and time validation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className={styles.featuresSection}>
                <div className={styles.featuresContainer}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionHeaderTitle}>
                            Everything You Need to Boost Customer Loyalty
                        </h2>
                        <p className={styles.sectionHeaderSubtitle}>
                            From simple stamp collection to advanced promotions, Go Out! has all the tools to grow your business.
                        </p>
                    </div>

                    <div className={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <div key={index} className={styles.featureCard}>
                                <div className={styles.featureCardIcon}>{feature.icon}</div>
                                <h3 className={styles.featureCardTitle}>{feature.title}</h3>
                                <p className={styles.featureCardDescription}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className={styles.howItWorksSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionHeaderTitle}>
                            Simple Setup, Immediate Results
                        </h2>
                        <p className={styles.sectionHeaderSubtitle}>
                            Get your digital loyalty program running in minutes, not weeks.
                        </p>
                    </div>

                    <div className={styles.stepsGrid}>
                        {steps.map((step, index) => (
                            <div key={index} className={styles.stepItem}>
                                <div className={styles.stepNumber}>
                                    {step.step}
                                </div>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDescription}>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Perfect For Section */}
            <section className={styles.perfectForSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionHeaderTitle}>
                            Perfect for Local Businesses
                        </h2>
                        <p className={styles.sectionHeaderSubtitle}>
                            Designed specifically for dine-in and pickup experiences.
                        </p>
                    </div>

                    <div className={styles.businessGrid}>
                        {businesses.map((business, index) => (
                            <div key={index} className={styles.businessItem}>
                                <div className={styles.businessIcon}>{business.icon}</div>
                                <h3 className={styles.businessName}>{business.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className={styles.pricingSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionHeaderTitle}>
                            Simple, Transparent Pricing
                        </h2>
                        <p className={styles.sectionHeaderSubtitle}>
                            No setup fees, no hidden costs. Just straightforward pricing that grows with your business.
                        </p>
                    </div>

                    <div className={styles.pricingGrid}>
                        {pricingPlans.map((plan, index) => (
                            <div key={index} className={`${styles.pricingCard} ${plan.popular ? styles.pricingCardPopular : ''}`}>
                                {plan.popular && (
                                    <div className={styles.popularBadge}>
                                        Most Popular
                                    </div>
                                )}
                                <h3 className={styles.pricingCardTitle}>{plan.name}</h3>
                                <div className={styles.pricingCardPrice}>
                                    {plan.price}<span className={styles.pricingCardPriceUnit}>/month</span>
                                </div>
                                <ul className={styles.pricingFeatures}>
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className={styles.pricingFeature}>
                                            <span className={styles.pricingFeatureIcon}>✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button className={`${styles.pricingButton} ${plan.buttonStyle === 'primary' ? styles.pricingButtonPrimary : styles.pricingButtonSecondary}`}>
                                    {plan.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className={styles.pricingNote}>
                        <p>All plans include a 14-day free trial. No credit card required to start.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaContainer}>
                    <h2 className={styles.ctaTitle}>
                        Ready to Transform Your Customer Loyalty?
                    </h2>
                    <p className={styles.ctaSubtitle}>
                        Join hundreds of local businesses already growing with Go Out!
                    </p>
                    <div className={styles.ctaActions}>
                        <button className={styles.heroPrimaryBtn}>
                            🚀 Start Your Free Trial
                        </button>
                        <button className={styles.heroSecondaryBtn}>
                            💬 Talk to Sales
                        </button>
                    </div>
                    <p className={styles.ctaNote}>
                        Set up in 5 minutes • No technical skills required • Cancel anytime
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className={styles.footer}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerGrid}>
                        <div>
                            <div className={styles.footerBrand}>Go Out! 🎯</div>
                            <p className={styles.footerDescription}>
                                Making customer loyalty simple and effective for local businesses everywhere.
                            </p>
                        </div>
                        <div>
                            <h3 className={styles.footerSectionTitle}>Product</h3>
                            <ul className={styles.footerLinks}>
                                <li><a href="#" className={styles.footerLink}>Features</a></li>
                                <li><a href="#" className={styles.footerLink}>Pricing</a></li>
                                <li><a href="#" className={styles.footerLink}>API Documentation</a></li>
                                <li><a href="#" className={styles.footerLink}>Integrations</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={styles.footerSectionTitle}>Support</h3>
                            <ul className={styles.footerLinks}>
                                <li><a href="#" className={styles.footerLink}>Help Center</a></li>
                                <li><a href="#" className={styles.footerLink}>Contact Us</a></li>
                                <li><a href="#" className={styles.footerLink}>Status Page</a></li>
                                <li><a href="#" className={styles.footerLink}>Community</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={styles.footerSectionTitle}>Company</h3>
                            <ul className={styles.footerLinks}>
                                <li><a href="#" className={styles.footerLink}>About Us</a></li>
                                <li><a href="#" className={styles.footerLink}>Blog</a></li>
                                <li><a href="#" className={styles.footerLink}>Careers</a></li>
                                <li><a href="#" className={styles.footerLink}>Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.footerBottom}>
                        <p>&copy; 2025 Go Out! All rights reserved. Built for local businesses, by people who care.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;