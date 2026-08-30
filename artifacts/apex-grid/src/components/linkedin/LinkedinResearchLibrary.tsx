import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { 
  useListLinkedinPeople, 
  useListLinkedinCompanies, 
  useListLinkedinSignals,
  useCreateLinkedinPerson,
  useCreateLinkedinCompany,
  useCreateLinkedinSignal,
  usePrepareLinkedinAction,
  getListLinkedinActionsQueryKey,
  getListLinkedinPeopleQueryKey,
  getListLinkedinCompaniesQueryKey,
  getListLinkedinSignalsQueryKey,
  type LinkedinPerson,
  type LinkedinCompany,
  type LinkedinSignal,
  type LinkedinActionPrepareInputActionType
} from '@workspace/api-client-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { ExternalLink, Plus, Sparkles, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function LinkedinResearchLibrary() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle>Research Library</CardTitle>
        <CardDescription>Verified people, companies, and signals for manual outreach.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="people" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="people" data-testid="tab-lib-people">People</TabsTrigger>
            <TabsTrigger value="companies" data-testid="tab-lib-companies">Companies</TabsTrigger>
            <TabsTrigger value="signals" data-testid="tab-lib-signals">Signals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="people" className="mt-0">
            <PeopleTab />
          </TabsContent>
          <TabsContent value="companies" className="mt-0">
            <CompaniesTab />
          </TabsContent>
          <TabsContent value="signals" className="mt-0">
            <SignalsTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function PeopleTab() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: people, isLoading } = useListLinkedinPeople();
  const createPerson = useCreateLinkedinPerson();
  const prepareAction = usePrepareLinkedinAction();
  
  const [addOpen, setAddOpen] = useState(false);
  const [prepareOpen, setPrepareOpen] = useState<number | null>(null);
  const [actionType, setActionType] = useState<LinkedinActionPrepareInputActionType>('connection_note');
  
  const [formData, setFormData] = useState({
    name: '',
    linkedinUrl: '',
    role: '',
    companyId: '',
    geography: '',
    disciplineFit: '',
    sourceUrl: '',
    evidence: '',
    legalBasisNote: '',
    consentNote: '',
    retentionUntil: '',
  });

  const [possibleMatches, setPossibleMatches] = useState<any[]>([]);

  const handleAdd = async () => {
    try {
      await createPerson.mutateAsync({ 
        data: {
          name: formData.name,
          linkedinUrl: formData.linkedinUrl || undefined,
          role: formData.role || undefined,
          companyId: formData.companyId ? parseInt(formData.companyId, 10) : undefined,
          geography: formData.geography || undefined,
          disciplineFit: formData.disciplineFit || undefined,
          sourceUrl: formData.sourceUrl || undefined,
          evidence: formData.evidence || undefined,
          legalBasisNote: formData.legalBasisNote,
          consentNote: formData.consentNote || undefined,
          retentionUntil: formData.retentionUntil ? new Date(formData.retentionUntil).toISOString() : undefined,
        }
      });
      toast({ title: 'Person added to library' });
      setAddOpen(false);
      setFormData({ name: '', linkedinUrl: '', role: '', companyId: '', geography: '', disciplineFit: '', sourceUrl: '', evidence: '', legalBasisNote: '', consentNote: '', retentionUntil: '' });
      setPossibleMatches([]);
      qc.invalidateQueries({ queryKey: getListLinkedinPeopleQueryKey() });
    } catch (e: any) {
      if (e.data && e.data.possibleMatches) {
        setPossibleMatches(e.data.possibleMatches);
        toast({ title: 'Duplicate found', description: 'Please review the possible matches below.', variant: 'destructive' });
      } else {
        toast({ title: 'Failed to add person', description: e.data?.error || e.message, variant: 'destructive' });
      }
    }
  };

  const handlePrepare = async () => {
    if (!prepareOpen) return;
    try {
      await prepareAction.mutateAsync({ 
        data: { personId: prepareOpen, actionType }
      });
      toast({ title: 'Draft prepared successfully', description: 'Check the Approval Queue.' });
      setPrepareOpen(null);
      qc.invalidateQueries({ queryKey: getListLinkedinActionsQueryKey() });
    } catch (e: any) {
      toast({ title: 'Failed to prepare draft', description: e.data?.error || e.message, variant: 'destructive' });
    }
  };

  if (isLoading) return <div className="text-sm text-muted-foreground py-4">Loading people...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" onClick={() => setAddOpen(true)}><Plus className="w-4 h-4 mr-2"/> Add Person</Button>
      </div>
      
      <div className="grid gap-4">
        {people?.length === 0 ? (
          <div className="p-8 text-center border border-dashed rounded-md text-muted-foreground">
            No people found. Add your first research target.
          </div>
        ) : (
          people?.map((person: LinkedinPerson) => (
            <div key={person.id} className="p-4 border rounded-md bg-card/50 flex flex-col md:flex-row gap-4 justify-between group">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-foreground">{person.name}</h4>
                  {person.role && <span className="text-xs text-muted-foreground">— {person.role}</span>}
                  {person.status === 'active' ? (
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-200 ml-2">Active</Badge>
                  ) : (
                    <Badge variant="outline" className="ml-2">{person.status}</Badge>
                  )}
                  {(person.confidence ?? 0) > 0 && <Badge variant="secondary" className="ml-1">Fit: {person.confidence}%</Badge>}
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  {person.linkedinUrl && (
                    <a href={person.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                      Profile <ExternalLink className="w-3 h-3"/>
                    </a>
                  )}
                  {person.sourceUrl && (
                    <a href={person.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                      Source <ExternalLink className="w-3 h-3"/>
                    </a>
                  )}
                  {person.geography && <span>📍 {person.geography}</span>}
                </div>
                
                {person.evidence && (
                  <div className="bg-muted p-2 rounded text-sm text-foreground mt-2 inline-block">
                    <strong>Evidence:</strong> {person.evidence}
                  </div>
                )}
              </div>
              
              <div className="shrink-0 flex items-start">
                <Button variant="secondary" size="sm" onClick={() => setPrepareOpen(person.id)} disabled={person.status !== 'active'}>
                  <Sparkles className="w-4 h-4 mr-2" /> Prepare Drafts
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Person</DialogTitle>
            <DialogDescription>Add a verified research target. Do not guess contact info.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Full name" />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="e.g. Principal Architect" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>LinkedIn Profile URL</Label>
              <Input value={formData.linkedinUrl} onChange={e => setFormData({...formData, linkedinUrl: e.target.value})} placeholder="https://linkedin.com/in/..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Geography</Label>
                <Input value={formData.geography} onChange={e => setFormData({...formData, geography: e.target.value})} placeholder="e.g. San Francisco" />
              </div>
              <div className="space-y-2">
                <Label>Discipline Fit</Label>
                <Input value={formData.disciplineFit} onChange={e => setFormData({...formData, disciplineFit: e.target.value})} placeholder="e.g. Structural, TI" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Source URL</Label>
              <Input value={formData.sourceUrl} onChange={e => setFormData({...formData, sourceUrl: e.target.value})} placeholder="Where did you find them?" />
            </div>
            <div className="space-y-2">
              <Label>Evidence</Label>
              <Input value={formData.evidence} onChange={e => setFormData({...formData, evidence: e.target.value})} placeholder="Why are they a good fit?" />
            </div>
            <div className="space-y-2">
              <Label>Legal Basis Note *</Label>
              <Input value={formData.legalBasisNote} onChange={e => setFormData({...formData, legalBasisNote: e.target.value})} placeholder="e.g. Legitimate interest (B2B research)" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Consent Note</Label>
                <Input value={formData.consentNote} onChange={e => setFormData({...formData, consentNote: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Retention Until</Label>
                <Input type="datetime-local" value={formData.retentionUntil} onChange={e => setFormData({...formData, retentionUntil: e.target.value})} />
                <p className="text-[10px] text-muted-foreground">Default: 12 months</p>
              </div>
            </div>
            
            {possibleMatches.length > 0 && (
              <div className="mt-4 p-4 border border-destructive/20 bg-destructive/5 rounded-md">
                <h4 className="text-sm font-bold text-destructive mb-2">Possible Duplicates Found</h4>
                <ul className="text-xs text-foreground space-y-1 list-disc list-inside">
                  {possibleMatches.map((m, i) => (
                    <li key={i}>{m.name} ({m.type.replace('_', ' ')})</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setAddOpen(false); setPossibleMatches([]); }}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!formData.name || !formData.legalBasisNote}>Save Target</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={prepareOpen !== null} onOpenChange={(open) => !open && setPrepareOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Prepare Draft</DialogTitle>
            <DialogDescription>Generate a new draft action for this person in the Approval Queue.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Action Type</Label>
              <Select value={actionType} onValueChange={(value) => setActionType(value as LinkedinActionPrepareInputActionType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="connection_note">Connection Note</SelectItem>
                  <SelectItem value="direct_message">Direct Message</SelectItem>
                  <SelectItem value="follow_up">Follow Up</SelectItem>
                  <SelectItem value="comment_idea">Comment Idea</SelectItem>
                  <SelectItem value="talking_points">Talking Points</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-3 bg-muted rounded flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground"/>
              <p className="text-xs text-muted-foreground">This uses the person's saved evidence and source URL to generate context. You can edit the draft in the queue before approval.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPrepareOpen(null)}>Cancel</Button>
            <Button onClick={handlePrepare}>Prepare Draft</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CompaniesTab() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: companies, isLoading } = useListLinkedinCompanies();
  const createCompany = useCreateLinkedinCompany();
  const [addOpen, setAddOpen] = useState(false);
  
  const [possibleMatches, setPossibleMatches] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    linkedinUrl: '',
    geography: '',
    disciplineFit: '',
    sourceUrl: '',
    evidence: ''
  });

  const handleAdd = async () => {
    try {
      await createCompany.mutateAsync({ 
        data: {
          name: formData.name,
          website: formData.website || undefined,
          linkedinUrl: formData.linkedinUrl || undefined,
          geography: formData.geography || undefined,
          disciplineFit: formData.disciplineFit || undefined,
          sourceUrl: formData.sourceUrl || undefined,
          evidence: formData.evidence || undefined
        }
      });
      toast({ title: 'Company added to library' });
      setAddOpen(false);
      setFormData({ name: '', website: '', linkedinUrl: '', geography: '', disciplineFit: '', sourceUrl: '', evidence: '' });
      setPossibleMatches([]);
      qc.invalidateQueries({ queryKey: getListLinkedinCompaniesQueryKey() });
    } catch (e: any) {
      if (e.data && e.data.possibleMatches) {
        setPossibleMatches(e.data.possibleMatches);
        toast({ title: 'Duplicate found', description: 'Please review the possible matches below.', variant: 'destructive' });
      } else {
        toast({ title: 'Failed to add company', description: e.data?.error || e.message, variant: 'destructive' });
      }
    }
  };

  if (isLoading) return <div className="text-sm text-muted-foreground py-4">Loading companies...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" onClick={() => setAddOpen(true)}><Plus className="w-4 h-4 mr-2"/> Add Company</Button>
      </div>
      
      <div className="grid gap-4">
        {companies?.length === 0 ? (
          <div className="p-8 text-center border border-dashed rounded-md text-muted-foreground">
            No companies found.
          </div>
        ) : (
          companies?.map((company: LinkedinCompany) => (
            <div key={company.id} className="p-4 border rounded-md bg-card/50 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-foreground">{company.name}</h4>
                <Badge variant="outline" className="ml-2">{company.status}</Badge>
                {(company.confidence ?? 0) > 0 && <Badge variant="secondary" className="ml-1">Fit: {company.confidence}%</Badge>}
              </div>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                    Website <ExternalLink className="w-3 h-3"/>
                  </a>
                )}
                {company.linkedinUrl && (
                  <a href={company.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                    LinkedIn <ExternalLink className="w-3 h-3"/>
                  </a>
                )}
                {company.sourceUrl && (
                  <a href={company.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                    Source <ExternalLink className="w-3 h-3"/>
                  </a>
                )}
                {company.geography && <span>📍 {company.geography}</span>}
              </div>
              
              {company.evidence && (
                <p className="text-sm text-foreground mt-1">
                  <strong>Evidence:</strong> {company.evidence}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Company</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Company Name *</Label>
              <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Website</Label>
                <Input value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input value={formData.linkedinUrl} onChange={e => setFormData({...formData, linkedinUrl: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Geography</Label>
                <Input value={formData.geography} onChange={e => setFormData({...formData, geography: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Discipline Fit</Label>
                <Input value={formData.disciplineFit} onChange={e => setFormData({...formData, disciplineFit: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Source URL</Label>
              <Input value={formData.sourceUrl} onChange={e => setFormData({...formData, sourceUrl: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Evidence</Label>
              <Input value={formData.evidence} onChange={e => setFormData({...formData, evidence: e.target.value})} />
            </div>
            {possibleMatches.length > 0 && (
              <div className="mt-4 p-4 border border-destructive/20 bg-destructive/5 rounded-md">
                <h4 className="text-sm font-bold text-destructive mb-2">Possible Duplicates Found</h4>
                <ul className="text-xs text-foreground space-y-1 list-disc list-inside">
                  {possibleMatches.map((m, i) => (
                    <li key={i}>{m.name} ({m.type.replace('_', ' ')})</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setAddOpen(false); setPossibleMatches([]); }}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!formData.name}>Save Company</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SignalsTab() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: signals, isLoading } = useListLinkedinSignals();
  const createSignal = useCreateLinkedinSignal();
  const [addOpen, setAddOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    kind: '',
    title: '',
    sourceUrl: '',
    evidence: '',
    observedAt: new Date().toISOString().substring(0, 16),
    confidence: '50',
    personId: '',
    companyId: ''
  });

  const handleAdd = async () => {
    try {
      await createSignal.mutateAsync({ 
        data: {
          kind: formData.kind,
          title: formData.title,
          sourceUrl: formData.sourceUrl,
          evidence: formData.evidence,
          observedAt: new Date(formData.observedAt).toISOString(),
          confidence: parseInt(formData.confidence, 10),
          personId: formData.personId ? parseInt(formData.personId, 10) : undefined,
          companyId: formData.companyId ? parseInt(formData.companyId, 10) : undefined
        }
      });
      toast({ title: 'Signal added to library' });
      setAddOpen(false);
      setFormData({ kind: '', title: '', sourceUrl: '', evidence: '', observedAt: new Date().toISOString().substring(0, 16), confidence: '50', personId: '', companyId: '' });
      qc.invalidateQueries({ queryKey: getListLinkedinSignalsQueryKey() });
    } catch (e: any) {
      toast({ title: 'Failed to add signal', description: e.data?.error || e.message, variant: 'destructive' });
    }
  };

  if (isLoading) return <div className="text-sm text-muted-foreground py-4">Loading signals...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" onClick={() => setAddOpen(true)}><Plus className="w-4 h-4 mr-2"/> Add Signal</Button>
      </div>
      
      <div className="grid gap-4">
        {signals?.length === 0 ? (
          <div className="p-8 text-center border border-dashed rounded-md text-muted-foreground">
            No signals found.
          </div>
        ) : (
          signals?.map((signal: LinkedinSignal) => (
            <div key={signal.id} className="p-4 border rounded-md bg-card/50 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{signal.kind}</Badge>
                <h4 className="font-medium text-foreground">{signal.title}</h4>
              </div>
              <p className="text-sm text-foreground">{signal.evidence}</p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
                {signal.sourceUrl && (
                  <a href={signal.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                    Source <ExternalLink className="w-3 h-3"/>
                  </a>
                )}
                <span>Confidence: {signal.confidence ?? 50}/100</span>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Market Signal</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Signal Kind *</Label>
              <Input value={formData.kind} onChange={e => setFormData({...formData, kind: e.target.value})} placeholder="e.g. funding, hiring, milestone" />
            </div>
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Headline of the signal" />
            </div>
            <div className="space-y-2">
              <Label>Source URL *</Label>
              <Input value={formData.sourceUrl} onChange={e => setFormData({...formData, sourceUrl: e.target.value})} placeholder="Link to post or article" />
            </div>
            <div className="space-y-2">
              <Label>Evidence *</Label>
              <Input value={formData.evidence} onChange={e => setFormData({...formData, evidence: e.target.value})} placeholder="Brief explanation" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Observed At *</Label>
                <Input type="datetime-local" value={formData.observedAt} onChange={e => setFormData({...formData, observedAt: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Confidence (0-100)</Label>
                <Input type="number" min="0" max="100" value={formData.confidence} onChange={e => setFormData({...formData, confidence: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Person ID</Label>
                <Input type="number" value={formData.personId} onChange={e => setFormData({...formData, personId: e.target.value})} placeholder="Optional" />
              </div>
              <div className="space-y-2">
                <Label>Company ID</Label>
                <Input type="number" value={formData.companyId} onChange={e => setFormData({...formData, companyId: e.target.value})} placeholder="Optional" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!formData.kind || !formData.title || !formData.evidence || !formData.sourceUrl || !formData.observedAt}>Save Signal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}