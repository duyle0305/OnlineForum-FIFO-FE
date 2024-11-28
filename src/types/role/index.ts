export interface Role {
    roleID: string;
    name: RoleName;
}

export type RoleName = 'ADMIN' | 'USER' | 'STAFF';

export type Roles = Role[];
