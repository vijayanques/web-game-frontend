'use client';

import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bug, Image as ImageIcon, CheckCircle, Clock, AlertCircle, Send, Trash2 } from 'lucide-react';
import { getStoredUser } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToast } from '@/lib/toast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function ReportBugPage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Get current user
  const user = getStoredUser();
  const username = user?.username || user?.name || 'Guest';

  // Fetch user's bug reports
  const { data: response, isLoading } = useQuery({
    queryKey: ['myBugReports', username],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/bug-reports/user/${username}`);
      return res.json();
    },
    enabled: !!username,
    refetchInterval: 15000,
  });

  const reports = response?.data || [];

  // Submit Mutation
  const submitMutation = useMutation({
    mutationFn: async ({ title, description, imageUrl }: any) => {
      const res = await fetch(`${API_BASE_URL}/api/bug-reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          title,
          description,
          imageUrl,
        }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        showToast.success('Your report has been submitted successfully!');
        formik.resetForm();
        setFile(null);
        setPreview(null);
        queryClient.invalidateQueries({ queryKey: ['myBugReports', username] });
      } else {
        showToast.error(data.message || 'Failed to submit report');
      }
    },
    onError: () => showToast.error('Network error occurred'),
  });

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 5 * 1024 * 1024) {
        showToast.error('File size must be less than 5MB');
        return;
      }
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Bug title is required').min(5, 'Title must be at least 5 characters'),
      description: Yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
    }),
    onSubmit: async (values) => {
      try {
        let imageUrl = null;
        if (file) {
          setIsUploading(true);
          const formData = new FormData();
          formData.append('file', file);
          formData.append('folder', 'theplayfree/bugs');

          const uploadRes = await fetch(`${API_BASE_URL}/api/upload/cloudinary`, {
            method: 'POST',
            body: formData,
          });

          const uploadData = await uploadRes.json();
          if (uploadData.success) {
            imageUrl = uploadData.url;
          } else {
            throw new Error('Image upload failed');
          }
        }

        submitMutation.mutate({ ...values, imageUrl });
      } catch (error: any) {
        showToast.error(error.message || 'Error uploading image');
      } finally {
        setIsUploading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#E8E9ED] text-gray-800 font-[poppins] flex flex-col">
      {/* <Header /> */}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col lg:flex-row gap-8 lg:gap-12 mt-16">

        {/* Left Col: Submit Form */}
        <div className="w-full lg:w-5/12 flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3 tracking-tight">
              <Bug className="w-8 h-8 text-orange-500" />
              Report a Bug
            </h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">Found an issue? Let us know and we'll fix it right away.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600" />

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Which related bug (Title)</label>
                <input
                  type="text"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="E.g., Game not loading on mobile"
                  className={`w-full bg-gray-50 border ${formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-gray-200'} text-gray-800 px-4 py-3.5 rounded-2xl text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all placeholder:text-gray-400`}
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">{formik.errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Please describe exactly what happened and how to reproduce it..."
                  className={`w-full bg-gray-50 border ${formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-gray-200'} text-gray-800 px-4 py-3.5 rounded-2xl text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all placeholder:text-gray-400 h-32 resize-none`}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">{formik.errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Upload Image (Optional)</label>
                {!preview ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-orange-400 bg-gray-50 rounded-2xl flex flex-col items-center justify-center gap-2 transition-colors group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-orange-200 group-hover:bg-orange-50 transition-colors shadow-sm">
                      <ImageIcon className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    </div>
                    <span className="text-sm text-gray-500 font-medium group-hover:text-gray-700">Click to upload screenshot</span>
                  </button>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 group">
                    <img src={preview} alt="Preview" className="w-full h-48 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setPreview(null);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <button
                type="submit"
                disabled={submitMutation.isPending || isUploading}
                className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
              >
                {submitMutation.isPending || isUploading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Report
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Col: Tracking & History */}
        <div className="w-full lg:w-7/12 flex flex-col">
          <div className="mb-6 lg:ml-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <Clock className="w-6 h-6 text-orange-500" />
              Your Reports Status
            </h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">Track the progress of issues you've reported in real-time.</p>
          </div>

          <div className="flex-1 lg:ml-4 space-y-4">
            {isLoading ? (
              <div className="bg-white border border-gray-200 rounded-3xl p-8 text-center text-gray-400 animate-pulse shadow-sm">
                Loading your reports...
              </div>
            ) : reports.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-700">No issues reported</h3>
                <p className="text-gray-500 text-sm mt-2 max-w-sm">When you submit a bug report, you can track its resolution progress right here.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reports.map((report: any) => (
                  <div key={report.id} className="bg-white border border-gray-200 hover:border-orange-300 transition-colors rounded-3xl p-6 shadow-sm relative overflow-hidden group">
                    <div className={`absolute top-0 left-0 w-1.5 h-full ${report.status === 'Pending' ? 'bg-gray-400' :
                      report.status === 'In Progress' ? 'bg-orange-500' :
                        'bg-green-500'
                      }`} />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 ml-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 leading-tight">{report.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{new Date(report.createdAt).toLocaleString()}</p>
                      </div>
                      <span className={`inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shrink-0 border ${report.status === 'Pending' ? 'text-gray-600 bg-gray-100 border-gray-200' :
                        report.status === 'In Progress' ? 'text-orange-600 bg-orange-50 border-orange-200' :
                          'text-green-600 bg-green-50 border-green-200'
                        }`}>
                        {report.status}
                      </span>
                    </div>

                    {/* Timeline */}
                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 ml-2">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Activity Timeline</h4>
                      <div className="space-y-4 border-l-2 border-gray-200 ml-2 pl-6 relative">
                        {report.history?.map((item: any, idx: number) => (
                          <div key={idx} className="relative">
                            <div className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-[3px] border-gray-50 ${item.status === 'Pending' ? 'bg-gray-400' :
                              item.status === 'In Progress' ? 'bg-orange-500' :
                                'bg-green-500'
                              }`} />
                            <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
                              <div className="flex items-center justify-between gap-4 mb-1">
                                <span className={`text-xs font-bold ${item.status === 'Pending' ? 'text-gray-600' :
                                  item.status === 'In Progress' ? 'text-orange-600' :
                                    'text-green-600'
                                  }`}>{item.status}</span>
                                <span className="text-[10px] text-gray-400 font-mono">{new Date(item.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                              </div>
                              <p className="text-sm text-gray-600">{item.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
