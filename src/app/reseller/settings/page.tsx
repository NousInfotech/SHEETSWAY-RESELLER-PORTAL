'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Palette,
  Save,
  Download,
  Upload,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Info,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';
import { toast } from 'sonner';

interface ProfileSettings {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  bio: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  newReferrals: boolean;
  commissionUpdates: boolean;
  paymentReminders: boolean;
  marketingEmails: boolean;
}

interface PaymentSettings {
  paymentMethod: string;
  autoPayout: boolean;
  payoutThreshold: number;
  taxId: string;
  bankAccount: string;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  loginNotifications: boolean;
  passwordChangeNotifications: boolean;
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Solutions Inc',
    position: 'Senior Consultant',
    address: '123 Business Ave',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'United States',
    bio: 'Experienced business consultant specializing in audit and compliance services.'
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newReferrals: true,
    commissionUpdates: true,
    paymentReminders: true,
    marketingEmails: false
  });

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    paymentMethod: 'bank',
    autoPayout: true,
    payoutThreshold: 100,
    taxId: '12-3456789',
    bankAccount: '****1234'
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: 30,
    loginNotifications: true,
    passwordChangeNotifications: true
  });

  // Form states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Save profile settings
  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    toast.success('Profile settings saved successfully!');
  };

  // Save notification settings
  const handleSaveNotifications = () => {
    toast.success('Notification preferences updated!');
  };

  // Save payment settings
  const handleSavePayment = () => {
    setIsEditingPayment(false);
    toast.success('Payment settings saved successfully!');
  };

  // Save security settings
  const handleSaveSecurity = () => {
    toast.success('Security settings updated!');
  };

  // Change password
  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    toast.success('Password changed successfully!');
  };

  // Export data
  const handleExportData = () => {
    toast.success('Data export started! You will receive an email when ready.');
  };

  // Import data
  const handleImportData = () => {
    toast.info('Please select a file to import');
  };

  // Toggle 2FA
  const handleToggle2FA = () => {
    if (!securitySettings.twoFactorAuth) {
      toast.info('Setting up two-factor authentication...');
    } else {
      toast.info('Disabling two-factor authentication...');
    }
    setSecuritySettings(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }));
  };

  // Update payout threshold
  const handlePayoutThresholdChange = (value: string) => {
    const threshold = parseFloat(value) || 0;
    setPaymentSettings(prev => ({ ...prev, payoutThreshold: threshold }));
  };

  return (
    <div className="flex-1 space-y-6 p-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and security settings
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" onClick={handleImportData}>
            <Upload className="w-4 h-4 mr-2" />
            Import Data
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
              </CardDescription>
              </div>
              <Button 
                variant={isEditingProfile ? "default" : "outline"}
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className={isEditingProfile ? "bg-[rgb(232_132_12)] hover:bg-[rgb(232_132_12/0.8)]" : ""}
              >
                {isEditingProfile ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                {isEditingProfile ? "Save" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profileSettings.firstName}
                    onChange={(e) => setProfileSettings({ ...profileSettings, firstName: e.target.value })}
                    disabled={!isEditingProfile}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileSettings.lastName}
                    onChange={(e) => setProfileSettings({ ...profileSettings, lastName: e.target.value })}
                    disabled={!isEditingProfile}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileSettings.email}
                    onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                    disabled={!isEditingProfile}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileSettings.phone}
                    onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
                    disabled={!isEditingProfile}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profileSettings.company}
                    onChange={(e) => setProfileSettings({ ...profileSettings, company: e.target.value })}
                    disabled={!isEditingProfile}
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={profileSettings.position}
                    onChange={(e) => setProfileSettings({ ...profileSettings, position: e.target.value })}
                    disabled={!isEditingProfile}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={profileSettings.address}
                  onChange={(e) => setProfileSettings({ ...profileSettings, address: e.target.value })}
                  disabled={!isEditingProfile}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profileSettings.city}
                    onChange={(e) => setProfileSettings({ ...profileSettings, city: e.target.value })}
                    disabled={!isEditingProfile}
                    />
                  </div>
                <div>
                  <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={profileSettings.state}
                    onChange={(e) => setProfileSettings({ ...profileSettings, state: e.target.value })}
                    disabled={!isEditingProfile}
                    />
                  </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={profileSettings.zipCode}
                    onChange={(e) => setProfileSettings({ ...profileSettings, zipCode: e.target.value })}
                    disabled={!isEditingProfile}
                    />
                  </div>
              </div>
              
              <div>
                <Label htmlFor="country">Country</Label>
                <Select 
                  value={profileSettings.country} 
                  onValueChange={(value) => setProfileSettings({ ...profileSettings, country: value })}
                  disabled={!isEditingProfile}
                >
                  <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileSettings.bio}
                  onChange={(e) => setProfileSettings({ ...profileSettings, bio: e.target.value })}
                  disabled={!isEditingProfile}
                  rows={4}
                />
              </div>

              {isEditingProfile && (
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile} className="bg-[rgb(232_132_12)] hover:bg-[rgb(232_132_12/0.8)]">
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Password Change Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your account password for enhanced security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              
              <Button onClick={handleChangePassword} className="bg-[rgb(232_132_12)] hover:bg-[rgb(232_132_12/0.8)]">
                Change Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how and when you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">General Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailNotifications: checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, smsNotifications: checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications in the app</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, pushNotifications: checked })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Business Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Referrals</Label>
                      <p className="text-sm text-muted-foreground">Get notified about new referral opportunities</p>
                    </div>
                    <Switch
                      checked={notificationSettings.newReferrals}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, newReferrals: checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Commission Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified about commission changes</p>
                    </div>
                    <Switch
                      checked={notificationSettings.commissionUpdates}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, commissionUpdates: checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Payment Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get reminded about pending payments</p>
                    </div>
                    <Switch
                      checked={notificationSettings.paymentReminders}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, paymentReminders: checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive promotional and marketing content</p>
                    </div>
                    <Switch
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, marketingEmails: checked })}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveNotifications} className="bg-[rgb(232_132_12)] hover:bg-[rgb(232_132_12/0.8)]">
                  Save Preferences
                </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Tab */}
        <TabsContent value="payment" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>
                Manage your payment methods and payout preferences
              </CardDescription>
              </div>
              <Button 
                variant={isEditingPayment ? "default" : "outline"}
                onClick={() => setIsEditingPayment(!isEditingPayment)}
                className={isEditingPayment ? "bg-[rgb(232_132_12)] hover:bg-[rgb(232_132_12/0.8)]" : ""}
              >
                {isEditingPayment ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                {isEditingPayment ? "Save" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="paymentMethod">Preferred Payment Method</Label>
                  <Select 
                    value={paymentSettings.paymentMethod} 
                    onValueChange={(value) => setPaymentSettings({ ...paymentSettings, paymentMethod: value })}
                    disabled={!isEditingPayment}
                  >
                    <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Payout</Label>
                    <p className="text-sm text-muted-foreground">Automatically pay out when threshold is reached</p>
                    </div>
                    <Switch
                      checked={paymentSettings.autoPayout}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, autoPayout: checked })}
                    disabled={!isEditingPayment}
                    />
                  </div>
                
                <div>
                  <Label htmlFor="payoutThreshold">Payout Threshold ($)</Label>
                    <Input
                    id="payoutThreshold"
                      type="number"
                      value={paymentSettings.payoutThreshold}
                    onChange={(e) => handlePayoutThresholdChange(e.target.value)}
                    disabled={!isEditingPayment}
                    min="0"
                    step="10"
                  />
              </div>

                <div>
                  <Label htmlFor="taxId">Tax ID / SSN</Label>
                    <Input
                    id="taxId"
                      value={paymentSettings.taxId}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, taxId: e.target.value })}
                    disabled={!isEditingPayment}
                    placeholder="Enter your tax identification number"
                    />
                  </div>
                
                <div>
                  <Label htmlFor="bankAccount">Bank Account</Label>
                    <Input
                    id="bankAccount"
                      value={paymentSettings.bankAccount}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, bankAccount: e.target.value })}
                    disabled={!isEditingPayment}
                    placeholder="Enter your bank account details"
                  />
                </div>
              </div>

              {isEditingPayment && (
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditingPayment(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSavePayment} className="bg-[rgb(232_132_12)] hover:bg-[rgb(232_132_12/0.8)]">
                    Save Changes
                </Button>
              </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Enhance your account security with advanced features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={handleToggle2FA}
                    />
                  </div>
                
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Select 
                    value={securitySettings.sessionTimeout.toString()} 
                    onValueChange={(value) => setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                  </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Login Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified about new login attempts</p>
                  </div>
                  <Switch
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, loginNotifications: checked })}
                  />
              </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Password Change Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when your password is changed</p>
                  </div>
                  <Switch
                    checked={securitySettings.passwordChangeNotifications}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, passwordChangeNotifications: checked })}
                  />
                </div>
              </div>
              
              <Button onClick={handleSaveSecurity} className="bg-[rgb(232_132_12)] hover:bg-[rgb(232_132_12/0.8)]">
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
