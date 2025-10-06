import { Request, Response } from 'express';
import { createJoinRequestService, getJoinRequestsByProjectService, updateJoinRequestStatusService, deleteJoinRequestService } from '../services/joinRequest.service';
import { getUserIdRequest } from '../utils/getUserIdRequest.util';

export const createJoinRequest = async (req: Request, res: Response) => {
  const userId = getUserIdRequest(req);
  const { projectId, message } = req.body;

  try {
    const request = await createJoinRequestService(userId, projectId, message);
    res.status(201).json(request);
  } catch (error: any) {

    if (error.code === "P2002") {
      res.status(400).json({ error: "JoinRequest already exists for this user and project" });
    }

    if (error.code === "P2003") {
      res.status(400).json({ error: "Invalid userId or projectId (FK constraint failed)" });
    }

    res.status(500).json({
      error: "Unexpected error creating join request",
      details: error.message || error,
    });
  }
};

export const getJoinRequestsByProject = async (req: Request, res: Response) => {
    const { projectId } = req.params;

    const requests = await getJoinRequestsByProjectService(projectId);
    res.json(requests);
};

export const updateJoinRequestStatus = async (req: Request, res: Response) => {
    const { requestId } = req.params;
    const { status } = req.body;

    try {
        const updated = await updateJoinRequestStatusService(requestId, status);
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: 'Error to updated' });
    }
};

export const deleteJoinRequest = async (req: Request, res: Response) => {
    //const userId = getUserIdRequest(req);
    const { requestId } = req.params;

    try {
        await deleteJoinRequestService(requestId);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: 'Error to deleted' });
    }
};