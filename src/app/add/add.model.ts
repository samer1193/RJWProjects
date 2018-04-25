export class User {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    contactAddress: string;
    carriers: Carriers;
    phoneNumber: string;
    isActive: boolean;
    isAdmin: boolean;
    termsAndConditions: boolean;
    id: string;
    siteRole: SiteRole;
    siteRoleId: number;
}
export class Carriers {
    address: string;
    carrierId: string;
    id: string;
    name: string
}
export interface SiteRole {
    id: number;
    name: string;
    siteRoleDocumentTypes: string;
    siteRoleTypes: string;
}