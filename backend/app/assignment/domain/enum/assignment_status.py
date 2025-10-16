from enum import Enum


class EAssignmentStatus(str, Enum):
    """
    Statuses for an assignment or process.

    Values:

        DISABLED     → The assignment is disabled or inactive
        ENABLED      → The assignment is enabled and ready
        IN_PROGRESS  → The assignment is currently being worked on
        COMPLETED    → The assignment has been finished
    """
    DISABLED = "DISABLED"
    ENABLED = "ENABLED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
