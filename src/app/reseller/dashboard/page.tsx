'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  BarChart3, 
  Users, 
  Share2, 
  Copy, 
  ExternalLink, 
  TrendingUp, 
  DollarSign, 
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Settings,
  Eye,
  Download,
  Mail,
  Target,
  Award,
  Link,

  Globe,
  Smartphone,
  MousePointer,
  Edit,
  Trash2,
  X,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

interface ReferralLink {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'inactive' | 'expired';
  clicks: number;
  conversions: number;
  earnings: number;
  createdAt: string;
  expiresAt?: string;
  isPublic: boolean;
  platform: 'web' | 'mobile' | 'social';
}

interface DashboardStats {
  totalReferrals: number;
  activeReferrals: number;
  totalClicks: number;
  totalConversions: number;
  totalEarnings: number;
  monthlyEarnings: number;
  conversionRate: number;
  pendingPayouts: number;
  totalLinks: number;
  conversions: number;
  revenue: number;
}

export default function ResellerDashboard() {
  const [activeTab, setActiveTab] = useState('links');
  const [referralLinks, setReferralLinks] = useState<ReferralLink[]>([]);
  const [showCreateLink, setShowCreateLink] = useState(false);
  const [editingLink, setEditingLink] = useState<ReferralLink | null>(null);
  const [deletingLink, setDeletingLink] = useState<ReferralLink | null>(null);
  const [newLink, setNewLink] = useState({
    name: '',
    url: '',
    isPublic: false,
    expiresAt: '',
    platform: 'web' as const
  });

  // Mock data for demonstration
  const dashboardStats: DashboardStats = {
    totalReferrals: 156,
    activeReferrals: 89,
    totalClicks: 2847,
    totalConversions: 234,
    totalEarnings: 28450,
    monthlyEarnings: 4250,
    conversionRate: 12.8,
    pendingPayouts: 1850,
    totalLinks: 10,
    conversions: 234,
    revenue: 28450
  };

  const mockReferralLinks: ReferralLink[] = [
    {
      id: '1',
      name: 'TechCorp Q4 Audit Referral',
      url: 'https://sheetsway.com/ref/techcorp-q4-2024',
      status: 'active',
      clicks: 456,
      conversions: 23,
      earnings: 3450,
      createdAt: '2024-01-15',
      expiresAt: '2024-12-31',
      isPublic: true,
      platform: 'web'
    },
    {
      id: '2',
      name: 'HealthPlus Compliance Referral',
      url: 'https://sheetsway.com/ref/healthplus-2024',
      status: 'active',
      clicks: 234,
      conversions: 12,
      earnings: 1800,
      createdAt: '2024-01-20',
      expiresAt: '2024-12-31',
      isPublic: true,
      platform: 'mobile'
    },
    {
      id: '3',
      name: 'RetailChain Expansion Referral',
      url: 'https://sheetsway.com/ref/retailchain-expansion',
      status: 'inactive',
      clicks: 89,
      conversions: 5,
      earnings: 750,
      createdAt: '2024-01-10',
      expiresAt: '2024-06-30',
      isPublic: false,
      platform: 'social'
    }
  ];

  useEffect(() => {
    setReferralLinks(mockReferralLinks);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'web': return <Globe className="w-4 h-4" />;
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'social': return <Share2 className="w-4 h-4" />;
      default: return <Link className="w-4 h-4" />;
    }
  };

  const handleCreateLink = () => {
    if (!newLink.name || !newLink.url) {
      toast.error('Please fill in all required fields');
      return;
    }

    const link: ReferralLink = {
      id: Date.now().toString(),
      name: newLink.name,
      url: newLink.url,
      status: 'active',
      clicks: 0,
      conversions: 0,
      earnings: 0,
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: newLink.expiresAt || undefined,
      isPublic: newLink.isPublic,
      platform: newLink.platform
    };

    setReferralLinks(prev => [...prev, link]);
    setShowCreateLink(false);
    setNewLink({ name: '', url: '', isPublic: false, expiresAt: '', platform: 'web' });
    toast.success('Referral link created successfully!');
  };

  const handleEditLink = (link: ReferralLink) => {
    setEditingLink({ ...link });
    toast.info(`Editing link: ${link.name}`);
  };

  const handleSaveEdit = () => {
    if (editingLink) {
      setReferralLinks(prev => prev.map(link => 
        link.id === editingLink.id ? editingLink : link
      ));
      setEditingLink(null);
      toast.success('Link updated successfully!');
    }
  };

  const handleDeleteLink = (link: ReferralLink) => {
    setDeletingLink(link);
  };

  const confirmDelete = () => {
    if (deletingLink) {
      setReferralLinks(prev => prev.filter(link => link.id !== deletingLink.id));
      setDeletingLink(null);
      toast.success(`Link "${deletingLink.name}" deleted successfully!`);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Link copied to clipboard!');
  };

  const toggleLinkStatus = (linkId: string) => {
    setReferralLinks(prev => prev.map(link => 
      link.id === linkId 
        ? { ...link, status: link.status === 'active' ? 'inactive' : 'active' }
        : link
    ));
    toast.success('Link status updated!');
  };

  const exportData = () => {
    toast.success('Dashboard data exported successfully!');
  };

  const sendEmail = (email: string) => {
    toast.success(`Email sent to ${email}!`);
  };

  return (
    <div className="flex-1 space-y-6 p-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your referral performance and track earnings
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={exportData}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{dashboardStats.totalReferrals}</div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              +{dashboardStats.activeReferrals} active
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">${dashboardStats.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-green-700 dark:text-green-300">
              +${dashboardStats.monthlyEarnings.toLocaleString()} this month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 dark:border-purple-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-200">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{dashboardStats.conversionRate}%</div>
            <p className="text-xs text-purple-700 dark:text-purple-300">
              {dashboardStats.totalConversions} conversions
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-[rgb(232_132_12/0.05)] dark:bg-[rgb(232_132_12/0.1)] dark:border-[rgb(232_132_12/0.3)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[rgb(232_132_12)] dark:text-[rgb(232_132_12)]">Pending Payouts</CardTitle>
            <Clock className="h-4 w-4 text-[rgb(232_132_12)] dark:text-[rgb(232_132_12)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[rgb(232_132_12)] dark:text-[rgb(232_132_12)]">${dashboardStats.pendingPayouts.toLocaleString()}</div>
            <p className="text-xs text-[rgb(232_132_12)] dark:text-[rgb(232_132_12)]">
              Available for withdrawal
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="links">Referral Links</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>

        {/* Referral Links Tab */}
        <TabsContent value="links" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Referral Links</CardTitle>
                <CardDescription>
                  Manage your referral links and track their performance
                </CardDescription>
              </div>
              <Button onClick={() => setShowCreateLink(true)} className="bg-[rgb(232_132_12)] hover:bg-[rgb(232_132_12/0.8)]">
                <Plus className="w-4 h-4 mr-2" />
                Create Link
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referralLinks.map((link) => (
                  <div key={link.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-[rgb(232_132_12)] dark:hover:border-[rgb(232_132_12)] transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{link.name}</h3>
                        <Badge className={getStatusColor(link.status)}>
                          {link.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          {getPlatformIcon(link.platform)}
                          <span className="text-xs">{link.platform}</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2 break-all">{link.url}</div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MousePointer className="w-4 h-4" />
                          {link.clicks} clicks
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {link.conversions} conversions
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          ${link.earnings.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(link.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleLinkStatus(link.id)}
                        className="border-border hover:border-[rgb(232_132_12)] dark:hover:border-[rgb(232_132_12)]"
                      >
                        {link.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(link.url)}
                        className="border-border hover:border-[rgb(232_132_12)] dark:hover:border-[rgb(232_132_12)]"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditLink(link)}
                        className="border-border hover:border-[rgb(232_132_12)] dark:hover:border-[rgb(232_132_12)]"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteLink(link)}
                        className="border-border hover:border-red-300 dark:hover:border-red-600 text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                Detailed insights into your referral performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2">Click Trends</h4>
                  <div className="text-2xl font-bold text-blue-600">{dashboardStats.totalClicks.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Total clicks across all links</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2">Revenue Growth</h4>
                  <div className="text-2xl font-bold text-green-600">${dashboardStats.revenue.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Total revenue generated</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Activity Tab */}
        <TabsContent value="recent" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest actions and updates in your referral system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">New conversion from TechCorp referral</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">+$450</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">New referral link created</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Payment processed for HealthPlus referral</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Paid</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Link Modal */}
      <Dialog open={showCreateLink} onOpenChange={setShowCreateLink}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Referral Link</DialogTitle>
            <DialogDescription>
              Generate a new referral link to track conversions and earnings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="linkName">Link Name</Label>
              <Input
                id="linkName"
                placeholder="Enter link name"
                value={newLink.name}
                onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="linkUrl">Target URL</Label>
              <Input
                id="linkUrl"
                placeholder="https://example.com"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="platform">Platform</Label>
              <Select value={newLink.platform} onValueChange={(value: any) => setNewLink({ ...newLink, platform: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isPublic"
                checked={newLink.isPublic}
                onCheckedChange={(checked) => setNewLink({ ...newLink, isPublic: checked })}
              />
              <Label htmlFor="isPublic">Public Link</Label>
            </div>
            <div>
              <Label htmlFor="expiresAt">Expiry Date (Optional)</Label>
              <Input
                id="expiresAt"
                type="date"
                value={newLink.expiresAt}
                onChange={(e) => setNewLink({ ...newLink, expiresAt: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateLink(false)}>Cancel</Button>
                            <Button onClick={handleCreateLink} className="bg-[rgb(232_132_12)] hover:bg-[rgb(232_132_12/0.8)]">Create Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Link Modal */}
      <Dialog open={!!editingLink} onOpenChange={() => setEditingLink(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Referral Link</DialogTitle>
            <DialogDescription>
              Update your referral link settings and information
            </DialogDescription>
          </DialogHeader>
          {editingLink && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="editLinkName">Link Name</Label>
                <Input
                  id="editLinkName"
                  value={editingLink.name}
                  onChange={(e) => setEditingLink({ ...editingLink, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="editLinkUrl">Target URL</Label>
                <Input
                  id="editLinkUrl"
                  value={editingLink.url}
                  onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="editPlatform">Platform</Label>
                <Select value={editingLink.platform} onValueChange={(value: any) => setEditingLink({ ...editingLink, platform: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="editIsPublic"
                  checked={editingLink.isPublic}
                  onCheckedChange={(checked) => setEditingLink({ ...editingLink, isPublic: checked })}
                />
                <Label htmlFor="editIsPublic">Public Link</Label>
              </div>
              <div>
                <Label htmlFor="editExpiresAt">Expiry Date</Label>
                <Input
                  id="editExpiresAt"
                  type="date"
                  value={editingLink.expiresAt || ''}
                  onChange={(e) => setEditingLink({ ...editingLink, expiresAt: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingLink(null)}>Cancel</Button>
                            <Button onClick={handleSaveEdit} className="bg-[rgb(232_132_12)] hover:bg-[rgb(232_132_12/0.8)]">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deletingLink} onOpenChange={() => setDeletingLink(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Referral Link</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletingLink?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingLink(null)}>Cancel</Button>
            <Button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
