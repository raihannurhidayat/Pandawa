import { User } from "@/types";
import { Head } from "@inertiajs/react";
import { User as UserIcon, Mail, Calendar, Shield, Hash } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useLocation } from "@/hooks/use-location";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PartialAddress } from "@/types/location";
import { motion } from "framer-motion";

export default function Profile({ user }: { user: User }) {
    const address = useLocation(user.address);

    const addressEntries = Object.entries(address) as [
        keyof PartialAddress,
        string
    ][];

    console.log(address);

    return (
        <>
            <Head title={`${user.username} | Profile`} />

            <Navbar />

            <div className="relative min-h-screen p-12 overflow-visible font-poppins bg-slate-50">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute w-32 h-32 bg-blue-200 rounded-full top-10 left-10 blur-3xl"></div>
                    <div className="absolute w-48 h-48 bg-purple-200 rounded-full top-40 right-20 blur-3xl"></div>
                    <div className="absolute w-40 h-40 bg-pink-200 rounded-full bottom-40 left-32 blur-3xl"></div>
                </div>

                <div className="container relative z-10 py-8 mx-auto px-">
                    <h1 className="mb-6 text-3xl font-black text-gray-900 sm:text-4xl">
                        User <span className="text-green-500">Profile</span>
                    </h1>

                    <div className="max-w-full mx-auto">
                        <div className="mb-8 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
                            <div className="relative h-32 bg-gradient-to-br from-green-400 to-green-600">
                                <div className="absolute inset-0 bg-black/10"></div>
                            </div>

                            <div className="relative p-8 -mt-16">
                                <div className="flex flex-col gap-6 md:flex-row md:items-end">
                                    <div className="relative">
                                        <div className="flex items-center justify-center w-24 h-24 bg-white border-4 border-white shadow-lg rounded-2xl">
                                            <UserIcon className="w-12 h-12 text-green-500" />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h2 className="mb-2 text-2xl font-black text-gray-900">
                                            {user.name}
                                        </h2>
                                        <h3 className="mb-2 text-lg font-medium text-gray-700">
                                            @{user.username}
                                        </h3>
                                        <div className="flex items-center gap-2 mb-4">
                                            {user.email_verified_at && (
                                                <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="p-6 transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-lg">
                                <div className="flex items-center mb-4">
                                    <Mail className="w-5 h-5 mr-3 text-green-500" />
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Contact Information
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-500">
                                            Email Address
                                        </label>
                                        <p className="font-medium text-gray-900">
                                            {user.email}
                                        </p>
                                        <div className="mt-2">
                                            {user.email_verified_at ? (
                                                <span className="inline-flex items-center px-2 py-1 text-xs text-green-600 rounded-full bg-green-50">
                                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                                                    Verified on{" "}
                                                    {new Date(
                                                        user.email_verified_at
                                                    ).toLocaleDateString()}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-1 text-xs text-yellow-600 rounded-full bg-yellow-50">
                                                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1"></div>
                                                    Not verified
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-lg">
                                <div className="flex items-center mb-4">
                                    <Hash className="w-5 h-5 mr-3 text-green-500" />
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Account Details
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-500">
                                            Member Since
                                        </label>
                                        <div className="flex items-center text-gray-900">
                                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                            <span className="font-medium">
                                                {new Date(
                                                    user.created_at
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Card>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeOut",
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle>Address</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-6">
                                            {addressEntries.map(
                                                ([field, value], index) => (
                                                    <motion.div
                                                        key={field}
                                                        initial={{
                                                            opacity: 0,
                                                            x: -10,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        transition={{
                                                            delay: 0.1 * index,
                                                            duration: 0.3,
                                                        }}
                                                    >
                                                        <div key={field}>
                                                            <p className="text-sm uppercase text-muted-foreground">
                                                                {field}
                                                            </p>
                                                            <p className="mt-1 text-base font-medium">
                                                                {value}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )
                                            )}
                                        </div>
                                    </CardContent>
                                </motion.div>
                            </Card>

                            <div className="p-6 transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-lg md:col-span-2">
                                <h3 className="mb-4 text-lg font-bold text-gray-900">
                                    Account Statistics
                                </h3>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                                    <div className="p-4 border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                                        <div className="text-2xl font-black text-purple-600">
                                            {Math.floor(
                                                (new Date().getTime() -
                                                    new Date(
                                                        user.created_at
                                                    ).getTime()) /
                                                    (1000 * 60 * 60 * 24)
                                            )}
                                        </div>
                                        <div className="text-sm font-medium text-purple-800">
                                            Days Active
                                        </div>
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
