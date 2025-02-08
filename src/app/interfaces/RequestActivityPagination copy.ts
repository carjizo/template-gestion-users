export interface RequestCollaboratorPagination {
    page: number;
    size: number;
    fullName?: string;
    idDocument?: string;
    role?: string;
}