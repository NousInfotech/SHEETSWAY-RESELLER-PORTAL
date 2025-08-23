'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Calendar,
  DollarSign,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface Referral {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  commission: number;
  createdAt: string;
  lastContact: string;
  phone?: string;
  notes?: string;
}

export default function ReferralsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [referrals, setReferrals] = useState<Referral[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@techcorp.com',
      company: 'TechCorp Solutions',
      status: 'approved',
      commission: 1500,
      createdAt: '2024-01-15',
      lastContact: '2024-01-20',
      phone: '+1 (555) 123-4567',
      notes: 'High-value client, interested in enterprise solutions'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@healthplus.com',
      company: 'HealthPlus Inc',
      status: 'pending',
      commission: 2200,
      createdAt: '2024-01-18',
      lastContact: '2024-01-19',
      phone: '+1 (555) 987-6543',
      notes: 'Healthcare sector, needs compliance features'
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@retailchain.com',
      company: 'RetailChain Corp',
      status: 'completed',
      commission: 3200,
      createdAt: '2024-01-10',
      lastContact: '2024-01-25',
      phone: '+1 (555) 456-7890',
      notes: 'Retail expansion project, successful implementation'
    }
  ]);

  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [editingReferral, setEditingReferral] = useState<Referral | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = referral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || referral.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalCommission = referrals.reduce((sum, referral) => sum + referral.commission, 0);
  const pendingReferrals = referrals.filter(r => r.status === 'pending').length;

  // View referral
  const handleView = (referral: Referral) => {
    setSelectedReferral(referral);
    setViewModalOpen(true);
    toast.success(`Viewing details for ${referral.name}`);
  };

  // Edit referral
  const handleEdit = (referral: Referral) => {
    setEditingReferral({ ...referral });
    setEditModalOpen(true);
    toast.info(`Editing referral: ${referral.name}`);
  };

  // Save edited referral
  const handleSaveEdit = () => {
    if (editingReferral) {
      setReferrals(prev => prev.map(ref => 
        ref.id === editingReferral.id ? editingReferral : ref
      ));
      setEditModalOpen(false);
      setEditingReferral(null);
      toast.success(`Referral updated successfully: ${editingReferral.name}`);
    }
  };

  // Delete referral
  const handleDelete = (referral: Referral) => {
    setSelectedReferral(referral);
    setDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (selectedReferral) {
      setReferrals(prev => prev.filter(ref => ref.id !== selectedReferral.id));
      setDeleteModalOpen(false);
      setSelectedReferral(null);
      toast.success(`Referral deleted successfully: ${selectedReferral.name}`);
    }
  };

  // Add new referral
  const handleAddReferral = () => {
    const newReferral: Referral = {
      id: Date.now().toString(),
      name: 'New Referral',
      email: 'new@example.com',
      company: 'New Company',
      status: 'pending',
      commission: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
      phone: '',
      notes: ''
    };
    setEditingReferral(newReferral);
    setEditModalOpen(true);
    toast.info('Adding new referral');
  };

  return (
    <div className="flex-1 space-y-6 p-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Referrals</h1>
          <p className="text-muted-foreground">
            Manage your client referrals and track commissions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="bg-[rgb(232_132_12)] hover:bg-[rgb(232_132_12/0.8)]" onClick={handleAddReferral}>
            <Plus className="w-4 h-4 mr-2" />
            Add Referral
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{referrals.length}</div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Active referrals
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">Total Commission</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">${totalCommission.toLocaleString()}</div>
            <p className="text-xs text-green-700 dark:text-blue-300">
              Potential earnings
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 dark:border-yellow-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Pending</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{pendingReferrals}</div>
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              Awaiting approval
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search referrals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-border focus:border-[rgb(232_132_12)] dark:focus:border-[rgb(232_132_12)]"
              />
            </div>
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
                <option value="rejected">Rejected</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referrals List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Referral List</CardTitle>
          <CardDescription>
            Manage and track your client referrals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReferrals.map((referral) => (
              <div key={referral.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-[rgb(232_132_12)] dark:hover:border-[rgb(232_132_12)] transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{referral.name}</h3>
                    <Badge className={getStatusColor(referral.status)}>
                      {referral.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">{referral.email}</div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {referral.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      ${referral.commission.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(referral.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:border-[rgb(232_132_12)] dark:hover:border-[rgb(232_132_12)]"
                    onClick={() => handleView(referral)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:border-[rgb(232_132_12)] dark:hover:border-[rgb(232_132_12)]"
                    onClick={() => handleEdit(referral)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:border-red-300 dark:hover:border-red-600 text-red-600 dark:text-red-400"
                    onClick={() => handleDelete(referral)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredReferrals.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p>No referrals found matching your criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Referral Details</DialogTitle>
            <DialogDescription>
              View complete information for this referral
            </DialogDescription>
          </DialogHeader>
          {selectedReferral && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <p className="text-sm text-muted-foreground">{selectedReferral.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-muted-foreground">{selectedReferral.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Company</Label>
                  <p className="text-sm text-muted-foreground">{selectedReferral.company}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm text-muted-foreground">{selectedReferral.phone || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={getStatusColor(selectedReferral.status)}>
                    {selectedReferral.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Commission</Label>
                  <p className="text-sm text-muted-foreground">${selectedReferral.commission.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Created Date</Label>
                  <p className="text-sm text-muted-foreground">{new Date(selectedReferral.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Contact</Label>
                  <p className="text-sm text-muted-foreground">{new Date(selectedReferral.lastContact).toLocaleDateString()}</p>
                </div>
              </div>
              {selectedReferral.notes && (
                <div>
                  <Label className="text-sm font-medium">Notes</Label>
                  <p className="text-sm text-muted-foreground">{selectedReferral.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingReferral?.id === Date.now().toString() ? 'Add New Referral' : 'Edit Referral'}</DialogTitle>
            <DialogDescription>
              {editingReferral?.id === Date.now().toString() ? 'Create a new referral entry' : 'Update referral information'}
            </DialogDescription>
          </DialogHeader>
          {editingReferral && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editingReferral.name}
                    onChange={(e) => setEditingReferral({ ...editingReferral, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editingReferral.email}
                    onChange={(e) => setEditingReferral({ ...editingReferral, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={editingReferral.company}
                    onChange={(e) => setEditingReferral({ ...editingReferral, company: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={editingReferral.phone || ''}
                    onChange={(e) => setEditingReferral({ ...editingReferral, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={editingReferral.status}
                    onChange={(e) => setEditingReferral({ ...editingReferral, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="commission">Commission</Label>
                  <Input
                    id="commission"
                    type="number"
                    value={editingReferral.commission}
                    onChange={(e) => setEditingReferral({ ...editingReferral, commission: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={editingReferral.notes || ''}
                  onChange={(e) => setEditingReferral({ ...editingReferral, notes: e.target.value })}
                  placeholder="Add any additional notes..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setEditModalOpen(false);
              setEditingReferral(null);
            }}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the referral for{' '}
              <span className="font-semibold">{selectedReferral?.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
