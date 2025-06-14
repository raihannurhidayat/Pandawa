import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    Clock,
    User,
    Calendar,
    MessageCircleX,
    FileClock,
    ThumbsDown,
    Settings,
    Send,
    FileX,
    CheckSquare,
    FileCheck,
    Hourglass,
    Ban,
    Hammer,
    ClipboardList,
    HelpCircle,
} from "lucide-react";
import { Phase } from "@/types/issue";
import { BiMessageCheck } from "react-icons/bi";
import ImageGallery from "../image-gallery";

const phases = [
    {
        id: "phase1",
        label: "Phase 1",
        title: "Initial Review",
        status: "completed",
        timestamp: "2024-01-15",
        assignee: "Sarah Chen",
        content: {
            description:
                "Initial assessment and preliminary feedback collection phase. This stage focuses on gathering baseline information and identifying key areas for improvement.",
            points: [
                "Stakeholder interviews completed",
                "Initial data collection finished",
                "Preliminary analysis documented",
                "Key metrics established",
            ],
        },
    },
    {
        id: "phase2",
        label: "Phase 2",
        title: "Detailed Analysis",
        status: "in-progress",
        timestamp: "2024-01-22",
        assignee: "Michael Rodriguez",
        content: {
            description:
                "Comprehensive analysis phase involving deep-dive evaluation and detailed feedback synthesis. This phase builds upon initial findings to provide actionable insights.",
            points: [
                "Detailed user research in progress",
                "Competitive analysis underway",
                "Technical feasibility assessment",
                "Resource requirement evaluation",
            ],
        },
    },
    {
        id: "phase3",
        label: "Phase 3",
        title: "Implementation Planning",
        status: "pending",
        timestamp: "2024-02-05",
        assignee: "Alex Thompson",
        content: {
            description:
                "Final phase focusing on implementation strategy and action plan development. This stage translates insights into concrete next steps and deliverables.",
            points: [
                "Implementation roadmap creation",
                "Resource allocation planning",
                "Timeline and milestone definition",
                "Success metrics establishment",
            ],
        },
    },
];

const statusConfig = {
    pending: {
        icon: Clock,
        color: "text-gray-600",
        bgColor: "bg-gray-100",
        label: "Pending",
        badgeStyle: "bg-gray-100 border-gray-300 text-gray-500",
    },
    in_progress: {
        icon: Settings,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        label: "In Progress",
        badgeStyle:
            "bg-blue-100 border-blue-500 text-blue-700 ring-4 ring-blue-100",
    },
    resolved: {
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-100",
        label: "Resolved",
        badgeStyle: "bg-green-100 border-green-500 text-green-700",
    },
    closed: {
        icon: MessageCircleX,
        color: "text-red-600",
        bgColor: "bg-red-100",
        label: "Closed",
        badgeStyle: "bg-red-200 border-red-400 text-red-600",
    },
    "Pengaduan diajukan": {
        icon: Send,
        color: "text-gray-600",
        bgColor: "bg-gray-100",
        label: "Pengaduan diajukan",
    },
    "Pengaduan diproses": {
        icon: Settings,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        label: "Pengaduan diproses",
    },
    "Pengaduan diterima": {
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-100",
        label: "Pengaduan diterima",
    },
    "Pengaduan ditolak": {
        icon: ThumbsDown,
        color: "text-red-600",
        bgColor: "bg-red-100",
        label: "Pengaduan ditolak",
    },
    "Menunggu tindak lanjut": {
        icon: Hourglass,
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        label: "Menunggu tindak lanjut",
    },
    "Penyusunan solusi": {
        icon: FileCheck,
        color: "text-blue-700",
        bgColor: "bg-blue-100",
        label: "Penyusunan solusi",
    },
    "Solusi disetujui": {
        icon: CheckSquare,
        color: "text-green-700",
        bgColor: "bg-green-100",
        label: "Solusi disetujui",
    },
    "Solusi ditolak": {
        icon: FileX,
        color: "text-red-700",
        bgColor: "bg-red-100",
        label: "Solusi ditolak",
    },
    "Persiapan pelaksanaan": {
        icon: ClipboardList,
        color: "text-indigo-600",
        bgColor: "bg-indigo-100",
        label: "Persiapan pelaksanaan",
    },
    "Pelaksanaan solusi": {
        icon: Hammer,
        color: "text-blue-800",
        bgColor: "bg-blue-100",
        label: "Pelaksanaan solusi",
    },
    "Pelaksanaan selesai": {
        icon: CheckCircle,
        color: "text-green-800",
        bgColor: "bg-green-100",
        label: "Pelaksanaan selesai",
    },
    "Pelaksanaan dibatalkan": {
        icon: Ban,
        color: "text-gray-700",
        bgColor: "bg-gray-200",
        label: "Pelaksanaan dibatalkan",
    },
    "Menunggu konfirmasi": {
        icon: HelpCircle,
        color: "text-yellow-700",
        bgColor: "bg-yellow-100",
        label: "Menunggu konfirmasi",
    },
    "Konfirmasi diproses": {
        icon: FileClock,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        label: "Konfirmasi diproses",
    },
    "Pengaduan selesai": {
        icon: BiMessageCheck,
        color: "text-green-700",
        bgColor: "bg-green-100",
        label: "Pengaduan selesai",
    },
    "Pengaduan ditutup": {
        icon: MessageCircleX,
        color: "text-gray-800",
        bgColor: "bg-gray-300",
        label: "Pengaduan ditutup",
    },
};

export default function FeedbackComponent({
    phasesData,
}: {
    phasesData: Phase[];
}) {
    console.log({ phasesData });
    const [activeTab, setActiveTab] = useState(phasesData[0].id);
    const activePhase = phasesData.find((phase) => phase.id === activeTab);
    const [isGaleryModalOpen, setIsGaleryModalOpen] = useState(false);
    const [phaseGalleryIndex, setPhaseGalleryIndex] = useState(0);

    return (
        <div className="sm:max-w-7xl mx-auto w-full">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200 bg-gray-50">
                    {/* Mobile Dropdown */}
                    <div className="block md:hidden p-4">
                        <select
                            value={activeTab}
                            onChange={(e) => setActiveTab(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {phasesData.map((phase) => {
                                const statusLabel =
                                    statusConfig[
                                        phase.status as keyof typeof statusConfig
                                    ].label;
                                return (
                                    <option key={phase.id} value={phase.id}>
                                        {phase.title} - {statusLabel}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="hidden md:flex overflow-x-auto">
                        {phasesData.map((phase) => {
                            const StatusIcon =
                                statusConfig[
                                    phase.title as keyof typeof statusConfig
                                ].icon;
                            return (
                                <button
                                    key={phase.id}
                                    onClick={() => setActiveTab(phase.id)}
                                    className={`relative flex-1 min-w-0 px-6 py-4 text-sm font-medium transition-all duration-200 hover:bg-white/50 ${
                                        activeTab === phase.id
                                            ? `${
                                                  statusConfig[
                                                      phase.title as keyof typeof statusConfig
                                                  ].color
                                              } bg-white border-b-2 border-primary`
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    <div className="flex items-center justify-center gap-2 relative z-10">
                                        <StatusIcon
                                            className={`w-4 h-4 ${
                                                statusConfig[
                                                    phase.title as keyof typeof statusConfig
                                                ].color
                                            }`}
                                        />
                                        <span className="truncate">
                                            {phase.title}
                                        </span>
                                    </div>
                                    {activeTab === phase.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-white border-b-2 border-primary"
                                            initial={false}
                                            transition={{
                                                type: "spring",
                                                bounce: 0.2,
                                                duration: 0.6,
                                            }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-8">
                    <AnimatePresence mode="wait">
                        {activePhase && (
                            <motion.div
                                key={activePhase.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                }}
                                className="space-y-6"
                            >
                                {/* Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            {activePhase.title}
                                        </h2>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>
                                                    Diperbaharui{" "}
                                                    {
                                                        activePhase.updated_at_relative
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                <span>
                                                    {/* {activePhase.assignee} */}
                                                    Admin
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                                            (statusConfig as any)[
                                                activePhase.status
                                            ].bgColor
                                        } ${
                                            (statusConfig as any)[
                                                activePhase.status
                                            ].color
                                        }`}
                                    >
                                        {React.createElement(
                                            (statusConfig as any)[
                                                activePhase.status
                                            ].icon,
                                            { className: "w-4 h-4" }
                                        )}
                                        {
                                            (statusConfig as any)[
                                                activePhase.status
                                            ].label
                                        }
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="prose prose-gray max-w-none">
                                    <p className="text-gray-700 leading-relaxed">
                                        {activePhase.reason}
                                    </p>
                                </div>

                                {/* Key Points */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        Lampiran
                                    </h3>
                                    <ImageGallery
                                        images={activePhase?.attachments}
                                        isOpen={isGaleryModalOpen}
                                        onClose={() =>
                                            setIsGaleryModalOpen(false)
                                        }
                                        initialIndex={phaseGalleryIndex}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
