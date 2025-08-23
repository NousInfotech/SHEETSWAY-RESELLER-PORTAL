'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Download,
  Filter,
  Eye,
  CreditCard,
  Banknote,
  Wallet,
  Target
} from 'lucide-react';
import { toast } from 'sonner';

interface Earning {
  id: string;
  referralName: string;
  company: string;
  amount: number;
  commission: number;
  status: 'pending' | 'approved' | 'paid';
  date: string;
  paymentMethod: string;
  notes?: string;
  invoiceNumber?: string;
}

export default function EarningsPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [earnings] = useState<Earning[]>([
    {
      id: '1',
      referralName: 'TechCorp Solutions',
      company: 'TechCorp Inc',
      amount: 8500,
      commission: 1275,
      status: 'paid',
      date: '2024-01-25',
      paymentMethod: 'Bank Transfer',
      notes: 'Q4 audit project completed successfully',
      invoiceNumber: 'INV-2024-001'
    },
    {
      id: '2',
      referralName: 'HealthPlus Medical',
      company: 'HealthPlus Inc',
      amount: 12000,
      commission: 1800,
      status: 'approved',
      date: '2024-01-28',
      paymentMethod: 'PayPal',
      notes: 'Healthcare compliance review',
      invoiceNumber: 'INV-2024-002'
    },
    {
      id: '3',
      referralName: 'RetailChain Stores',
      company: 'RetailChain Corp',
      amount: 6500,
      commission: 975,
      status: 'pending',
      date: '2024-01-30',
      paymentMethod: 'Bank Transfer',
      notes: 'Retail expansion consultation',
      invoiceNumber: 'INV-2024-003'
    }
  ]);

  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedEarning, setSelectedEarning] = useState<Earning | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'approved': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const filteredEarnings = earnings.filter(earning => {
    const matchesFilter = filterStatus === 'all' || earning.status === filterStatus;
    return matchesFilter;
  });

  const totalEarnings = earnings.reduce((sum, earning) => sum + earning.commission, 0);
  const pendingEarnings = earnings.filter(e => e.status === 'pending').reduce((sum, earning) => sum + earning.commission, 0);
  const paidEarnings = earnings.filter(e => e.status === 'paid').reduce((sum, earning) => sum + earning.commission, 0);

  // View earning details
  const handleView = (earning: Earning) => {
    setSelectedEarning(earning);
    setViewModalOpen(true);
    toast.success(`Viewing details for ${earning.referralName}`);
  };

  const exportEarnings = () => {
    toast.success('Earnings report exported successfully!');
  };

  return (
    <div className="flex-1 space-y-6 p-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Earnings</h1>
          <p className="text-muted-foreground">
            Track your commissions and payment history
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={exportEarnings}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">${totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-green-700 dark:text-green-300">
              All time earnings
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-200">Paid Out</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">${paidEarnings.toLocaleString()}</div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Successfully paid
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 dark:border-yellow-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Pending</CardTitle>
            <Wallet className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">${pendingEarnings.toLocaleString()}</div>
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              Awaiting payment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-[rgb(232_132_12)] dark:focus:border-[rgb(232_132_12)]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-[rgb(232_132_12)] dark:focus:border-[rgb(232_132_12)]"
              >
                <option value="all">All Time</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="this-year">This Year</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Earnings History */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Earnings History</CardTitle>
          <CardDescription>
            Track your commission payments and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEarnings.map((earning) => (
              <div key={earning.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-[rgb(232_132_12)] dark:hover:border-[rgb(232_132_12)] transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{earning.referralName}</h3>
                    <Badge className={getStatusColor(earning.status)}>
                      {earning.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">{earning.company}</div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      Project: ${earning.amount.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      Commission: ${earning.commission.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(earning.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <CreditCard className="w-4 h-4" />
                      {earning.paymentMethod}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:border-[rgb(232_132_12)] dark:hover:border-[rgb(232_132_12)]"
                    onClick={() => handleView(earning)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredEarnings.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <DollarSign className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p>No earnings found matching your criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View Earning Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Earning Details</DialogTitle>
            <DialogDescription>
              View complete information for this earning
            </DialogDescription>
          </DialogHeader>
          {selectedEarning && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Referral Name</Label>
                  <p className="text-sm text-muted-foreground">{selectedEarning.referralName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Company</Label>
                  <p className="text-sm text-muted-foreground">{selectedEarning.company}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Project Amount</Label>
                  <p className="text-sm text-muted-foreground">${selectedEarning.amount.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Commission</Label>
                  <p className="text-sm text-muted-foreground">${selectedEarning.commission.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={getStatusColor(selectedEarning.status)}>
                    {selectedEarning.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Date</Label>
                  <p className="text-sm text-muted-foreground">{new Date(selectedEarning.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Payment Method</Label>
                  <p className="text-sm text-muted-foreground">{selectedEarning.paymentMethod}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Invoice Number</Label>
                  <p className="text-sm text-muted-foreground">{selectedEarning.invoiceNumber || 'N/A'}</p>
                </div>
              </div>
              {selectedEarning.notes && (
                <div>
                  <Label className="text-sm font-medium">Notes</Label>
                  <p className="text-sm text-muted-foreground">{selectedEarning.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
