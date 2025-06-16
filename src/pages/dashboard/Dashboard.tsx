import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import {
    Users,
    Gift,
    MessageSquare,
    Settings,
    BarChart3,
    Search,
    Plus,
    Download,
    Calendar,
    Clock,
    Star,
    TrendingUp,
    Eye,
    Edit,
    Send,
    Filter,
    Menu,
    X,
    Upload,
    Palette,
    Smartphone
} from 'lucide-react';

// Mock data
const mockCustomers = [
    { id: 1, name: 'John Doe', phone: '+1-555-0123', email: 'john@email.com', stamps: 8, rewards: 2, lastVisit: '2025-06-15', signupDate: '2025-01-15' },
    { id: 2, name: 'Jane Smith', phone: '+1-555-0124', email: 'jane@email.com', stamps: 15, rewards: 1, lastVisit: '2025-06-14', signupDate: '2025-02-20' },
    { id: 3, name: 'Mike Johnson', phone: '+1-555-0125', email: 'mike@email.com', stamps: 3, rewards: 0, lastVisit: '2025-06-10', signupDate: '2025-05-01' },
    { id: 4, name: 'Sarah Wilson', phone: '+1-555-0126', email: 'sarah@email.com', stamps: 22, rewards: 3, lastVisit: '2025-06-16', signupDate: '2024-12-10' },
    { id: 5, name: 'David Brown', phone: '+1-555-0127', email: 'david@email.com', stamps: 1, rewards: 0, lastVisit: '2025-06-01', signupDate: '2025-06-01' }
];

const mockAnalytics = {
    totalStamps: { today: 45, week: 312, month: 1248 },
    rewardsRedeemed: { today: 8, week: 62, month: 248 },
    appUsers: { total: 1250, newThisWeek: 28 },
    retentionRate: 68,
    campaignPerformance: { sent: 1200, opened: 840, redeemed: 156 }
};

const mockPromotions = [
    { id: 1, title: 'Weekend Special', message: 'Get 2x stamps this weekend!', sent: 450, opened: 320, redeemed: 78, status: 'active', expiry: '2025-06-20' },
    { id: 2, title: 'Free Coffee Promo', message: 'Buy 5 coffees, get 1 free!', sent: 800, opened: 560, redeemed: 89, status: 'completed', expiry: '2025-06-10' }
];

interface Customer {
    id: number;
    name: string;
    phone: string;
    email: string;
    stamps: number;
    rewards: number;
    lastVisit: string;
    signupDate: string;
}

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('analytics');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [showPromotionModal, setShowPromotionModal] = useState(false);
    const [showCustomizationModal, setShowCustomizationModal] = useState(false);

    // Business customization state
    const [brandSettings, setBrandSettings] = useState({
        businessName: 'Demo Coffee Shop',
        logo: null,
        backgroundColor: '#667eea',
        slogan: 'Collect your stamp card!',
        fontStyle: 'modern'
    });

    const [promotionForm, setPromotionForm] = useState({
        title: '',
        message: '',
        targetAudience: 'all',
        expiry: '',
        schedule: 'immediate'
    });

    const filteredCustomers = mockCustomers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const Sidebar = () => (
        <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
            <div className={styles.sidebarHeader}>
                {isSidebarOpen && <h2>Go Out! Business</h2>}
                <button
                    className={styles.sidebarToggle}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    {isSidebarOpen ? (
                        // Back/Collapse icon when sidebar is open
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    ) : (
                        // Menu/Expand icon when sidebar is closed
                        <Menu size={20} />
                    )}
                </button>
            </div>

            <nav className={styles.sidebarNav}>
                <button
                    className={`${styles.navItem} ${activeTab === 'analytics' ? styles.active : ''}`}
                    onClick={() => setActiveTab('analytics')}
                    title="Analytics"
                >
                    <BarChart3 size={20} />
                    {isSidebarOpen && <span>Analytics</span>}
                </button>
                <button
                    className={`${styles.navItem} ${activeTab === 'customers' ? styles.active : ''}`}
                    onClick={() => setActiveTab('customers')}
                    title="Customers"
                >
                    <Users size={20} />
                    {isSidebarOpen && <span>Customers</span>}
                </button>
                <button
                    className={`${styles.navItem} ${activeTab === 'stamps' ? styles.active : ''}`}
                    onClick={() => setActiveTab('stamps')}
                    title="Stamps & Rewards"
                >
                    <Gift size={20} />
                    {isSidebarOpen && <span>Stamps & Rewards</span>}
                </button>
                <button
                    className={`${styles.navItem} ${activeTab === 'promotions' ? styles.active : ''}`}
                    onClick={() => setActiveTab('promotions')}
                    title="Promotions"
                >
                    <MessageSquare size={20} />
                    {isSidebarOpen && <span>Promotions</span>}
                </button>
                <button
                    className={`${styles.navItem} ${activeTab === 'customization' ? styles.active : ''}`}
                    onClick={() => setActiveTab('customization')}
                    title="Branding"
                >
                    <Palette size={20} />
                    {isSidebarOpen && <span>Branding</span>}
                </button>
                <button
                    className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`}
                    onClick={() => setActiveTab('settings')}
                    title="Settings"
                >
                    <Settings size={20} />
                    {isSidebarOpen && <span>Settings</span>}
                </button>
            </nav>
        </div>
    );

    // Replace your AnalyticsTab component with this fixed version:

    const AnalyticsTab = () => (
        <div className={styles.analyticsTab}>
            <div className={styles.tabHeader}>
                <h1>Analytics Dashboard</h1>
                <button className={styles.exportBtn}>
                    <Download size={16} />
                    Export Report
                </button>
            </div>

            <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                        <h3>Stamps Collected</h3>
                        <TrendingUp className={styles.metricIcon} />
                    </div>
                    <div className={styles.metricValues}>
                        <div className={styles.metricValue}>
                            <span className={styles.value}>{mockAnalytics.totalStamps.today}</span>
                            <span className={styles.label}>Today</span>
                        </div>
                        <div className={styles.metricValue}>
                            <span className={styles.value}>{mockAnalytics.totalStamps.week}</span>
                            <span className={styles.label}>This Week</span>
                        </div>
                        <div className={styles.metricValue}>
                            <span className={styles.value}>{mockAnalytics.totalStamps.month}</span>
                            <span className={styles.label}>This Month</span>
                        </div>
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                        <h3>Rewards Redeemed</h3>
                        <Gift className={styles.metricIcon} />
                    </div>
                    <div className={styles.metricValues}>
                        <div className={styles.metricValue}>
                            <span className={styles.value}>{mockAnalytics.rewardsRedeemed.today}</span>
                            <span className={styles.label}>Today</span>
                        </div>
                        <div className={styles.metricValue}>
                            <span className={styles.value}>{mockAnalytics.rewardsRedeemed.week}</span>
                            <span className={styles.label}>This Week</span>
                        </div>
                        <div className={styles.metricValue}>
                            <span className={styles.value}>{mockAnalytics.rewardsRedeemed.month}</span>
                            <span className={styles.label}>This Month</span>
                        </div>
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                        <h3>App Users</h3>
                        <Users className={styles.metricIcon} />
                    </div>
                    <div className={styles.metricValues}>
                        <div className={styles.metricValue}>
                            <span className={styles.value}>{mockAnalytics.appUsers.total}</span>
                            <span className={styles.label}>Total Users</span>
                        </div>
                        <div className={styles.metricValue}>
                            <span className={styles.value}>{mockAnalytics.appUsers.newThisWeek}</span>
                            <span className={styles.label}>New This Week</span>
                        </div>
                        <div className={styles.metricValue}>
                            <span className={styles.value}>{mockAnalytics.retentionRate}%</span>
                            <span className={styles.label}>Retention Rate</span>
                        </div>
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                        <h3>Campaign Performance</h3>
                        <MessageSquare className={styles.metricIcon} />
                    </div>
                    <div className={styles.metricValues}>
                        <div className={styles.metricValue}>
                            <span className={styles.value}>{mockAnalytics.campaignPerformance.sent}</span>
                            <span className={styles.label}>Messages Sent</span>
                        </div>
                        <div className={styles.metricValue}>
                            <span className={styles.value}>{mockAnalytics.campaignPerformance.opened}</span>
                            <span className={styles.label}>Opened</span>
                        </div>
                        <div className={styles.metricValue}>
                            <span className={styles.value}>{mockAnalytics.campaignPerformance.redeemed}</span>
                            <span className={styles.label}>Redeemed</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.chartsSection}>
                <div className={styles.chartCard}>
                    <h3>Activity Heatmap - High Traffic Times</h3>
                    <div className={styles.heatmap}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} className={styles.heatmapDay}>
                                <span className={styles.dayLabel}>{day}</span>
                                <div className={styles.hourBlocks}>
                                    {Array.from({ length: 24 }, (_, hour) => (
                                        <div
                                            key={hour}
                                            className={`${styles.hourBlock} ${styles[`intensity${Math.floor(Math.random() * 4)}`]}`}
                                            title={`${day} ${hour}:00 - ${Math.floor(Math.random() * 50)} visits`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const CustomersTab = () => (
        <div className={styles.customersTab}>
            <div className={styles.tabHeader}>
                <h1>Customer Management</h1>
                <div className={styles.searchBar}>
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search by name, phone, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.customersList}>
                <div className={styles.customersHeader}>
                    <span>Customer</span>
                    <span>Contact</span>
                    <span>Stamps</span>
                    <span>Rewards</span>
                    <span>Last Visit</span>
                    <span>Actions</span>
                </div>

                {filteredCustomers.map(customer => (
                    <div key={customer.id} className={styles.customerRow}>
                        <div className={styles.customerInfo}>
                            <div className={styles.customerAvatar}>{customer.name.charAt(0)}</div>
                            <div>
                                <div className={styles.customerName}>{customer.name}</div>
                                <div className={styles.customerSignup}>Joined {customer.signupDate}</div>
                            </div>
                        </div>
                        <div className={styles.customerContact}>
                            <div>{customer.phone}</div>
                            <div className={styles.customerEmail}>{customer.email}</div>
                        </div>
                        <div className={styles.customerStamps}>{customer.stamps}</div>
                        <div className={styles.customerRewards}>{customer.rewards}</div>
                        <div className={styles.customerVisit}>{customer.lastVisit}</div>
                        <div className={styles.customerActions}>
                            <button
                                className={`${styles.actionBtn} ${styles.view}`}
                                onClick={() => {
                                    setSelectedCustomer(customer);
                                    setShowCustomerModal(true);
                                }}
                            >
                                <Eye size={14} />
                            </button>
                            <button className={`${styles.actionBtn} ${styles.edit}`}>
                                <Gift size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const StampsTab = () => (
        <div className={styles.stampsTab}>
            <div className={styles.tabHeader}>
                <h1>Stamps & Rewards Management</h1>
            </div>

            <div className={styles.stampsGrid}>
                <div className={styles.stampsCard}>
                    <h3>Stamp Rules</h3>
                    <div className={styles.ruleItem}>
                        <span>Stamps per visit:</span>
                        <input type="number" defaultValue="1" className={styles.ruleInput} />
                    </div>
                    <div className={styles.ruleItem}>
                        <span>Minimum spend for stamp:</span>
                        <input type="number" defaultValue="10" className={styles.ruleInput} />
                        <span>$</span>
                    </div>
                    <div className={styles.ruleItem}>
                        <span>Maximum stamps per visit:</span>
                        <input type="number" defaultValue="5" className={styles.ruleInput} />
                    </div>
                    <button className={styles.saveBtn}>Save Rules</button>
                </div>

                <div className={styles.stampsCard}>
                    <h3>Reward Rules</h3>
                    <div className={styles.ruleItem}>
                        <span>Stamps needed for reward:</span>
                        <input type="number" defaultValue="10" className={styles.ruleInput} />
                    </div>
                    <div className={styles.ruleItem}>
                        <span>Reward type:</span>
                        <select className={styles.ruleSelect}>
                            <option>Free Coffee</option>
                            <option>10% Discount</option>
                            <option>Free Pastry</option>
                            <option>Custom</option>
                        </select>
                    </div>
                    <div className={styles.ruleItem}>
                        <span>Reward value:</span>
                        <input type="number" defaultValue="5" className={styles.ruleInput} />
                        <span>$</span>
                    </div>
                    <button className={styles.saveBtn}>Save Rules</button>
                </div>

                <div className={styles.stampsCard}>
                    <h3>Grant Stamps Manually</h3>
                    <div className={styles.manualGrant}>
                        <div className={styles.searchCustomer}>
                            <input
                                type="text"
                                placeholder="Search customer by phone or email..."
                                className={styles.customerSearch}
                            />
                            <button className={styles.searchBtn}>
                                <Search size={16} />
                            </button>
                        </div>
                        <div className={styles.grantControls}>
                            <label>Number of stamps:</label>
                            <input type="number" defaultValue="1" min="1" max="10" className={styles.stampsInput} />
                            <button className={styles.grantBtn}>Grant Stamps</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const PromotionsTab = () => (
        <div className={styles.promotionsTab}>
            <div className={styles.tabHeader}>
                <h1>Promotions & Campaigns</h1>
                <button
                    className={styles.createBtn}
                    onClick={() => setShowPromotionModal(true)}
                >
                    <Plus size={16} />
                    Create Campaign
                </button>
            </div>

            <div className={styles.promotionsList}>
                {mockPromotions.map(promo => (
                    <div key={promo.id} className={styles.promotionCard}>
                        <div className={styles.promoHeader}>
                            <h3>{promo.title}</h3>
                            <span className={`${styles.status} ${styles[promo.status]}`}>{promo.status}</span>
                        </div>
                        <p className={styles.promoMessage}>{promo.message}</p>
                        <div className={styles.promoStats}>
                            <div className={styles.stat}>
                                <span className={styles.statValue}>{promo.sent}</span>
                                <span className={styles.statLabel}>Sent</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statValue}>{promo.opened}</span>
                                <span className={styles.statLabel}>Opened</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statValue}>{promo.redeemed}</span>
                                <span className={styles.statLabel}>Redeemed</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statValue}>{promo.expiry}</span>
                                <span className={styles.statLabel}>Expires</span>
                            </div>
                        </div>
                        <div className={styles.promoActions}>
                            <button className={`${styles.actionBtn} ${styles.edit}`}>
                                <Edit size={14} />
                                Edit
                            </button>
                            <button className={`${styles.actionBtn} ${styles.view}`}>
                                <Eye size={14} />
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const CustomizationTab = () => (
        <div className={styles.customizationTab}>
            <div className={styles.tabHeader}>
                <h1>Branding & QR Screen Customization</h1>
                <button
                    className={styles.previewBtn}
                    onClick={() => setShowCustomizationModal(true)}
                >
                    <Smartphone size={16} />
                    Preview QR Screen
                </button>
            </div>

            <div className={styles.customizationGrid}>
                <div className={styles.customizationCard}>
                    <h3>Business Profile</h3>
                    <div className={styles.formGroup}>
                        <label>Business Name</label>
                        <input
                            type="text"
                            value={brandSettings.businessName}
                            onChange={(e) => setBrandSettings({ ...brandSettings, businessName: e.target.value })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Logo</label>
                        <div className={styles.fileUpload}>
                            <button className={styles.uploadBtn}>
                                <Upload size={16} />
                                Upload Logo
                            </button>
                            <span>PNG, JPG up to 2MB</span>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Business Hours</label>
                        <input type="text" placeholder="Mon-Fri 8AM-6PM, Sat-Sun 9AM-5PM" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Contact Information</label>
                        <input type="tel" placeholder="Phone number" />
                        <input type="email" placeholder="Email address" />
                    </div>
                </div>

                <div className={styles.customizationCard}>
                    <h3>QR Screen Branding</h3>
                    <div className={styles.formGroup}>
                        <label>Background Color</label>
                        <div className={styles.colorPicker}>
                            <input
                                type="color"
                                value={brandSettings.backgroundColor}
                                onChange={(e) => setBrandSettings({ ...brandSettings, backgroundColor: e.target.value })}
                            />
                            <span>{brandSettings.backgroundColor}</span>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Slogan/Message</label>
                        <input
                            type="text"
                            value={brandSettings.slogan}
                            onChange={(e) => setBrandSettings({ ...brandSettings, slogan: e.target.value })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Font Style</label>
                        <select
                            value={brandSettings.fontStyle}
                            onChange={(e) => setBrandSettings({ ...brandSettings, fontStyle: e.target.value })}
                        >
                            <option value="modern">Modern</option>
                            <option value="classic">Classic</option>
                            <option value="bold">Bold</option>
                            <option value="elegant">Elegant</option>
                        </select>
                    </div>
                    <button className={styles.saveBtn}>Save Branding</button>
                </div>
            </div>
        </div>
    );

    const SettingsTab = () => (
        <div className={styles.settingsTab}>
            <div className={styles.tabHeader}>
                <h1>Account Settings</h1>
            </div>

            <div className={styles.settingsGrid}>
                <div className={styles.settingsCard}>
                    <h3>Business Information</h3>
                    <div className={styles.formGroup}>
                        <label>Business Name</label>
                        <input type="text" defaultValue="Demo Coffee Shop" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Business Address</label>
                        <textarea
                            rows={3}
                            defaultValue="123 Main Street&#10;Los Angeles, CA 90210&#10;United States"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Business Phone</label>
                        <input type="tel" defaultValue="+1-555-0199" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Business Email</label>
                        <input type="email" defaultValue="info@democoffee.com" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Website</label>
                        <input type="url" placeholder="https://www.yourbusiness.com" />
                    </div>
                    <button className={styles.saveBtn}>Update Business Info</button>
                </div>

                <div className={styles.settingsCard}>
                    <h3>Operating Hours</h3>
                    <div className={styles.hoursGrid}>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                            <div key={day} className={styles.hoursRow}>
                                <div className={styles.dayLabel}>{day}</div>
                                <div className={styles.hoursControls}>
                                    <label className={styles.toggleLabel}>
                                        <input
                                            type="checkbox"
                                            defaultChecked={day !== 'Sunday'}
                                        />
                                        <span className={`${styles.toggleSlider} ${styles.small}`}></span>
                                        Open
                                    </label>
                                    <input
                                        type="time"
                                        defaultValue={day === 'Saturday' || day === 'Sunday' ? '09:00' : '08:00'}
                                        className={styles.timeInput}
                                    />
                                    <span>to</span>
                                    <input
                                        type="time"
                                        defaultValue={day === 'Saturday' || day === 'Sunday' ? '17:00' : '18:00'}
                                        className={styles.timeInput}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className={styles.saveBtn}>Update Hours</button>
                </div>

                <div className={styles.settingsCard}>
                    <h3>Holiday Schedule</h3>
                    <div className={styles.holidaySection}>
                        <div className={styles.formGroup}>
                            <label>Add Holiday Closure</label>
                            <div className={styles.holidayForm}>
                                <input type="date" className={styles.holidayDate} />
                                <input type="text" placeholder="Holiday name (e.g., Christmas)" className={styles.holidayName} />
                                <button className={styles.addHolidayBtn}>
                                    <Plus size={14} />
                                    Add
                                </button>
                            </div>
                        </div>
                        <div className={styles.holidaysList}>
                            <div className={styles.holidayItem}>
                                <div className={styles.holidayInfo}>
                                    <span className={styles.holidayDateDisplay}>2025-12-25</span>
                                    <span className={styles.holidayNameDisplay}>Christmas Day</span>
                                </div>
                                <button className={styles.removeHolidayBtn}>
                                    <X size={14} />
                                </button>
                            </div>
                            <div className={styles.holidayItem}>
                                <div className={styles.holidayInfo}>
                                    <span className={styles.holidayDateDisplay}>2025-07-04</span>
                                    <span className={styles.holidayNameDisplay}>Independence Day</span>
                                </div>
                                <button className={styles.removeHolidayBtn}>
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <button className={styles.saveBtn}>Save Holiday Schedule</button>
                </div>

                <div className={styles.settingsCard}>
                    <h3>Account Information</h3>
                    <div className={styles.formGroup}>
                        <label>Owner Email</label>
                        <input type="email" defaultValue="owner@democoffee.com" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Owner Phone</label>
                        <input type="tel" defaultValue="+1-555-0100" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" />
                    </div>
                    <button className={styles.saveBtn}>Update Account</button>
                </div>

                <div className={styles.settingsCard}>
                    <h3>Security</h3>
                    <div className={styles.securityOption}>
                        <label className={styles.toggleLabel}>
                            <input type="checkbox" />
                            <span className={styles.toggleSlider}></span>
                            Enable Two-Factor Authentication
                        </label>
                    </div>
                    <div className={styles.securityOption}>
                        <label className={styles.toggleLabel}>
                            <input type="checkbox" defaultChecked />
                            <span className={styles.toggleSlider}></span>
                            Login notifications
                        </label>
                    </div>
                    <button className={styles.saveBtn}>Update Security</button>
                </div>

                <div className={styles.settingsCard}>
                    <h3>Notifications</h3>
                    <div className={styles.notificationOption}>
                        <label className={styles.toggleLabel}>
                            <input type="checkbox" defaultChecked />
                            <span className={styles.toggleSlider}></span>
                            New customer alerts
                        </label>
                    </div>
                    <div className={styles.notificationOption}>
                        <label className={styles.toggleLabel}>
                            <input type="checkbox" defaultChecked />
                            <span className={styles.toggleSlider}></span>
                            Daily summary reports
                        </label>
                    </div>
                    <div className={styles.notificationOption}>
                        <label className={styles.toggleLabel}>
                            <input type="checkbox" />
                            <span className={styles.toggleSlider}></span>
                            Reward redemption alerts
                        </label>
                    </div>
                    <button className={styles.saveBtn}>Save Preferences</button>
                </div>
            </div>
        </div>
    );

    // Modals
    const CustomerModal = () => (
        showCustomerModal && selectedCustomer && (
            <div className={styles.modalOverlay} onClick={() => setShowCustomerModal(false)}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.modalHeader}>
                        <h2>Customer Profile</h2>
                        <button onClick={() => setShowCustomerModal(false)}>
                            <X size={20} />
                        </button>
                    </div>
                    <div className={styles.modalContent}>
                        <div className={styles.customerProfile}>
                            <div className={styles.profileAvatar}>{selectedCustomer.name.charAt(0)}</div>
                            <div className={styles.profileInfo}>
                                <h3>{selectedCustomer.name}</h3>
                                <p>{selectedCustomer.email}</p>
                                <p>{selectedCustomer.phone}</p>
                            </div>
                        </div>
                        <div className={styles.profileStats}>
                            <div className={styles.statBox}>
                                <span className={styles.statValue}>{selectedCustomer.stamps}</span>
                                <span className={styles.statLabel}>Total Stamps</span>
                            </div>
                            <div className={styles.statBox}>
                                <span className={styles.statValue}>{selectedCustomer.rewards}</span>
                                <span className={styles.statLabel}>Rewards Redeemed</span>
                            </div>
                            <div className={styles.statBox}>
                                <span className={styles.statValue}>{selectedCustomer.lastVisit}</span>
                                <span className={styles.statLabel}>Last Visit</span>
                            </div>
                            <div className={styles.statBox}>
                                <span className={styles.statValue}>{selectedCustomer.signupDate}</span>
                                <span className={styles.statLabel}>Member Since</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

    const PromotionModal = () => (
        showPromotionModal && (
            <div className={styles.modalOverlay} onClick={() => setShowPromotionModal(false)}>
                <div className={`${styles.modal} ${styles.large}`} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.modalHeader}>
                        <h2>Create New Campaign</h2>
                        <button onClick={() => setShowPromotionModal(false)}>
                            <X size={20} />
                        </button>
                    </div>
                    <div className={styles.modalContent}>
                        <div className={styles.formGroup}>
                            <label>Campaign Title</label>
                            <input
                                type="text"
                                value={promotionForm.title}
                                onChange={(e) => setPromotionForm({ ...promotionForm, title: e.target.value })}
                                placeholder="e.g., Weekend Special"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Message</label>
                            <textarea
                                value={promotionForm.message}
                                onChange={(e) => setPromotionForm({ ...promotionForm, message: e.target.value })}
                                placeholder="Enter your promotional message..."
                                rows={3}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Target Audience</label>
                            <select
                                value={promotionForm.targetAudience}
                                onChange={(e) => setPromotionForm({ ...promotionForm, targetAudience: e.target.value })}
                            >
                                <option value="all">All Customers</option>
                                <option value="frequent">Frequent Visitors</option>
                                <option value="inactive">Inactive Users</option>
                                <option value="new">New Customers</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Expiry Date</label>
                            <input
                                type="date"
                                value={promotionForm.expiry}
                                onChange={(e) => setPromotionForm({ ...promotionForm, expiry: e.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Schedule</label>
                            <select
                                value={promotionForm.schedule}
                                onChange={(e) => setPromotionForm({ ...promotionForm, schedule: e.target.value })}
                            >
                                <option value="immediate">Send Immediately</option>
                                <option value="scheduled">Schedule for Later</option>
                            </select>
                        </div>
                        <div className={styles.modalActions}>
                            <button className={styles.cancelBtn} onClick={() => setShowPromotionModal(false)}>
                                Cancel
                            </button>
                            <button className={styles.sendBtn}>
                                <Send size={16} />
                                Create Campaign
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

    const CustomizationModal = () => (
        showCustomizationModal && (
            <div className={styles.modalOverlay} onClick={() => setShowCustomizationModal(false)}>
                <div className={`${styles.modal} ${styles.large}`} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.modalHeader}>
                        <h2>QR Screen Preview</h2>
                        <button onClick={() => setShowCustomizationModal(false)}>
                            <X size={20} />
                        </button>
                    </div>
                    <div className={styles.modalContent}>
                        <div className={styles.previewContainer}>
                            <div
                                className={styles.qrScreenPreview}
                                style={{
                                    background: `linear-gradient(135deg, ${brandSettings.backgroundColor} 0%, ${brandSettings.backgroundColor}dd 100%)`,
                                    fontFamily: brandSettings.fontStyle === 'modern' ? '-apple-system, BlinkMacSystemFont, sans-serif' :
                                        brandSettings.fontStyle === 'classic' ? 'Georgia, serif' :
                                            brandSettings.fontStyle === 'bold' ? 'Impact, sans-serif' :
                                                'Playfair Display, serif'
                                }}
                            >
                                <div className={styles.previewContent}>
                                    <div className={styles.previewGiftIcon}>🎁</div>
                                    <h1>{brandSettings.slogan}</h1>
                                    <p>Download the {brandSettings.businessName} app to start earning rewards.</p>
                                    <div className={styles.previewDownloadQrs}>
                                        <div className={styles.previewDownloadQr}>
                                            <div className={styles.previewMiniQr}>📱</div>
                                            <span>App Store</span>
                                        </div>
                                        <div className={styles.previewDownloadQr}>
                                            <div className={styles.previewMiniQr}>🤖</div>
                                            <span>Google Play</span>
                                        </div>
                                    </div>
                                    <div className={styles.previewTapInstruction}>
                                        <p>📱 Tap anywhere to issue a stamp</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

    return (
        <div className={styles.dashboardContainer}>
            <Sidebar />
            <main className={`${styles.mainContent} ${isSidebarOpen ? '' : styles.expanded}`}>
                {activeTab === 'analytics' && <AnalyticsTab />}
                {activeTab === 'customers' && <CustomersTab />}
                {activeTab === 'stamps' && <StampsTab />}
                {activeTab === 'promotions' && <PromotionsTab />}
                {activeTab === 'customization' && <CustomizationTab />}
                {activeTab === 'settings' && <SettingsTab />}
            </main>

            {/* Modals */}
            <CustomerModal />
            <PromotionModal />
            <CustomizationModal />
        </div>
    );
};

export default Dashboard;