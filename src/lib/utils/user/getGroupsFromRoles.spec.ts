import { describe, expect, it, beforeEach } from 'vitest';
import { getGroupsFromRoles } from './getGroupsFromRoles';
import type { GroupRole } from '$lib/types/User/GroupRole';
import type { UserGroup } from '$lib/types/User/UserGroup';

let groupRoles: GroupRole[];
let userGroupRoles: UserGroup[];

describe('getGroupsFromRoles', () => {
    beforeEach(() => {
        groupRoles = [
            {
                id: '6e53bc64-830a-4daa-a159-bdf2097a8516',
                name: 'Treedome Group Admin',
                permissions: [
                    {
                        id: 'cc1042de-88ef-45b4-98f0-f14efb8734fb',
                        name: 'group:all:write',
                    },
                ],
                group: {
                    id: '81ea7ac1-da07-49e3-b1b7-fb08b6034c15',
                    name: 'Treedome Space Group',
                    short_name: 'TSG',
                },
            },
            {
                id: 'cf0675ba-6b40-4539-a2ff-715e3e097db2',
                name: 'Schedule Operations',
                permissions: [
                    {
                        id: 'c43cb665-1572-4b37-a225-4a03fa52c0a6',
                        name: 'group:schedule:write',
                    },
                ],
                group: {
                    id: '81ea7ac1-da07-49e3-b1b7-fb08b6034c15',
                    name: 'Treedome Space Group',
                    short_name: 'TSG',
                },
            },
        ];

        userGroupRoles = [
            {
                id: '81ea7ac1-da07-49e3-b1b7-fb08b6034c15',
                name: 'Treedome Space Group',
                short_name: 'TSG',
                roles: [
                    {
                        id: '6e53bc64-830a-4daa-a159-bdf2097a8516',
                        name: 'Treedome Group Admin',
                        permissions: [
                            {
                                id: 'cc1042de-88ef-45b4-98f0-f14efb8734fb',
                                name: 'group:all:write',
                            },
                        ],
                        group: {
                            id: '81ea7ac1-da07-49e3-b1b7-fb08b6034c15',
                            name: 'Treedome Space Group',
                            short_name: 'TSG',
                        },
                    },
                    {
                        id: 'cf0675ba-6b40-4539-a2ff-715e3e097db2',
                        name: 'Schedule Operations',
                        permissions: [
                            {
                                id: 'c43cb665-1572-4b37-a225-4a03fa52c0a6',
                                name: 'group:schedule:write',
                            },
                        ],
                        group: {
                            id: '81ea7ac1-da07-49e3-b1b7-fb08b6034c15',
                            name: 'Treedome Space Group',
                            short_name: 'TSG',
                        },
                    },
                ],
            },
        ];
    });

    it('should return array of groups with roles from a list of roles with groups', () => {
        const groups = getGroupsFromRoles(groupRoles);
        expect(groups).toEqual(userGroupRoles);
    });

    it('should return multiple groups when user roles are from multiple groups', () => {
        groupRoles.push({
            id: '451d2c85-e10e-415c-b903-91c636ee154b',
            name: 'Schedule Operations',
            permissions: [
                {
                    id: 'c43cb665-1572-4b37-a225-4a03fa52c0a6',
                    name: 'group:schedule:write',
                },
            ],
            group: {
                id: 'f10ce6f0-ee6e-464d-a782-2de2bf0b669b',
                name: 'Chum Bucket Observatory',
                short_name: 'CBO',
            },
        });

        expect(getGroupsFromRoles(groupRoles)).toHaveLength(2);
    });
});
