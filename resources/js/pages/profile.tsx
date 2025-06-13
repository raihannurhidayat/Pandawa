import { User } from '@/types/issue'
import React from 'react'
import { Head } from "@inertiajs/react";
import { User as UserIcon, Mail, Calendar, Shield, Hash } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  const currentUser = user;

  return (
    <>
      <Head title="Profile" />

      <Navbar />

      <div className="min-h-screen p-12 font-poppins bg-slate-50 relative overflow-visible">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-purple-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-32 w-40 h-40 bg-pink-200 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px- py-8 relative z-10">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
            User <span className="text-green-500">Profile</span>
          </h1>

          <div className="max-w-full mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mb-8">
              <div className="relative h-32 bg-gradient-to-br from-green-400 to-green-600">
                <div className="absolute inset-0 bg-black/10"></div>
              </div>

              <div className="p-8 -mt-16 relative">
                <div className="flex flex-col md:flex-row md:items-end gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-white rounded-2xl shadow-lg border-4 border-white flex items-center justify-center">
                      <UserIcon className="w-12 h-12 text-green-500" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-gray-900 mb-2">{currentUser.name}</h2>
                    <div className="flex items-center gap-2 mb-4">
                      {currentUser.email_verified_at && (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Mail className="w-5 h-5 text-green-500 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Contact Information</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-1 block">Email Address</label>
                    <p className="text-gray-900 font-medium">{currentUser.email}</p>
                    <div className="mt-2">
                      {currentUser.email_verified_at ? (
                        <span className="inline-flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                          Verified on {new Date(currentUser.email_verified_at).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1"></div>
                          Not verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Hash className="w-5 h-5 text-green-500 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Account Details</h3>
                </div>

                <div className="space-y-4">


                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-1 block">Member Since</label>
                    <div className="flex items-center text-gray-900">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="font-medium">
                        {new Date(currentUser.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 md:col-span-2">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Account Statistics</h3>

                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                    <div className="text-2xl font-black text-purple-600">
                      {Math.floor((new Date().getTime() - new Date(currentUser.created_at).getTime()) / (1000 * 60 * 60 * 24))}
                    </div>
                    <div className="text-sm text-purple-800 font-medium">Days Active</div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}