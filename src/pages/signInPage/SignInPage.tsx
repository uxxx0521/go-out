import React, { useState } from 'react';
import styles from './SignInPage.module.css';
import { useNavigate } from 'react-router-dom';

interface SignInFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

interface FormErrors {
    [key: string]: string;
}

const SignInPage: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState<SignInFormData>({
        email: '',
        password: '',
        rememberMe: false
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const handleInputChange = (field: keyof SignInFormData, value: string | boolean): void => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (): Promise<void> => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Here you would make the actual API call
            console.log('Sign in attempt:', {
                email: formData.email,
                rememberMe: formData.rememberMe
            });

            // Handle successful sign in
            if (handleSignInSuccess) {
                handleSignInSuccess();
            } else {
                alert('Sign in successful! Redirecting to dashboard...');
            }

        } catch (error) {
            console.error('Sign in error:', error);
            setErrors({
                general: 'Invalid email or password. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialSignIn = (provider: string): void => {
        console.log(`Sign in with ${provider}`);
        // Implement social sign in logic here
    };

    const handleSwitchToSignUp = () => navigate('/signup');
    const handleForgotPassword = () => navigate('/forgot-password');
    const handleSignInSuccess = () => navigate('/dashboard');

    return (
        <div className={styles.signinPage}>
            <div className={styles.container}>
                <div className={styles.signinCard}>
                    {/* Header */}
                    <div className={styles.header}>
                        <div className={styles.logo}>Go Out! 🎯</div>
                        <h1 className={styles.title}>Welcome back</h1>
                        <p className={styles.subtitle}>Sign in to your Go Out! account</p>
                    </div>

                    {/* Social Sign In */}
                    <div className={styles.socialSection}>
                        <button
                            type="button"
                            onClick={() => handleSocialSignIn('Google')}
                            className={styles.socialButton}
                        >
                            <span className={styles.socialIcon}>🔵</span>
                            Continue with Google
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSocialSignIn('Microsoft')}
                            className={styles.socialButton}
                        >
                            <span className={styles.socialIcon}>🔷</span>
                            Continue with Microsoft
                        </button>
                    </div>

                    {/* Divider */}
                    <div className={styles.divider}>
                        <span>Or sign in with email</span>
                    </div>

                    {/* Sign In Form */}
                    <div className={styles.form}>
                        {errors.general && (
                            <div className={styles.generalError}>
                                {errors.general}
                            </div>
                        )}

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="Enter your email"
                                disabled={isLoading}
                            />
                            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.label}>
                                Password
                            </label>
                            <div className={styles.passwordField}>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    placeholder="Enter your password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className={styles.passwordToggle}
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className={styles.formOptions}>
                            <div className={styles.checkboxGroup}>
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                                    className={styles.checkbox}
                                    disabled={isLoading}
                                />
                                <label htmlFor="rememberMe" className={styles.checkboxLabel}>
                                    Remember me
                                </label>
                            </div>
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className={styles.forgotPassword}
                                disabled={isLoading}
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className={styles.submitButton}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className={styles.spinner}></span>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className={styles.signupPrompt}>
                        <p>
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={handleSwitchToSignUp}
                                className={styles.signupLink}
                                disabled={isLoading}
                            >
                                Sign up for free
                            </button>
                        </p>
                    </div>
                </div>

                {/* Features Preview */}
                <div className={styles.featuresPreview}>
                    <h2 className={styles.featuresTitle}>Why businesses love Go Out!</h2>
                    <div className={styles.featuresList}>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>📱</div>
                            <div className={styles.featureContent}>
                                <h3>Digital Stamp Cards</h3>
                                <p>No more lost physical cards. Everything stored securely in the cloud.</p>
                            </div>
                        </div>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>📊</div>
                            <div className={styles.featureContent}>
                                <h3>Customer Analytics</h3>
                                <p>Track visits, popular times, and customer behavior patterns.</p>
                            </div>
                        </div>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>🔒</div>
                            <div className={styles.featureContent}>
                                <h3>Fraud Protection</h3>
                                <p>Location-based validation ensures stamps are collected at your business.</p>
                            </div>
                        </div>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>⚡</div>
                            <div className={styles.featureContent}>
                                <h3>Lightning Fast</h3>
                                <p>QR code scanning takes seconds. No app downloads required for customers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;