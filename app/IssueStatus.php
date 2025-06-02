<?php

namespace App;

enum IssueStatus: string
{
    case Open = 'open';
    case Pending = 'pending';
    case InProgress = 'in_progress';
    case Resolved = 'resolved';
    case Closed = 'closed';
}
