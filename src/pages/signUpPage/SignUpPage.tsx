import React, { useState } from 'react';
import styles from './SignUpPage.module.css';
import { useNavigate } from 'react-router-dom';

interface FormData {
    // Business Information
    businessName: string;
    businessType: string;
    businessAddress: string;
    businessCity: string;
    businessState: string;
    businessZip: string;
    businessPhone: string;
    businessWebsite: string;

    // Owner Information
    ownerName: string;
    ownerEmail: string;
    ownerPassword: string;
    confirmPassword: string;

    // Business Hours
    businessHours: {
        [key: string]: {
            open: string;
            close: string;
            isOpen: boolean;
        };
    };

    // Agreements
    termsAccepted: boolean;
    marketingOptIn: boolean;
}

interface FormErrors {
    [key: string]: string;
}

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const [formData, setFormData] = useState<FormData>({
        businessName: '',
        businessType: '',
        businessAddress: '',
        businessCity: '',
        businessState: '',
        businessZip: '',
        businessPhone: '',
        businessWebsite: '',
        ownerName: '',
        ownerEmail: '',
        ownerPassword: '',
        confirmPassword: '',
        businessHours: {
            monday: { open: '09:00', close: '17:00', isOpen: true },
            tuesday: { open: '09:00', close: '17:00', isOpen: true },
            wednesday: { open: '09:00', close: '17:00', isOpen: true },
            thursday: { open: '09:00', close: '17:00', isOpen: true },
            friday: { open: '09:00', close: '17:00', isOpen: true },
            saturday: { open: '10:00', close: '16:00', isOpen: true },
            sunday: { open: '10:00', close: '16:00', isOpen: false }
        },
        termsAccepted: false,
        marketingOptIn: false
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const businessTypes = [
        'Restaurant',
        'Coffee Shop',
        'Bakery',
        'Food Truck',
        'Ice Cream Shop',
        'Deli',
        'Fast Food',
        'Pizza Place',
        'Bar/Pub',
        'Dessert Shop',
        'Health Food Store',
        'Other Food Service'
    ];

    const days = [
        { key: 'monday', label: 'Monday' },
        { key: 'tuesday', label: 'Tuesday' },
        { key: 'wednesday', label: 'Wednesday' },
        { key: 'thursday', label: 'Thursday' },
        { key: 'friday', label: 'Friday' },
        { key: 'saturday', label: 'Saturday' },
        { key: 'sunday', label: 'Sunday' }
    ];

    const handleInputChange = (field: keyof FormData, value: any): void => {
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

    const handleBusinessHoursChange = (day: string, field: 'open' | 'close' | 'isOpen', value: string | boolean): void => {
        setFormData(prev => ({
            ...prev,
            businessHours: {
                ...prev.businessHours,
                [day]: {
                    ...prev.businessHours[day],
                    [field]: value
                }
            }
        }));
    };

    const validateStep = (step: number): boolean => {
        const newErrors: FormErrors = {};

        if (step === 1) {
            // Business Information Validation
            if (!formData.businessName.trim()) {
                newErrors.businessName = 'Business name is required';
            }
            if (!formData.businessType) {
                newErrors.businessType = 'Please select a business type';
            }
            if (!formData.businessAddress.trim()) {
                newErrors.businessAddress = 'Business address is required';
            }
            if (!formData.businessCity.trim()) {
                newErrors.businessCity = 'City is required';
            }
            if (!formData.businessState.trim()) {
                newErrors.businessState = 'State is required';
            }
            if (!formData.businessZip.trim()) {
                newErrors.businessZip = 'ZIP code is required';
            } else if (!/^\d{5}(-\d{4})?$/.test(formData.businessZip)) {
                newErrors.businessZip = 'Please enter a valid ZIP code';
            }
            if (!formData.businessPhone.trim()) {
                newErrors.businessPhone = 'Phone number is required';
            } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.businessPhone)) {
                newErrors.businessPhone = 'Please enter a valid phone number';
            }
        }

        if (step === 2) {
            // Owner Information Validation
            if (!formData.ownerName.trim()) {
                newErrors.ownerName = 'Your name is required';
            }
            if (!formData.ownerEmail.trim()) {
                newErrors.ownerEmail = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.ownerEmail)) {
                newErrors.ownerEmail = 'Please enter a valid email address';
            }
            if (!formData.ownerPassword) {
                newErrors.ownerPassword = 'Password is required';
            } else if (formData.ownerPassword.length < 8) {
                newErrors.ownerPassword = 'Password must be at least 8 characters';
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.ownerPassword)) {
                newErrors.ownerPassword = 'Password must contain uppercase, lowercase, and number';
            }
            if (formData.ownerPassword !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        if (step === 4) {
            // Final validation
            if (!formData.termsAccepted) {
                newErrors.termsAccepted = 'You must accept the terms and conditions';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = (): void => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrevious = (): void => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async (): Promise<void> => {
        if (!validateStep(4)) return;

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Here you would make the actual API call
            console.log('Form submitted:', formData);

            // Redirect to success page or dashboard
            alert('Account created successfully! Welcome to Go Out!');
        } catch (error) {
            console.error('Signup error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderProgressBar = (): React.ReactElement => (
        <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
                {[1, 2, 3, 4].map((step) => (
                    <div key={step} className={styles.progressStep}>
                        <div className={`${styles.progressCircle} ${currentStep >= step ? styles.progressActive : ''}`}>
                            {currentStep > step ? '✓' : step}
                        </div>
                        {step < 4 && <div className={`${styles.progressLine} ${currentStep > step ? styles.progressActive : ''}`} />}
                    </div>
                ))}
            </div>
            <div className={styles.progressLabels}>
                <span className={currentStep >= 1 ? styles.progressLabelActive : ''}>Business Info</span>
                <span className={currentStep >= 2 ? styles.progressLabelActive : ''}>Account Setup</span>
                <span className={currentStep >= 3 ? styles.progressLabelActive : ''}>Business Hours</span>
                <span className={currentStep >= 4 ? styles.progressLabelActive : ''}>Review</span>
            </div>
        </div>
    );

    const renderStep1 = (): React.ReactElement => (
        <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Tell us about your business</h2>
            <p className={styles.stepSubtitle}>We need some basic information to get you started</p>

            <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Business Name *</label>
                    <input
                        type="text"
                        className={`${styles.input} ${errors.businessName ? styles.inputError : ''}`}
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        placeholder="Joe's Coffee Shop"
                    />
                    {errors.businessName && <span className={styles.errorText}>{errors.businessName}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Business Type *</label>
                    <select
                        className={`${styles.select} ${errors.businessType ? styles.inputError : ''}`}
                        value={formData.businessType}
                        onChange={(e) => handleInputChange('businessType', e.target.value)}
                    >
                        <option value="">Select business type</option>
                        {businessTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    {errors.businessType && <span className={styles.errorText}>{errors.businessType}</span>}
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Business Address *</label>
                    <input
                        type="text"
                        className={`${styles.input} ${errors.businessAddress ? styles.inputError : ''}`}
                        value={formData.businessAddress}
                        onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                        placeholder="123 Main Street"
                    />
                    {errors.businessAddress && <span className={styles.errorText}>{errors.businessAddress}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>City *</label>
                    <input
                        type="text"
                        className={`${styles.input} ${errors.businessCity ? styles.inputError : ''}`}
                        value={formData.businessCity}
                        onChange={(e) => handleInputChange('businessCity', e.target.value)}
                        placeholder="Los Angeles"
                    />
                    {errors.businessCity && <span className={styles.errorText}>{errors.businessCity}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>State *</label>
                    <input
                        type="text"
                        className={`${styles.input} ${errors.businessState ? styles.inputError : ''}`}
                        value={formData.businessState}
                        onChange={(e) => handleInputChange('businessState', e.target.value)}
                        placeholder="CA"
                    />
                    {errors.businessState && <span className={styles.errorText}>{errors.businessState}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>ZIP Code *</label>
                    <input
                        type="text"
                        className={`${styles.input} ${errors.businessZip ? styles.inputError : ''}`}
                        value={formData.businessZip}
                        onChange={(e) => handleInputChange('businessZip', e.target.value)}
                        placeholder="90210"
                    />
                    {errors.businessZip && <span className={styles.errorText}>{errors.businessZip}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Phone Number *</label>
                    <input
                        type="tel"
                        className={`${styles.input} ${errors.businessPhone ? styles.inputError : ''}`}
                        value={formData.businessPhone}
                        onChange={(e) => handleInputChange('businessPhone', e.target.value)}
                        placeholder="(555) 123-4567"
                    />
                    {errors.businessPhone && <span className={styles.errorText}>{errors.businessPhone}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Website (Optional)</label>
                    <input
                        type="url"
                        className={styles.input}
                        value={formData.businessWebsite}
                        onChange={(e) => handleInputChange('businessWebsite', e.target.value)}
                        placeholder="https://joescoffee.com"
                    />
                </div>
            </div>
        </div>
    );

    const renderStep2 = (): React.ReactElement => (
        <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Create your account</h2>
            <p className={styles.stepSubtitle}>Set up your login credentials</p>

            <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Your Full Name *</label>
                    <input
                        type="text"
                        className={`${styles.input} ${errors.ownerName ? styles.inputError : ''}`}
                        value={formData.ownerName}
                        onChange={(e) => handleInputChange('ownerName', e.target.value)}
                        placeholder="John Smith"
                    />
                    {errors.ownerName && <span className={styles.errorText}>{errors.ownerName}</span>}
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Email Address *</label>
                    <input
                        type="email"
                        className={`${styles.input} ${errors.ownerEmail ? styles.inputError : ''}`}
                        value={formData.ownerEmail}
                        onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                        placeholder="john@joescoffee.com"
                    />
                    {errors.ownerEmail && <span className={styles.errorText}>{errors.ownerEmail}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Password *</label>
                    <div className={styles.passwordField}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className={`${styles.input} ${errors.ownerPassword ? styles.inputError : ''}`}
                            value={formData.ownerPassword}
                            onChange={(e) => handleInputChange('ownerPassword', e.target.value)}
                            placeholder="Create a strong password"
                        />
                        <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>
                    {errors.ownerPassword && <span className={styles.errorText}>{errors.ownerPassword}</span>}
                    <div className={styles.passwordRequirements}>
                        <p>Password must contain:</p>
                        <ul>
                            <li className={formData.ownerPassword.length >= 8 ? styles.requirementMet : ''}>
                                At least 8 characters
                            </li>
                            <li className={/[A-Z]/.test(formData.ownerPassword) ? styles.requirementMet : ''}>
                                One uppercase letter
                            </li>
                            <li className={/[a-z]/.test(formData.ownerPassword) ? styles.requirementMet : ''}>
                                One lowercase letter
                            </li>
                            <li className={/\d/.test(formData.ownerPassword) ? styles.requirementMet : ''}>
                                One number
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Confirm Password *</label>
                    <div className={styles.passwordField}>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            placeholder="Confirm your password"
                        />
                        <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>
                    {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
                </div>
            </div>

            <div className={styles.authAlternative}>
                <div className={styles.divider}>
                    <span>Or sign up with</span>
                </div>
                <div className={styles.socialButtons}>
                    <button className={styles.socialButton}>
                        <span className={styles.socialIcon}>🔵</span>
                        Google
                    </button>
                    <button className={styles.socialButton}>
                        <span className={styles.socialIcon}>🔷</span>
                        Microsoft
                    </button>
                </div>
            </div>
        </div>
    );

    const renderStep3 = (): React.ReactElement => (
        <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Set your business hours</h2>
            <p className={styles.stepSubtitle}>When are you open for stamp collection?</p>

            <div className={styles.businessHours}>
                {days.map((day) => (
                    <div key={day.key} className={styles.dayRow}>
                        <div className={styles.dayToggle}>
                            <input
                                type="checkbox"
                                id={`${day.key}-toggle`}
                                checked={formData.businessHours[day.key].isOpen}
                                onChange={(e) => handleBusinessHoursChange(day.key, 'isOpen', e.target.checked)}
                                className={styles.checkbox}
                            />
                            <label htmlFor={`${day.key}-toggle`} className={styles.dayLabel}>
                                {day.label}
                            </label>
                        </div>

                        {formData.businessHours[day.key].isOpen ? (
                            <div className={styles.timeInputs}>
                                <input
                                    type="time"
                                    value={formData.businessHours[day.key].open}
                                    onChange={(e) => handleBusinessHoursChange(day.key, 'open', e.target.value)}
                                    className={styles.timeInput}
                                />
                                <span className={styles.timeSeparator}>to</span>
                                <input
                                    type="time"
                                    value={formData.businessHours[day.key].close}
                                    onChange={(e) => handleBusinessHoursChange(day.key, 'close', e.target.value)}
                                    className={styles.timeInput}
                                />
                            </div>
                        ) : (
                            <span className={styles.closedLabel}>Closed</span>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.hoursNote}>
                <p>💡 <strong>Note:</strong> Customers can only collect stamps during these hours. You can always change these later in your dashboard.</p>
            </div>
        </div>
    );

    const renderStep4 = (): React.ReactElement => (
        <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Review and confirm</h2>
            <p className={styles.stepSubtitle}>Please review your information before creating your account</p>

            <div className={styles.reviewSections}>
                <div className={styles.reviewSection}>
                    <h3 className={styles.reviewSectionTitle}>Business Information</h3>
                    <div className={styles.reviewItem}>
                        <strong>{formData.businessName}</strong> - {formData.businessType}
                    </div>
                    <div className={styles.reviewItem}>
                        {formData.businessAddress}, {formData.businessCity}, {formData.businessState} {formData.businessZip}
                    </div>
                    <div className={styles.reviewItem}>
                        📞 {formData.businessPhone}
                    </div>
                    {formData.businessWebsite && (
                        <div className={styles.reviewItem}>
                            🌐 {formData.businessWebsite}
                        </div>
                    )}
                </div>

                <div className={styles.reviewSection}>
                    <h3 className={styles.reviewSectionTitle}>Account Details</h3>
                    <div className={styles.reviewItem}>
                        <strong>{formData.ownerName}</strong>
                    </div>
                    <div className={styles.reviewItem}>
                        📧 {formData.ownerEmail}
                    </div>
                </div>

                <div className={styles.reviewSection}>
                    <h3 className={styles.reviewSectionTitle}>Business Hours</h3>
                    <div className={styles.hoursReview}>
                        {days.map((day) => (
                            <div key={day.key} className={styles.hourItem}>
                                <span className={styles.dayName}>{day.label}:</span>
                                <span className={styles.dayHours}>
                                    {formData.businessHours[day.key].isOpen
                                        ? `${formData.businessHours[day.key].open} - ${formData.businessHours[day.key].close}`
                                        : 'Closed'
                                    }
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.agreements}>
                <div className={styles.checkboxGroup}>
                    <input
                        type="checkbox"
                        id="terms"
                        checked={formData.termsAccepted}
                        onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                        className={`${styles.checkbox} ${errors.termsAccepted ? styles.checkboxError : ''}`}
                    />
                    <label htmlFor="terms" className={styles.checkboxLabel}>
                        I agree to the <a href="#" className={styles.link}>Terms of Service</a> and <a href="#" className={styles.link}>Privacy Policy</a> *
                    </label>
                </div>
                {errors.termsAccepted && <span className={styles.errorText}>{errors.termsAccepted}</span>}

                <div className={styles.checkboxGroup}>
                    <input
                        type="checkbox"
                        id="marketing"
                        checked={formData.marketingOptIn}
                        onChange={(e) => handleInputChange('marketingOptIn', e.target.checked)}
                        className={styles.checkbox}
                    />
                    <label htmlFor="marketing" className={styles.checkboxLabel}>
                        I'd like to receive marketing emails about Go Out! features and tips
                    </label>
                </div>
            </div>
        </div>
    );

    const renderCurrentStep = (): React.ReactElement => {
        switch (currentStep) {
            case 1:
                return renderStep1();
            case 2:
                return renderStep2();
            case 3:
                return renderStep3();
            case 4:
                return renderStep4();
            default:
                return renderStep1();
        }
    };
    const handleSignUpSuccess = () => navigate('/dashboard');
    const handleSwitchToSignIn = () => navigate('/signin');

    return (
        <div className={styles.signupPage}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.logo}>Go Out! 🎯</div>
                    <div className={styles.headerText}>
                        <h1 className={styles.title}>Join Go Out!</h1>
                        <p className={styles.subtitle}>Start building customer loyalty in minutes</p>
                    </div>
                </div>

                {renderProgressBar()}

                <div className={styles.formContainer}>
                    {renderCurrentStep()}

                    <div className={styles.actions}>
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={handlePrevious}
                                className={styles.secondaryButton}
                                disabled={isLoading}
                            >
                                Previous
                            </button>
                        )}

                        {currentStep < 4 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className={styles.primaryButton}
                            >
                                Continue
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className={styles.primaryButton}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className={styles.spinner}></span>
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        )}
                    </div>
                </div>

                <div className={styles.footer}>
                    <p>
                        Already have an account?{' '}
                        <button onClick={handleSwitchToSignIn} className={styles.link}>
                            Sign in here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;