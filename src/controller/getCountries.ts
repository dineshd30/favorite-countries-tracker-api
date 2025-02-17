import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';


export const getCountriesByName = async (req: Request, res: Response, next: NextFunction) => {
  const name = req.params.name;
  if (!name) {
    res.status(400).json({ message: 'Name parameter is required' }).end();
    return;
  }

  logging.info(`getting countries by name - ${name}`);
  let response: AxiosResponse<any, any>;
  try {
    response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    const countries = response.data;
    res.status(200).json({ countries }).end();
    return;
  }
  catch (err) {
    res.status(500).json({ message: err }).end();
  }
}