import express from 'express';
import {
  roleList,
  getRoleById,
  updateRole,
  deleteRole,
  registerRole,
} from '../controllers/role.js';
import roleMidd from '../middlewares/role.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
import validId from '../middlewares/validId.js';
const router = express.Router();
router.post('/register', [auth, admin, roleMidd.existingRole], registerRole);
router.get('/list/:name?', [auth, admin], roleList);
router.get('/find/:_id', [auth, admin, validId], getRoleById);
router.put('/update', [auth, admin, roleMidd.doNotChanges], updateRole);
router.put('/delete/:_id', [auth, admin, validId], deleteRole);

export default router;
