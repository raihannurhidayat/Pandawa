import { User as Auth } from "@/types/"

import { Timestamp, TimestampDetail } from "@/types";
import { Comment } from "@/types/comment"

interface Location {
    province: number;
    city: number;
    district: number;
    village: number;
}

interface User extends Auth {}

interface IssueCategory extends Timestamp {
    id: string;
    name: string;
    slug: string;
    description: string;
}

export enum CaseStatus {
  Open = 'open',
  Pending = 'pending',
  InProgress = 'in_progress',
  Resolved = 'resolved',
  Closed = 'closed',
}

type CaseStatusType = `${CaseStatus}`;

export const CaseStatusLabels: Record<CaseStatus, string> = {
  [CaseStatus.Open]: 'Open',
  [CaseStatus.Pending]: 'Pending',
  [CaseStatus.InProgress]: 'In Progress',
  [CaseStatus.Resolved]: 'Resolved',
  [CaseStatus.Closed]: 'Closed',
};

export enum PhaseStatus {
  Pending = 'pending',
  InProgress = 'in_progress',
  Resolved = 'resolved',
  Closed = 'closed',
}

type PhaseStatusType = `${PhaseStatus}`;

export const PhaseStatusLabels: Record<PhaseStatus, string> = {
  [PhaseStatus.Pending]: 'Pending',
  [PhaseStatus.InProgress]: 'In Progress',
  [PhaseStatus.Resolved]: 'Resolved',
  [PhaseStatus.Closed]: 'Closed',
};

type Phase = {
    id: string;
    issue_id: string;
    title: string;
    body: string;
    reason: string | null;
    order: number;
    is_active: boolean | number;
    activated_at: string | null;
    status: PhaseStatus;
    attachments: Attachment[];
} & TimestampDetail;

interface Attachment extends Timestamp {
    id: string;
    filename: string;
    path: string;
    url: string;
    attachable_type: string;
    attachable_id: string;
    created_at: string;
    updated_at: string;
}

interface Issue extends TimestampDetail {
    id: string;
    title: string;
    body: string;
    user_id: string;
    issue_category_id: string;
    location: string;
    status: CaseStatus;
    user: User;
    issue_category: IssueCategory;
    phases: Phase[];
    likes: any[],
    likes_count: number
    attachments: Attachment[];
    comments: Comment[];
}

// Alternative with parsed location if you want to work with the location as an object
interface IssueWithParsedLocation extends Omit<Issue, "location"> {
    location: Location;
}

export type {
    Issue,
    IssueWithParsedLocation,
    Location,
    User,
    IssueCategory,
    Phase,
    CaseStatusType,
    PhaseStatusType,
    Attachment,
};
