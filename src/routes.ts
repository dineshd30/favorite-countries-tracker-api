import express from 'express';
import { getCountriesByName } from './controller/getCountries';

const router = express.Router();

router.get('/countries/:name', getCountriesByName);

export default router;