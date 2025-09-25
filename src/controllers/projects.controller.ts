import { Request, Response } from 'express';
import { canAccessProjectAdminService, createProjectService, getAllProjectsService, getProjectByIdService, leaveProjectService, removeProjectMemberService, updatePermissionService, updateProjectCategoryService, updateProjectService } from '../services/projects.service';
import { getUserIdRequest } from '../utils/getUserIdRequest.util';

export const createProject = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const creatorId = getUserIdRequest(req);

    if (!name || !description) {
        res.status(400).json({ error: 'Name and Description are required' });
    };

    try {
        const project = await createProjectService(name, description, creatorId);
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create Project' });
    }
};

export const getAllProjects = async (req: Request, res: Response) => {
    const projects = await getAllProjectsService();
    res.json(projects);
};

export const getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await getProjectByIdService(id);

    if (!project) {
        res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
};

export const updateProject = async (req: Request, res: Response) => {
    const projectId = req.params.id;
    const userId = getUserIdRequest(req);
    const { name, description, readme, github, linkedin, twitter, website } = req.body;

    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
    };

    const allowedFields = [
        'name',
        'description',
        'readme',
        'github',
        'linkedin',
        'twitter',
        'website',
    ];

    const updateData: Record<string, string> = {};
    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            updateData[field] = req.body[field];
        }
    }

    try {
        const updated = await updateProjectService(projectId, userId, updateData);

        res.status(200).json(updated);
    } catch (error) {
        res.status(403).json({ message: 'Forbidden' });
    }
};

export const updatePermission = async (req: Request, res: Response) => {
    const { id, userId } = req.params;
    const { permission } = req.body;
    const requesterId = getUserIdRequest(req);

    if (!['ADMIN', 'MODERATOR', 'MEMBER'].includes(permission)) {
        res.status(400).json({ error: 'Invalid permission value' });
    };
    try {
        const updatedMembership = await updatePermissionService(
            id,
            userId,
            requesterId,
            permission
        );

        res.json({
            message: 'Permission updated successfully',
            membership: updatedMembership,
        });
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === 'FORBIDDEN') {
                res.status(403).json({ error: 'Only admins can update permissions' });
            }

            if (err.message === 'CANNOT_CHANGE_OWN_PERMISSION') {
                res.status(400).json({ error: 'You cannot change your own permission' });
            }

            if (err.message === 'MEMBER_NOT_FOUND') {
                res.status(404).json({ error: 'Target member not found in this project' });
            }
        }

        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const removeProjectMember = async (req: Request, res: Response) => {
    const { id, userId } = req.params;
    const requesterId = getUserIdRequest(req);

    try {
        const removeMember = await removeProjectMemberService(
            id,
            userId,
            requesterId
        );

        res.json({
            message: 'Remove Member successfully',
            removeMember: removeMember,
        });

    } catch (err) {
        if (err instanceof Error) {
            if (err.message === 'FORBIDDEN') {
                res.status(403).json({ error: 'Only admins or moderators can remove members' });
            }

            if (err.message === 'CANNOT_REMOVE_SELF') {
                res.status(400).json({ error: 'You cannot remove yourself from a project' });
            }

            if (err.message === 'MEMBER_NOT_FOUND') {
                res.status(404).json({ error: 'Target member not found in this project' });
            }
        }

        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const leaveProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = getUserIdRequest(req);

    try {
        await leaveProjectService(id, userId);

        res.json({ message: 'You have left the project successfully' });
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === 'NOT_A_MEMBER') {
                res.status(400).json({ error: 'You are not a member of this project' });
            }

            if (err.message === 'ADMIN_CANNOT_LEAVE') {
                res.status(403).json({ error: 'Project admin cannot leave the project' });
            }
        };

        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateProjectCategory = async (req: Request, res: Response) => {
    const { projectId, categoryId } = req.body;

    try {
        if (!projectId || !categoryId) {
            res.status(400).json({ error: 'Project ID and Category ID are required' });
        }

        const updated = await updateProjectCategoryService(projectId, categoryId);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Error updating Project Category' });
    }
};

export const canAccessProjectAdmin = async (req: Request, res: Response) => {
    const projectId  = req.params.id;
    const userId = getUserIdRequest(req);

    try {
        const hasAccess = await canAccessProjectAdminService(userId, projectId);

        res.status(200).json({ success: hasAccess });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};