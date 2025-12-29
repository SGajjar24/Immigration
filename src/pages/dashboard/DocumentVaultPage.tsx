import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Upload, CheckCircle2, Clock, AlertTriangle, Download, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../utils/cn';

interface Document {
    id: string;
    name: string;
    type: string;
    status: 'verified' | 'pending' | 'missing';
    uploadedAt?: string;
    expiresAt?: string;
}

const requiredDocuments: Document[] = [
    { id: '1', name: 'Passport', type: 'identity', status: 'missing' },
    { id: '2', name: 'IELTS/CELPIP Results', type: 'language', status: 'missing' },
    { id: '3', name: 'Educational Credential Assessment (ECA)', type: 'education', status: 'missing' },
    { id: '4', name: 'Work Experience Letters', type: 'experience', status: 'missing' },
    { id: '5', name: 'Police Clearance Certificate', type: 'security', status: 'missing' },
    { id: '6', name: 'Medical Exam Results', type: 'medical', status: 'missing' },
    { id: '7', name: 'Proof of Funds', type: 'financial', status: 'missing' },
    { id: '8', name: 'Birth Certificate', type: 'identity', status: 'missing' },
];

export default function DocumentVaultPage() {
    const [documents, setDocuments] = useState<Document[]>(requiredDocuments);
    const [dragging, setDragging] = useState(false);

    const getStatusIcon = (status: Document['status']) => {
        switch (status) {
            case 'verified':
                return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            case 'pending':
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'missing':
                return <AlertTriangle className="w-5 h-5 text-red-500" />;
        }
    };

    const getStatusBadge = (status: Document['status']) => {
        const variants = {
            verified: 'success',
            pending: 'warning',
            missing: 'destructive'
        } as const;
        return <Badge variant={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
    };

    const handleUpload = (docId: string) => {
        // Simulate upload
        setDocuments(docs => docs.map(doc =>
            doc.id === docId
                ? { ...doc, status: 'pending' as const, uploadedAt: new Date().toISOString() }
                : doc
        ));
    };

    const stats = {
        verified: documents.filter(d => d.status === 'verified').length,
        pending: documents.filter(d => d.status === 'pending').length,
        missing: documents.filter(d => d.status === 'missing').length,
        total: documents.length
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Document Vault</h1>
                    <p className="text-gray-400">Securely store and manage your immigration documents</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="border-white/10 bg-white/5">
                        <CardContent className="pt-4 text-center">
                            <p className="text-3xl font-bold text-white">{stats.total}</p>
                            <p className="text-sm text-gray-400">Total Required</p>
                        </CardContent>
                    </Card>
                    <Card className="border-green-500/20 bg-green-500/5">
                        <CardContent className="pt-4 text-center">
                            <p className="text-3xl font-bold text-green-400">{stats.verified}</p>
                            <p className="text-sm text-gray-400">Verified</p>
                        </CardContent>
                    </Card>
                    <Card className="border-yellow-500/20 bg-yellow-500/5">
                        <CardContent className="pt-4 text-center">
                            <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
                            <p className="text-sm text-gray-400">Pending Review</p>
                        </CardContent>
                    </Card>
                    <Card className="border-red-500/20 bg-red-500/5">
                        <CardContent className="pt-4 text-center">
                            <p className="text-3xl font-bold text-red-400">{stats.missing}</p>
                            <p className="text-sm text-gray-400">Missing</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Upload Zone */}
                <Card
                    className={cn(
                        "border-2 border-dashed transition-colors cursor-pointer",
                        dragging ? "border-blue-500 bg-blue-500/10" : "border-white/20 bg-white/5 hover:border-white/40"
                    )}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setDragging(false); }}
                >
                    <CardContent className="py-8 text-center">
                        <Upload className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                        <p className="text-white font-medium mb-1">Drag & drop files here</p>
                        <p className="text-sm text-gray-400">or click to browse</p>
                        <p className="text-xs text-gray-500 mt-2">Supports PDF, JPG, PNG up to 10MB</p>
                    </CardContent>
                </Card>

                {/* Document List */}
                <Card className="border-white/10 bg-white/5">
                    <CardHeader>
                        <CardTitle>Required Documents</CardTitle>
                        <CardDescription>Upload all required documents for your application</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {documents.map(doc => (
                                <div
                                    key={doc.id}
                                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        {getStatusIcon(doc.status)}
                                        <div>
                                            <p className="text-white font-medium">{doc.name}</p>
                                            <p className="text-xs text-gray-400 capitalize">{doc.type}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {getStatusBadge(doc.status)}

                                        {doc.status === 'missing' ? (
                                            <button
                                                onClick={() => handleUpload(doc.id)}
                                                className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-colors"
                                            >
                                                Upload
                                            </button>
                                        ) : (
                                            <div className="flex gap-2">
                                                <button className="p-1.5 text-gray-400 hover:text-white transition-colors">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-red-400 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
