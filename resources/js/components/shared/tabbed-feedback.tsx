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
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

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
        <div className="w-full mx-auto sm:max-w-7xl">
            <ImageGallery
                images={activePhase?.attachments!}
                isOpen={isGaleryModalOpen}
                onClose={() => setIsGaleryModalOpen(false)}
                initialIndex={phaseGalleryIndex}
            />
            <div className="overflow-hidden border shadow-sm rounded-xl">
                {/* Tab Navigation */}
                <div className="border-b">
                    {/* Mobile Dropdown */}
                    <div className="block p-4 md:hidden">
                        <Select
                            value={activeTab}
                            onValueChange={(value) => setActiveTab(value)}
                        >
                            <SelectTrigger className="w-full px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <SelectValue placeholder="Pilih fase" />
                            </SelectTrigger>
                            <SelectContent>
                                {phasesData.map((phase) => {
                                    const statusLabel =
                                        statusConfig[
                                            phase.status as keyof typeof statusConfig
                                        ].label;
                                    return (
                                        <SelectItem
                                            key={phase.id}
                                            value={phase.id.toString()}
                                        >
                                            {phase.title} - {statusLabel}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="hidden overflow-x-visible md:flex">
                        {phasesData.map((phase) => {
                            const StatusIcon =
                                statusConfig[
                                    phase.title as keyof typeof statusConfig
                                ].icon;
                            return (
                                <button
                                    key={phase.id}
                                    onClick={() => setActiveTab(phase.id)}
                                    className={`relative flex-1 min-w-0 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                                        activeTab === phase.id
                                            ? `${
                                                  statusConfig[
                                                      phase.title as keyof typeof statusConfig
                                                  ].color
                                              }  border-b-2 border-primary`
                                            : "text-secondary-foreground hover:text-secondary-foreground/80"
                                    }`}
                                >
                                    <div className="relative z-10 flex items-center justify-center gap-2">
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
                                            className="absolute inset-0 border-b-2 border-primary"
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
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="mb-2 text-xl font-bold md:text-2xl text-secondary-foreground">
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
                                    <p className="leading-relaxed text-secondary-foreground">
                                        {activePhase.reason}
                                    </p>
                                </div>

                                {/* Key Points */}
                                <div>
                                    <h3 className="mb-3 text-lg font-semibold text-secondary-foreground">
                                        Lampiran
                                    </h3>
                                    <div className="flex flex-row flex-wrap gap-4">
                                        {activePhase.attachments.length > 0 ? (
                                            activePhase.attachments.map(
                                                (attachment, index) => (
                                                    <Button
                                                        key={attachment.id}
                                                        className="p-0 transition-opacity hover:bg-black/10"
                                                        onClick={() => {
                                                            setPhaseGalleryIndex(
                                                                index
                                                            );
                                                            setIsGaleryModalOpen(
                                                                true
                                                            );
                                                        }}
                                                        asChild
                                                    >
                                                        <div className="w-32 h-24 overflow-hidden rounded-md outline outline-1 outline-neutral-400">
                                                            <img
                                                                src={
                                                                    attachment.url
                                                                }
                                                                alt={
                                                                    attachment.filename
                                                                }
                                                                className="object-cover w-full h-full transition-transform hover:scale-105"
                                                            />
                                                        </div>
                                                    </Button>
                                                )
                                            )
                                        ) : (
                                            <div className="flex flex-col items-center justify-center w-full py-12 text-center border-2 border-dashed">
                                                <div className="p-4 mb-4 rounded-full bg-muted">
                                                    <FileX className="md:h-8 md:w-8 size-6 text-muted-foreground" />
                                                </div>
                                                <h3 className="mb-2 text-sm font-medium md:text-lg text-foreground">
                                                    Tidak Ada Bukti Pendukung
                                                </h3>
                                                <p className="max-w-sm mb-4 text-xs md:text-sm text-muted-foreground">
                                                    Tidak ada file atau gambar
                                                    yang diunggah sebagai bukti
                                                    pendukung untuk feedback
                                                    ini.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
