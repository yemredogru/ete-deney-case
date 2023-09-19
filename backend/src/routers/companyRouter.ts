import express from 'express';
import { AddCompany,GetCompanies,UpdateCompany,DeleteCompanies,DashboardData } from '../controllers/companyController';

const companyRouter = express.Router();

import { verifyToken } from '../middleware/authMiddleware';

companyRouter.post('/add-company',AddCompany)
companyRouter.get('/all-companies',GetCompanies)
companyRouter.put('/update-company',UpdateCompany)
companyRouter.delete('/delete-company',DeleteCompanies)
companyRouter.get('/dashboard-data',DashboardData)

export default companyRouter;