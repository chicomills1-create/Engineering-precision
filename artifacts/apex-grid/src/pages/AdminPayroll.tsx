import React, { useState } from 'react';
import { Show } from '@clerk/react';
import { Redirect } from 'wouter';
import { AdminNav } from '@/components/layout/AdminNav';
import {
  useListPayrollPlans,
  useCreatePayrollPlan,
  useCreatePayrollEntry,
  useUpdatePayrollInstallment,
  useListClientJobsForReview,
  getListPayrollPlansQueryKey,
  PayrollPlan,
  ClientJob,
  PayrollEntryRole,
  PayrollEntryCompensationType,
  PayrollInstallmentStatus,
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, ChevronDown, Check, Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
const formatCurrency = (value: number | null | undefined) => {
  if (value == null) return '$0.00';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const formatPercent = (value: number | null | undefined) => {
  if (value == null) return '0%';
  return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value / 100);
};

const ROLE_LABELS: Record<string, string> = {
  [PayrollEntryRole.ceo]: 'CEO',
  [PayrollEntryRole.pe_stamp]: 'PE Stamp',
  [PayrollEntryRole.engineer]: 'Engineer',
  [PayrollEntryRole.operations_manager]: 'Operations Manager',
  [PayrollEntryRole.other]: 'Other',
};

export default function AdminPayroll() {
  return (
    <>
      <Show when="signed-in">
        <div className="container mx-auto px-4 md:px-8 py-16 min-h-[70vh]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Employee Portal</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold">Payroll Plans</h1>
              <p className="text-sm text-muted-foreground mt-2">
                Job compensation allocations, revenue splits, and installment tracking.
              </p>
            </div>
            <CreatePlanDialog />
          </div>
          
          <AdminNav />

          <PayrollDashboard />
        </div>
      </Show>
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
    </>
  );
}

function PayrollDashboard() {
  const { data: plans, isLoading, error } = useListPayrollPlans();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 border border-destructive/20 bg-destructive/10 text-destructive rounded-sm">
        Failed to load payroll plans.
      </div>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <div className="text-center py-24 border border-dashed border-border rounded-sm bg-card/50">
        <p className="text-muted-foreground mb-4">No payroll plans have been created yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {plans.map((plan) => (
        <PayrollPlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}

function CreatePlanDialog() {
  const [open, setOpen] = useState(false);
  const { data: jobs } = useListClientJobsForReview();
  const createPlan = useCreatePayrollPlan();
  const qc = useQueryClient();
  const { toast } = useToast();

  const [jobId, setJobId] = useState<string>('');
  const [revenue, setRevenue] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobId || !revenue) return;

    createPlan.mutate(
      { data: { jobId: Number(jobId), contractRevenue: Number(revenue), notes } },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: getListPayrollPlansQueryKey() });
          setOpen(false);
          toast({ title: 'Plan created successfully' });
          setJobId('');
          setRevenue('');
          setNotes('');
        },
        onError: () => {
          toast({ title: 'Failed to create plan', variant: 'destructive' });
        }
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Payroll Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Client Job</Label>
            <Select value={jobId} onValueChange={setJobId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a job" />
              </SelectTrigger>
              <SelectContent>
                {jobs?.map(job => (
                  <SelectItem key={job.id} value={String(job.id)}>
                    {job.companyName || job.submitterName} - {job.projectType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Contract Revenue ($)</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={revenue}
              onChange={e => setRevenue(e.target.value)}
              placeholder="e.g. 50000"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Notes (Optional)</Label>
            <Textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Internal notes about this plan..."
              className="resize-none"
              rows={3}
            />
          </div>
          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={createPlan.isPending}>
              {createPlan.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Create Plan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function PayrollPlanCard({ plan }: { plan: PayrollPlan }) {
  const percentAllocated = plan.contractRevenue > 0 
    ? (plan.allocatedTotal / plan.contractRevenue) * 100 
    : 0;

  return (
    <div className="border border-border bg-card rounded-sm overflow-hidden flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/20 flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold text-lg">{plan.clientName}</h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-sm uppercase tracking-wider font-medium">
              {plan.jobTitle}
            </span>
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-sm uppercase tracking-wider font-medium border",
              plan.status === 'active' ? "bg-green-500/10 text-green-500 border-green-500/20" :
               plan.status === 'complete' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
              "bg-muted text-muted-foreground border-border"
            )}>
              {plan.status}
            </span>
          </div>
          {plan.notes && <p className="text-sm text-muted-foreground mt-1">{plan.notes}</p>}
        </div>
        
        <div className="flex gap-8 text-sm font-mono bg-background p-3 rounded border border-border">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs font-sans uppercase tracking-wider mb-1">Revenue</span>
            <span className="text-foreground font-medium">{formatCurrency(plan.contractRevenue)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs font-sans uppercase tracking-wider mb-1">Allocated</span>
            <span className="text-foreground">{formatCurrency(plan.allocatedTotal)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs font-sans uppercase tracking-wider mb-1">Remaining</span>
            <span className={cn(
              "font-medium",
              plan.remainingRevenue < 0 ? "text-destructive" : "text-green-500"
            )}>
              {formatCurrency(plan.remainingRevenue)}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full bg-muted overflow-hidden">
        <div 
          className={cn(
            "h-full transition-all duration-500",
            percentAllocated > 100 ? "bg-destructive" : "bg-primary"
          )}
          style={{ width: `${Math.min(percentAllocated, 100)}%` }}
        />
      </div>

      {/* Entries Table */}
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/30 text-muted-foreground uppercase tracking-wider text-[10px] font-semibold border-b border-border">
            <tr>
              <th className="px-4 py-3 font-medium">Role & Payee</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium text-right">Rate</th>
              <th className="px-4 py-3 font-medium text-right">Total</th>
              <th className="px-4 py-3 font-medium">Installments</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {plan.entries.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  No payroll entries yet.
                </td>
              </tr>
            ) : (
              plan.entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-4 py-3 align-top">
                    <div className="font-medium text-foreground">{ROLE_LABELS[entry.role] || entry.role}</div>
                    <div className="text-muted-foreground mt-0.5">{entry.payeeName}</div>
                    {entry.payeeEmail && <div className="text-xs text-muted-foreground opacity-75">{entry.payeeEmail}</div>}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span className="capitalize">{entry.compensationType}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono align-top text-muted-foreground">
                    {entry.compensationType === 'fixed' 
                      ? formatCurrency(entry.agreedTotal)
                      : formatPercent(entry.percentage)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-medium align-top">
                    {formatCurrency(entry.totalAmount)}
                  </td>
                  <td className="px-4 py-3 align-top min-w-[300px]">
                    <div className="flex flex-col gap-2">
                      {entry.installments.map((inst, idx) => (
                        <div key={inst.id} className="flex items-center justify-between gap-4 text-xs p-2 rounded bg-muted/20 border border-border/50">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{inst.label}</span>
                            <span className="text-muted-foreground font-mono">{formatPercent(inst.percentage)}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono">{formatCurrency(inst.amount)}</span>
                            <InstallmentStatusSelect installmentId={inst.id} currentStatus={inst.status} planId={plan.id} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-border bg-muted/10 flex justify-end">
        <CreateEntryDialog plan={plan} />
      </div>
    </div>
  );
}

function InstallmentStatusSelect({ installmentId, currentStatus, planId }: { installmentId: number, currentStatus: string, planId: number }) {
  const updateStatus = useUpdatePayrollInstallment();
  const qc = useQueryClient();

  const handleStatusChange = (newStatus: string) => {
    updateStatus.mutate(
      { 
        id: installmentId, 
        data: { status: newStatus as any } 
      },
      {
        onSuccess: (updatedPlan) => {
          qc.setQueryData(getListPayrollPlansQueryKey(), (old: any) => {
            if (!old) return old;
            return old.map((p: any) => p.id === planId ? updatedPlan : p);
          });
        }
      }
    );
  };

  const statusColors: Record<string, string> = {
    [PayrollInstallmentStatus.planned]: 'text-muted-foreground bg-muted/50 border-border',
    [PayrollInstallmentStatus.due]: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
    [PayrollInstallmentStatus.paid]: 'text-green-500 bg-green-500/10 border-green-500/20',
  };

  const statusIcons: Record<string, React.ReactNode> = {
    [PayrollInstallmentStatus.planned]: <Calendar className="w-3 h-3" />,
    [PayrollInstallmentStatus.due]: <Clock className="w-3 h-3" />,
    [PayrollInstallmentStatus.paid]: <Check className="w-3 h-3" />,
  };

  return (
    <Select value={currentStatus} onValueChange={handleStatusChange} disabled={updateStatus.isPending}>
      <SelectTrigger className={cn(
        "h-6 text-xs px-2 border w-[100px]",
        statusColors[currentStatus]
      )}>
        <div className="flex items-center gap-1.5 uppercase font-medium tracking-wider text-[10px]">
          {updateStatus.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : statusIcons[currentStatus]}
          {currentStatus}
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={PayrollInstallmentStatus.planned}>Planned</SelectItem>
        <SelectItem value={PayrollInstallmentStatus.due}>Due</SelectItem>
        <SelectItem value={PayrollInstallmentStatus.paid}>Paid</SelectItem>
      </SelectContent>
    </Select>
  );
}

function CreateEntryDialog({ plan }: { plan: PayrollPlan }) {
  const [open, setOpen] = useState(false);
  const createEntry = useCreatePayrollEntry();
  const qc = useQueryClient();
  const { toast } = useToast();

  const [role, setRole] = useState<string>(PayrollEntryRole.engineer);
  const [payeeName, setPayeeName] = useState('');
  const [payeeEmail, setPayeeEmail] = useState('');
  const [compensationType, setCompensationType] = useState<string>(PayrollEntryCompensationType.percentage);
  const [amountOrPercent, setAmountOrPercent] = useState('');
  
  // Quick splits
  type Split = { label: string; percentage: number };
  const [installments, setInstallments] = useState<Split[]>([
    { label: 'Completion', percentage: 100 }
  ]);

  const applySplit = (preset: '100' | '50/50' | '25/75' | '33/33/34') => {
    switch (preset) {
      case '100':
        setInstallments([{ label: 'Completion', percentage: 100 }]);
        break;
      case '50/50':
        setInstallments([
          { label: '50% Deposit', percentage: 50 },
          { label: '50% Completion', percentage: 50 }
        ]);
        break;
      case '25/75':
        setInstallments([
          { label: '25% Deposit', percentage: 25 },
          { label: '75% Completion', percentage: 75 }
        ]);
        break;
      case '33/33/34':
        setInstallments([
          { label: '33% Deposit', percentage: 33 },
          { label: '33% Milestone', percentage: 33 },
          { label: '34% Completion', percentage: 34 }
        ]);
        break;
    }
  };

  const handleAddInstallment = () => {
    setInstallments([...installments, { label: 'New Installment', percentage: 0 }]);
  };

  const updateInstallment = (index: number, field: keyof Split, value: string | number) => {
    const updated = [...installments];
    updated[index] = { ...updated[index], [field]: value };
    setInstallments(updated);
  };

  const removeInstallment = (index: number) => {
    setInstallments(installments.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const val = Number(amountOrPercent);
    if (isNaN(val) || val <= 0) {
      toast({ title: 'Invalid amount or percentage', variant: 'destructive' });
      return;
    }

    const totalPercent = installments.reduce((acc, curr) => acc + Number(curr.percentage), 0);
    if (Math.abs(totalPercent - 100) > 0.1) {
      toast({ title: 'Installments must sum to 100%', variant: 'destructive' });
      return;
    }

    createEntry.mutate(
      {
        id: plan.id,
        data: {
          role: role as any,
          payeeName,
          payeeEmail: payeeEmail || undefined,
          compensationType: compensationType as any,
          agreedTotal: compensationType === 'fixed' ? val : undefined,
          percentage: compensationType === 'percentage' ? val : undefined,
          installments: installments.map(i => ({
            label: i.label,
            percentage: Number(i.percentage)
          }))
        }
      },
      {
        onSuccess: (updatedPlan) => {
          qc.setQueryData(getListPayrollPlansQueryKey(), (old: any) => {
            if (!old) return old;
            return old.map((p: any) => p.id === plan.id ? updatedPlan : p);
          });
          setOpen(false);
          toast({ title: 'Entry added successfully' });
          // reset
          setRole(PayrollEntryRole.engineer);
          setPayeeName('');
          setPayeeEmail('');
          setAmountOrPercent('');
          setInstallments([{ label: 'Completion', percentage: 100 }]);
        },
        onError: () => {
          toast({ title: 'Failed to add entry', variant: 'destructive' });
        }
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Pay Line
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Payroll Line</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ROLE_LABELS).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Payee Name</Label>
              <Input value={payeeName} onChange={e => setPayeeName(e.target.value)} required placeholder="John Doe" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Payee Email (Optional)</Label>
            <Input type="email" value={payeeEmail} onChange={e => setPayeeEmail(e.target.value)} placeholder="john@example.com" />
          </div>

          <div className="p-4 bg-muted/20 border border-border rounded-sm space-y-4">
            <h4 className="font-medium text-sm">Compensation</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={compensationType} onValueChange={setCompensationType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PayrollEntryCompensationType.percentage}>Percentage of Revenue</SelectItem>
                    <SelectItem value={PayrollEntryCompensationType.fixed}>Fixed Dollar Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{compensationType === 'fixed' ? 'Total Amount ($)' : 'Percentage (%)'}</Label>
                <Input 
                  type="number" 
                  step="0.01" 
                  min="0"
                  max={compensationType === 'percentage' ? 100 : undefined}
                  value={amountOrPercent} 
                  onChange={e => setAmountOrPercent(e.target.value)} 
                  required 
                  placeholder={compensationType === 'percentage' ? 'e.g. 15' : 'e.g. 5000'}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Installment Schedule</h4>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" className="h-7 text-xs px-2" onClick={() => applySplit('100')}>100%</Button>
                <Button type="button" variant="outline" size="sm" className="h-7 text-xs px-2" onClick={() => applySplit('50/50')}>50/50</Button>
                <Button type="button" variant="outline" size="sm" className="h-7 text-xs px-2" onClick={() => applySplit('25/75')}>25/75</Button>
              </div>
            </div>

            <div className="space-y-2">
              {installments.map((inst, idx) => (
                <div key={idx} className="flex gap-2 items-end">
                  <div className="flex-1 space-y-1">
                    {idx === 0 && <Label className="text-xs">Label</Label>}
                    <Input value={inst.label} onChange={e => updateInstallment(idx, 'label', e.target.value)} required />
                  </div>
                  <div className="w-24 space-y-1">
                    {idx === 0 && <Label className="text-xs">% of Total</Label>}
                    <Input type="number" step="0.01" value={inst.percentage} onChange={e => updateInstallment(idx, 'percentage', e.target.value)} required />
                  </div>
                  {installments.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" className="mb-0.5 text-destructive shrink-0" onClick={() => removeInstallment(idx)}>
                      &times;
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button type="button" variant="ghost" size="sm" onClick={handleAddInstallment} className="text-xs text-muted-foreground w-full border border-dashed border-border mt-2">
              <Plus className="w-3 h-3 mr-1" /> Add Installment Split
            </Button>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <Button type="submit" disabled={createEntry.isPending}>
              {createEntry.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Save Pay Line
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
