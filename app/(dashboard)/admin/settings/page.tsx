"use client";
import React from "react";
import { DashboardSidebar } from "@/components";

const AdminSettings = () => {
    return (
        <div className="bg-white flex justify-start max-w-screen-2xl mx-auto h-full max-xl:flex-col max-xl:h-fit max-xl:gap-y-4">
            <DashboardSidebar />
            <div className="w-full p-8">
                <h1 className="text-3xl font-semibold mb-6">Settings</h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Admin Profile</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value="admin@unicart.com"
                                readOnly
                                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role
                            </label>
                            <input
                                type="text"
                                value="Administrator"
                                readOnly
                                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">System Information</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Application Name</span>
                            <span className="font-medium">UNICART Admin</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Version</span>
                            <span className="font-medium">1.0.0</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Environment</span>
                            <span className="font-medium">Development</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-600">Database</span>
                            <span className="font-medium">PostgreSQL (Neon)</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                            Clear Cache
                        </button>
                        <button className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition">
                            Export Data
                        </button>
                        <button className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                            View Logs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
