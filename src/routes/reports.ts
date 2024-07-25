import { Router } from 'express';
import ReportController from '../controllers/report.controller';

const router = Router();

router.post('/', ReportController.createReport);
router.get('/', ReportController.getAllReports);
router.put('/:id', ReportController.updateReport);
router.delete('/:id', ReportController.deleteReport);
router.get('/project/:projectid', ReportController.getReportsByProject);
router.get('/special/reports', ReportController.getSpecialReports);

export default router;
