interface Location {
    province: number;
    city: number;
    district: number;
    village: number;
}

interface User {
    id: string;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

interface IssueCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export enum PhaseStatus {
  Open = 'open',
  Pending = 'pending',
  InProgress = 'in_progress',
  Resolved = 'resolved',
  Closed = 'closed',
}

export type PhaseStatusType = `${PhaseStatus}`;

type Phase = {
    id: string;
    issue_id: string;
    title: string;
    body: string;
    reason: string | null;
    status: PhaseStatus;
    created_at: string; // ISO 8601 date string
    updated_at: string;
    created_at_relative: string;
    updated_at_relative: string;
    created_at_formatted: string;
    updated_at_formatted: string;
};

interface Attachment {
    id: string;
    filename: string;
    path: string;
    url: string;
    attachable_type: string;
    attachable_id: string;
    created_at: string;
    updated_at: string;
}

interface Issue {
    id: string;
    title: string;
    body: string;
    user_id: string;
    issue_category_id: string;
    location: string;
    status: PhaseStatus;
    created_at: string;
    updated_at: string;
    created_at_relative: string;
    updated_at_relative: string;
    created_at_formatted: string;
    updated_at_formatted: string;
    user: User;
    issue_category: IssueCategory;
    phases: Phase[];
    attachments: Attachment[];
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
    Attachment,
};
